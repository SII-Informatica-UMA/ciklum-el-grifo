package grifo.spring.jpa.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import grifo.spring.jpa.demo.entities.Ejercicio;
import grifo.spring.jpa.demo.repositories.EjercicioRepository;
import grifo.spring.jpa.demo.repositories.RutinaRepository;
import grifo.spring.jpa.demo.services.Excepciones.EjercicioEnRutinaException;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class EjercicioService {
	private EjercicioRepository ejercicioRepository;
	private RutinaRepository rutinaRepository;
	
	public EjercicioService(EjercicioRepository ejercicioRepository, RutinaRepository rutinaRepository) {
        this.ejercicioRepository = ejercicioRepository;
        this.rutinaRepository = rutinaRepository;
    }

    public List<Ejercicio> obtenerEjercicios(Long idEntrenador) {
        comprobarPermiso(idEntrenador);
        return this.ejercicioRepository.findByIdEntrenador(idEntrenador);
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