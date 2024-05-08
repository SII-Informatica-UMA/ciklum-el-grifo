@Transactonal
@Service
public class EjercicioService {
	private EjercicioRepo ejercicioRepo;
	private RutinaRepo rutinaRepo;
	
	public EjercicioService(EjercicioRepo ejercicioRepo, RutinaRepo rutinaRepo) {
        this.ejercicioRepo = ejercicioRepo;
        this.rutinaRepo = rutinaRepo;
    }

    public List<Ejercicio> obtenerEjercicios(Long idEntrenador) {
        comprobarPermiso(idEntrenador);
        return this.ejercicioRepo.findByIdEntrenador(idEntrenador);
    }

    public Optional<Ejercicio> obtenerEjercicio(Long idEjercicio) {
        Optional<Ejercicio> ejercicio = this.ejercicioRepo.findById(idEjercicio);
        ejercicio.ifPresent(this::comprobarPermiso);
        return ejercicio;
    }

    private void comprobarPermiso(Ejercicio ejercicio) {
    }

    private void comprobarPermiso(Long idEntrenador) {
    }

    public Ejercicio crearActualizarEjercicio(Ejercicio ejercicio) {
        comprobarPermiso(ejercicio);
        return (Ejercicio) this.ejercicioRepo.save(ejercicio);
    }

    public void eliminarEjercicio(Long id) {
        if (this.rutinaRepo.existsRutinaWithEjercicio(id)) {
            throw new EjercicioEnRutinaException();
        }
        this.ejercicioRepo.deleteById(id);
    }

}