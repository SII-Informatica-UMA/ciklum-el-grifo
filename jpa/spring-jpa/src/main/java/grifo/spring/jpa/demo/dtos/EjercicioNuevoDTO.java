import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

}