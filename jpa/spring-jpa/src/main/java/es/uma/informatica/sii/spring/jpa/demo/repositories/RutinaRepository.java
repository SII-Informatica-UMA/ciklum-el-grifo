package es.uma.informatica.sii.spring.jpa.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.uma.informatica.sii.spring.jpa.demo.entities.Rutina;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina,Long> {
    List<Rutina> findByIdEntrenador(Long idEntrenador);
    List<Rutina> findByIdAndNombreOrderByNombreAsc(Long id, String nombre);


    @Query("SELECT CASE WHEN (COUNT(r) > 0) THEN true ELSE false END FROM Rutina r JOIN r.ejercicios fr JOIN fr.ejercicios e WHERE e.id = :idEjercicio")
    boolean existsRutinaWithEjercicio(@Param("idEjercicio") Long idEjercicio);
    
    
}
