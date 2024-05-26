package grifo.spring.jpa.demo.dtos;

import java.util.List;

import grifo.spring.jpa.demo.entities.Ejercicio;
import grifo.spring.jpa.demo.entities.FragmentoRutina;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString

public class FragmentoRutinaDTO {

    private Long series;
    private Long repeticiones;
    private Long duracionMinutos;
    private Ejercicio ejercicio;

    public FragmentoRutina toEntity() {
        return new FragmentoRutina(null, series, repeticiones, duracionMinutos, ejercicio);
    }

    public static FragmentoRutinaDTO fromEntity(FragmentoRutina fragmento){
        return builder().series(fragmento.getSeries()).repeticiones(fragmento.getRepeticiones()).duracionMinutos(fragmento.getDuracionMinutos()).ejercicio((fragmento.getEjercicios())).build();
    }

    public static List<FragmentoRutinaDTO> fromEntityList(List<FragmentoRutina> lista) {
        return lista.stream().map(FragmentoRutinaDTO::fromEntity).toList();
    }

    public static List<FragmentoRutina> toEntityList(List<FragmentoRutinaDTO> lista) {
        return lista.stream().map((v0) -> {
            return v0.toEntity();
        }).toList();
    }
}