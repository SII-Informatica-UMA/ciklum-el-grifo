package es.uma.informatica.sii.spring.jpa.demo.entities;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class FragmentoRutina {

    @Id @GeneratedValue
    private Long id;
    private Long series;
    private Long repeticiones;
    private Long duracionMinutos;
    @ManyToOne
    private Ejercicio ejercicios;

    public FragmentoRutina(final Long id, final Long series, final Long repeticiones, final Long duracionMinutos, final Ejercicio ejercicio) {
        this.id = id;
        this.series = series;
        this.repeticiones = repeticiones;
        this.duracionMinutos = duracionMinutos;
        this.ejercicios = ejercicio;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSeries() {
        return this.series;
    }

    public void setSeries(Long series) {
        this.series = series;
    }

    public Long getRepeticiones() {
        return this.repeticiones;
    }

    public void setRepeticiones(Long repeticiones) {
        this.repeticiones = repeticiones;
    }

    public Ejercicio getEjercicios() {
        return this.ejercicios;
    }

    public void setEjercicios(Ejercicio ejercicios) {
        this.ejercicios = ejercicios;
    }

    public Long getDuracionMinutos() {
        return this.duracionMinutos;
    }

    public void setDuracionMinutos(Long duracionMinutos) {
        this.duracionMinutos = duracionMinutos;
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
        FragmentoRutina other = (FragmentoRutina) obj;
        return Objects.equals(id, other.id);
    }

    @Override
    public String toString(){
        return "FragmentoRutina [id="+ id + ", series="+ series+", repeticiones="+ repeticiones + ", duracionMinutos="+ duracionMinutos 
        + ", ejercicios= "+ this.ejercicios.getNombre()
        + "]";
    }

    public Ejercicio getDescanso() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getDescanso'");
    }
}
