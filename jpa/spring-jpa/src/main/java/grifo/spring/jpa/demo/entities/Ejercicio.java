package grifo.spring.jpa.demo.entities;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Ejercicio {

    @Id @GeneratedValue
    private Long id;
    private String nombre;
    private String descripcion;
    private String observaciones;
    private String tipo;
    private String musculosTrabajados;
    private String material;
    private String dificultad;
    @ElementCollection
    private List<String> multimedia;
    private Long idEntrenador;

    public Ejercicio(final Long id, final String nombre, final String descripcion, final String observaciones, final String tipo, final String musculosTrabajados, final String material, final String dificultad, final List<String> multimedia, final Long idEntrenador) {

        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.observaciones = observaciones;
        this.tipo = tipo;
        this.musculosTrabajados = musculosTrabajados;
        this.material = material;
        this.dificultad = dificultad;
        this.multimedia = multimedia;
        this.idEntrenador = idEntrenador;

        
    }
    

    public Long getIdEntrenador() {
        return this.idEntrenador;
    }

    public void setIdEntrenador(Long idEntrenador) {
        this.idEntrenador = idEntrenador;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getObservaciones() {
        return this.observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getTipo() {
        return this.tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getMusculosTrabajados() {
        return this.musculosTrabajados;
    }

    public void setMusculosTrabajados(String musculosTrabajados) {
        this.musculosTrabajados = musculosTrabajados;
    }

    public String getMaterial() {
        return this.material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getDificultad() {
        return this.dificultad;
    }

    public void setDificultad(String dificultad) {
        this.dificultad = dificultad;
    }

    public List<String> getMultimedia() {
        return this.multimedia;
    }

    public void setMultimedia(List<String> multimedia) {
        this.multimedia = multimedia;
    }   
    
    @Override
    public int hashCode(){
        return Objects.hash(id);
    }
    
    @Override
    public boolean equals (Object obj){
        if (this == obj)
        return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Ejercicio other = (Ejercicio) obj;
        return Objects.equals(id, other.id);
    }

    @Override
    public String toString(){
        return "Ejercicio [id="+ id + ", nombre="+ nombre+", descripcion="+ descripcion + ", observaciones="+ observaciones +", tipo="+tipo
        +", musculosTrabajados="+ musculosTrabajados + ", material=" + material +", dificultad="+dificultad + ",multimedia= {"+ String.join(", ", this.multimedia) +"}"
        + "]";
    }
}
