package grifo.spring.jpa.demo.dtos;

import java.util.List;

import grifo.spring.jpa.demo.entities.FragmentoRutina;
import grifo.spring.jpa.demo.entities.Rutina;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString

public class RutinaDTO extends RutinaNuevaDTO{
    
    private Long id;
    private String nombre;
    private String descripcion;
    private String observaciones;
    private List<FragmentoRutina> ejercicios;

    


    
}