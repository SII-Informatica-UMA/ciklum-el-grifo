package grifo.spring.jpa.demo.services;

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

    @PutMapping("/{idEjercicio}")
     public EjercicioDTO actualizarEjercicio(Long idEjercicio, EjercicioDTO ejercicio) {
        Ejercicio ejercicioComprobado = this.ejercicioService.obtenerEjercicio(idEjercicio).orElseThrow(() -> {
            return new EjercicioNoEncontradoException(); //Esto pasaría en el momento en el que no existiera o no se encontrara ese id
        });
        Ejercicio g = ejercicio.toEntity();
        g.setId(idEjercicio);
        g.setIdEntrenador(original.getIdEntrenador());
        return EjercicioDTO.fromEntity(this.ejercicioService.crearActualizarEjercicio(g));
    }


}