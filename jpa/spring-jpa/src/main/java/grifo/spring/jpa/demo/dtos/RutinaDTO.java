import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString

public class RutinaDTO {
    
    private Long id;
    private String nombre;
    private String descripcion;
    private String observaciones;
    private List<FragmentoRutinaDTO> ejercicios;

}