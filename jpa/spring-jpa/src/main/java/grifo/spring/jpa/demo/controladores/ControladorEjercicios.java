@RestController
@RequestMapping("/ejericico")
public class ControladorEjercicios {

	private EjercicioService servicio;

    @GetMapping //Devuelvo la lista de ejercicios pertenecientes al entrenador con id "idEntrenador"
   public List<EjercicioDTO> obtenerEjercicios(Long idEntrenador) {
        return this.ejercicioService.obtenerEjercicios(idEntrenador).stream().map(EjercicioDTO::fromEntity).toList();
    }

    @PostMapping
     public ResponseEntity<EjercicioDTO> crearEjercicio(Long idEntrenador, @RequestBody EjercicioNuevoDTO ejercicioNuevoDTO, UriComponentsBuilder uriBuilder) {
        Ejercicio ejercicioNuevo = ejercicioNuevoDTO.toEntity();
        g.setId(null);
        g.setIdEntrenador(idEntrenador);
        Ejercicio EjercicioActualizado = this.ejercicioService.crearActualizarEjercicio(ejercicioNuevo);
        return ResponseEntity.created(generadorUri(uriBuilder.build()).apply(EjercicioActualizado)).body(EjercicioDTO.fromEntity(EjercicioActualizado));
    }

    @GetMapping("/{idEjercicio}")
    public ResponseEntity<EjercicioDTO> getEjercicio(Long idEjercicio) {
        return ResponseEntity.of(this.ejercicioService.obtenerEjercicio(idEjercicio).map(EjercicioDTO::fromEntity));
    }

    

}