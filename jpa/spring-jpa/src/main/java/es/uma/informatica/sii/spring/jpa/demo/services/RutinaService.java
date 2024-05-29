package es.uma.informatica.sii.spring.jpa.demo.services;

import es.uma.informatica.sii.spring.jpa.demo.entities.Rutina;
import es.uma.informatica.sii.spring.jpa.demo.Excepciones.RutinaNoExisteException;
import es.uma.informatica.sii.spring.jpa.demo.repositories.RutinaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Transactional
@Service

public class RutinaService {
    private RutinaRepository rutinaRepository;

    public RutinaService(RutinaRepository rutinaRepository) {
        this.rutinaRepository = rutinaRepository;
    }

    public List<Rutina> obtenerRutinas(Long idEntrenador) {
        comprobarPermiso(idEntrenador);
        return this.rutinaRepository.findByIdEntrenador(idEntrenador);
    }

    private void comprobarPermiso(Long idEntrenador) {
    }

    private void comprobarPermiso(Rutina rutina) {
    }

    public Optional<Rutina> obtenerRutina(Long idRutina) {
        Optional<Rutina> rutina = this.rutinaRepository.findById(idRutina);
        rutina.ifPresent(this::comprobarPermiso);
        return rutina;
    }

    public void eliminarRutina(Long idRutina) {
        Optional<Rutina> rutina = obtenerRutina(idRutina);
        rutina.ifPresent(r -> {
            comprobarPermiso(r);
        });
        rutina.orElseThrow(RutinaNoExisteException::new);
        this.rutinaRepository.deleteById(idRutina);
    }

    public Rutina crearActualizarRutina(Rutina rutina) {
        if (rutina.getId() != null) {
            obtenerRutina(rutina.getId()).ifPresentOrElse(r -> {
                comprobarPermiso(r);
            }, RutinaNoExisteException::new);
        }
        this.rutinaRepository.save(rutina);
        return this.rutinaRepository.findById(rutina.getId()).get();
    }
}
