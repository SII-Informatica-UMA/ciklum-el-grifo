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
    private EjercicioDTO ejercicio;

}