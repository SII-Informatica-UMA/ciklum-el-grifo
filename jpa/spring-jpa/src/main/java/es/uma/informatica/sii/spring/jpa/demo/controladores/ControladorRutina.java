package es.uma.informatica.sii.spring.jpa.demo.controladores;

import java.util.List;

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
import org.springframework.web.util.UriComponentsBuilder;

import es.uma.informatica.sii.spring.jpa.demo.dtos.RutinaDTO;
import es.uma.informatica.sii.spring.jpa.demo.dtos.RutinaNuevaDTO;
import es.uma.informatica.sii.spring.jpa.demo.entities.Rutina;
import es.uma.informatica.sii.spring.jpa.demo.services.RutinaService;
import es.uma.informatica.sii.spring.jpa.demo.Excepciones.RutinaNoExisteException;

@RequestMapping({"/rutina"})
@RestController
public class ControladorRutina {
    private RutinaService rutinaService;

    private ControladorRutina (RutinaService rutinaService){
        this.rutinaService = rutinaService;
    }

    @GetMapping
    public List<RutinaDTO> obteneRutina(@RequestParam(value = "entrenador",required = true) Long idEntrenador){
        return  this.rutinaService.obtenerRutinas(idEntrenador).stream().map(RutinaDTO::fromEntity).toList();
    }

    @PostMapping
    public ResponseEntity<RutinaDTO> crearRutina(@RequestParam(value = "entrenador",required = true) Long idEntrenador,@RequestBody RutinaNuevaDTO rutinaNuevaDTO, UriComponentsBuilder uriBuilder){
        Rutina rutina = rutinaNuevaDTO.toEntity();
        rutina.setIdEntrenador(idEntrenador);
        rutina.setId(null);
        Rutina rutina2 = this.rutinaService.crearActualizarRutina(rutina);
        return ResponseEntity.ok(RutinaDTO.fromEntity(rutina2));
    }

    @GetMapping({"/{idRutina}"})
    public ResponseEntity<RutinaDTO> obtenerRutinaPorId(@PathVariable Long idRutina){
        return ResponseEntity.of(this.rutinaService.obtenerRutina(idRutina).map(RutinaDTO::fromEntity));
    }

    @PutMapping({"/{idRutina}"})
    public RutinaDTO actualizarRutina(@PathVariable Long idRutina,@RequestBody RutinaDTO rutina){
        Rutina oldRutina = this.rutinaService.obtenerRutina(idRutina).orElseThrow(RutinaNoExisteException::new);
        Rutina newRutina = rutina.toEntity();
        newRutina.setId(idRutina);
        newRutina.setIdEntrenador(oldRutina.getIdEntrenador());
        return RutinaDTO.fromEntity(this.rutinaService.crearActualizarRutina(newRutina));
    }


    @DeleteMapping({"/{idRutina}"})
    public void eliminarRutinaPorId(@PathVariable Long idRutina){
        this.rutinaService.eliminarRutina(idRutina);
    }

    @ExceptionHandler(RutinaNoExisteException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleElementoNoExisteException() {
    }
}
