@Transactonal
@Service
public class EjercicioService {
	private EjercicioRepo ejercicioRepository;
	private RutinaRepo rutinaRepository;
	
	public EjercicioService(EjercicioRepository ejercicioRepository, RutinaRepository rutinaRepository) {
        this.ejercicioRepository = ejercicioRepository;
        this.rutinaRepository = rutinaRepository;
    }

    public List<Ejercicio> obtenerEjercicios(Long idEntrenador) {
        comprobarPermiso(idEntrenador);
        return this.ejercicioRepo.findByIdEntrenador(idEntrenador);
    }

    public Optional<Ejercicio> obtenerEjercicio(Long idEjercicio) {
        Optional<Ejercicio> ejercicio = this.ejercicioRepository.findById(idEjercicio);
        ejercicio.ifPresent(this::comprobarPermiso);
        return ejercicio;
    }

    private void comprobarPermiso(Ejercicio ejercicio) {
    }

    private void comprobarPermiso(Long idEntrenador) {
    }

    public Ejercicio crearActualizarEjercicio(Ejercicio ejercicio) {
        comprobarPermiso(ejercicio);
        return (Ejercicio) this.ejercicioRepository.save(ejercicio);
    }

    public void eliminarEjercicio(Long id) {
        if (this.rutinaRepository.existsRutinaWithEjercicio(id)) {
            throw new EjercicioEnRutinaException();
        }
        this.ejercicioRepository.deleteById(id);
    }

}