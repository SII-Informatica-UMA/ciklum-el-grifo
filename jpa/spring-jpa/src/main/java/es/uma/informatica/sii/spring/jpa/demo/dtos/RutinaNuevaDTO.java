package es.uma.informatica.sii.spring.jpa.demo.dtos;

import java.util.List;

import es.uma.informatica.sii.spring.jpa.demo.entities.Rutina;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString

public class RutinaNuevaDTO {
    
    private String nombre;
    private String descripcion;
    private String observaciones;
    private List<FragmentoRutinaDTO> ejercicios;


    public Rutina toEntity() {
        return new Rutina(null, nombre, descripcion, observaciones, FragmentoRutinaDTO.toEntityList(ejercicios), null);
    }


}