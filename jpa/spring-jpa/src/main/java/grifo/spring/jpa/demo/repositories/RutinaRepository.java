package grifo.spring.jpa.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import grifo.spring.jpa.demo.entities.Rutina;

public interface RutinaRepository extends JpaRepository<Rutina,Long> {
    List<Rutina> findByIdEntrenador(Long idEntrenador);
    List<Rutina> findByIdAndNombreOrderByNombreAsc(Long id, String nombre);
   // @Query("SELECT CASE WHEN COUNT(r) > 0 THEN TRUE ELSE FALSE END FROM Rutina r WHERE EXISTS (SELECT 1 FROM r.ejercicios f WHERE f.ejercicio.id = :idEjercicio)")
   // boolean existsRutinaWithEjercicio(@Param("idEjercicio") Long idEjercicio);
    
}
