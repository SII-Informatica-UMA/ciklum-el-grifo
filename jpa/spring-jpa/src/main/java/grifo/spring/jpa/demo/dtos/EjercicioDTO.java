package grifo.spring.jpa.demo.dtos;


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

public class EjercicioDTO extends EjercicioNuevoDTO{
    
    private Long id;

    public Ejercicio toEntity() {
        return  new Ejercicio(this.id, getNombre(), getDescripcion(), getObservaciones(), getTipo(), getMusculosTrabajados(), getMaterial(), getDificultad(), getMultimedia(), null);
    }

    public static EjercicioDTO fromEntity(Ejercicio ejercicio) {
        return builder().id(ejercicio.getId()).nombre(ejercicio.getNombre()).descripcion(ejercicio.getDescripcion()).observaciones(ejercicio.getObservaciones()).tipo(ejercicio.getTipo()).musculosTrabajados(ejercicio.getMusculosTrabajados()).material(ejercicio.getMaterial()).dificultad(ejercicio.getDificultad()).multimedia(ejercicio.getMultimedia()).build();
    }


}