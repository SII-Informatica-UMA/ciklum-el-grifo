import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@ToString

public class RutinaNuevaDTO {
    
    private String nombre;
    private String descripcion;
    private String observaciones;
    private List<FragmentoRutinaDTO> ejercicios;

}