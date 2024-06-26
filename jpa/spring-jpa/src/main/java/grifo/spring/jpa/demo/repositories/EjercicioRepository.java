package grifo.spring.jpa.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import grifo.spring.jpa.demo.entities.Ejercicio;

public interface EjercicioRepository  extends JpaRepository<Ejercicio,Long>{
    List<Ejercicio> findByIdEntrenador(Long idEntrenador);
    List<Ejercicio> findByNombre(String nombre);
    
   @Query("select e from Ejercicio e where e.dificultad = :dificultad")
   List<Ejercicio> miConsultaCompleja(@Param("dificultad") String dificultad);
}
