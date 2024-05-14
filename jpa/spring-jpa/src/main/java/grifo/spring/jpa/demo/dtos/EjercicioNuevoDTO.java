package grifo.spring.jpa.demo.dtos;

import java.util.List;

import grifo.spring.jpa.demo.entities.Ejercicio;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode
@ToString

public class EjercicioNuevoDTO {
    private String nombre;
    private String descripcion;
    private String observaciones;
    private String tipo;
    private String musculosTrabajados;
    private String material;
    private String dificultad;
    private List<String> multimedia;


    public Ejercicio toEntity() {
        return new Ejercicio (null, this.nombre, this.descripcion, this.observaciones, this.tipo, this.musculosTrabajados, this.material, this.dificultad, this.multimedia, null);
    }

}
