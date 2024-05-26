package grifo.spring.jpa.demo.dtos;

import java.util.List;

import grifo.spring.jpa.demo.entities.Ejercicio;
import grifo.spring.jpa.demo.entities.FragmentoRutina;
import grifo.spring.jpa.demo.dtos.FragmentoRutinaDTO;

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
    private List<FragmentoRutinaDTO> ejercicios;

    
    public Rutina toEntity() {
        return new Rutina(id, nombre, descripcion, observaciones, FragmentoRutinaDTO.toEntityList(ejercicios), id);
    }
    public static RutinaDTO fromEntity(Rutina rutina) {
        return builder().id(rutina.getId()).nombre(rutina.getNombre()).descripcion(rutina.getDescripcion()).observaciones(rutina.getObservaciones()).ejercicios(FragmentoRutinaDTO.fromEntityList(rutina.getEjercicios())).build();
    }
    
}