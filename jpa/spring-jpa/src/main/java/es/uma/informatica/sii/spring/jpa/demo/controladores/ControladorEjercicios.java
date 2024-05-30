package es.uma.informatica.sii.spring.jpa.demo.controladores;

import java.net.URI;
import java.util.List;
import java.util.function.Function;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import es.uma.informatica.sii.spring.jpa.demo.Excepciones.EjercicioEnRutinaException;
import es.uma.informatica.sii.spring.jpa.demo.Excepciones.EjercicioNoExiste;
import es.uma.informatica.sii.spring.jpa.demo.dtos.EjercicioDTO;
import es.uma.informatica.sii.spring.jpa.demo.dtos.EjercicioNuevoDTO;
import es.uma.informatica.sii.spring.jpa.demo.entities.Ejercicio;
import es.uma.informatica.sii.spring.jpa.demo.services.EjercicioService;


@RestController
@RequestMapping("/ejercicio")
public class ControladorEjercicios {

	private EjercicioService EjercicioService;

    public ControladorEjercicios(EjercicioService ejercicioService) {
    this.EjercicioService = ejercicioService;
    }

    @GetMapping //Devuelvo la lista de ejercicios pertenecientes al entrenador con id "idEntrenador"
   public List<EjercicioDTO> obtenerEjercicios(@RequestParam(value = "entrenador",required = true) Long idEntrenador) {
        return this.EjercicioService.obtenerEjercicios(idEntrenador).stream().map(EjercicioDTO::fromEntity).toList();
    }


    @PostMapping
    public ResponseEntity<EjercicioDTO> crearEjercicio(@RequestParam(value = "entrenador",required = true) Long idEntrenador, @RequestBody EjercicioNuevoDTO ejercicioNuevoDTO, UriComponentsBuilder uriBuilder) {
        Ejercicio g = ejercicioNuevoDTO.toEntity();
        g.setId((Long)null);
        g.setIdEntrenador(idEntrenador);
        g = this.EjercicioService.crearActualizarEjercicio(g);
        return ResponseEntity.created((URI)this.generadorUri(uriBuilder.build()).apply(g)).body(EjercicioDTO.fromEntity(g));
    }

    private Function<Ejercicio, URI> generadorUri(UriComponents uriBuilder) {
        return (g) -> {
            return UriComponentsBuilder.newInstance().uriComponents(uriBuilder).path("/ejercicio").path(String.format("/%d", g.getId())).build().toUri();
        };
    }


 
    @GetMapping("/{idEjercicio}")
    public ResponseEntity<EjercicioDTO> obtenerEjercicioPorId(@PathVariable Long idEjercicio) {
        return ResponseEntity.of(this.EjercicioService.obtenerEjercicio(idEjercicio).map(EjercicioDTO::fromEntity));
    }

    @PutMapping("/{idEjercicio}")
     public EjercicioDTO actualizacionEjercicio(@PathVariable Long idEjercicio, @RequestBody EjercicioDTO ejercicio) {
        Ejercicio ejercicioComprobado = this.EjercicioService.obtenerEjercicio(idEjercicio).orElseThrow(() -> {
            return new EjercicioNoExiste();
        });
        Ejercicio ejercicioADevolver = ejercicio.toEntity();
        ejercicioADevolver.setId(idEjercicio);
        ejercicioADevolver.setIdEntrenador(ejercicioComprobado.getIdEntrenador());
        return EjercicioDTO.fromEntity(this.EjercicioService.crearActualizarEjercicio(ejercicioADevolver));
    }

    @DeleteMapping({"/{idEjercicio}"})
    public ResponseEntity<Void> eliminacionEjercicioPorId(@PathVariable Long idEjercicio) {
        this.EjercicioService.obtenerEjercicio(idEjercicio).orElseThrow(EjercicioNoExiste::new);
        try {
            this.EjercicioService.eliminarEjercicio(idEjercicio);
            
        } catch (EjercicioEnRutinaException e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(EjercicioNoExiste.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleElementoNoExisteException() {
    }
}