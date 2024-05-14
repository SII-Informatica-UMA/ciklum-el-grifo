package grifo.spring.jpa.demo.controladores;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import grifo.spring.jpa.demo.dtos.EjercicioDTO;
import grifo.spring.jpa.demo.dtos.EjercicioNuevoDTO;
import grifo.spring.jpa.demo.entities.Ejercicio;
import grifo.spring.jpa.demo.services.EjercicioService;
import grifo.spring.jpa.demo.services.Excepciones.EjercicioEnRutinaException;
import grifo.spring.jpa.demo.services.Excepciones.EjercicioNoExiste;


@RestController
@RequestMapping("/ejericico")
public class ControladorEjercicios {

	private EjercicioService EjercicioService;

        public ControladorEjercicios(EjercicioService ejercicioService) {
        this.EjercicioService = ejercicioService;
        }

    @GetMapping //Devuelvo la lista de ejercicios pertenecientes al entrenador con id "idEntrenador"
   public List<EjercicioDTO> obtenerEjercicios(@RequestParam Long idEntrenador) {
        return this.EjercicioService.obtenerEjercicios(idEntrenador).stream().map(EjercicioDTO::fromEntity).toList();
    }


    @PostMapping
     public ResponseEntity<EjercicioDTO> creacionEjercicio(Long idEntrenador, @RequestBody EjercicioNuevoDTO ejercicioNuevoDTO, UriComponentsBuilder uriBuilder) {
        Ejercicio ejercicioNuevo = ejercicioNuevoDTO.toEntity();
        ejercicioNuevo.setId(null);
        ejercicioNuevo.setIdEntrenador(idEntrenador);
        Ejercicio EjercicioActualizado = this.EjercicioService.crearActualizarEjercicio(ejercicioNuevo);
        
        return ResponseEntity.ok(EjercicioDTO.fromEntity(EjercicioActualizado));
    }

 
    @GetMapping("/{idEjercicio}")
    public ResponseEntity<EjercicioDTO> obtenerEjercicioPorId(Long idEjercicio) {
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
            return ResponseEntity.ok().build();
        } catch (EjercicioEnRutinaException e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
    }


}