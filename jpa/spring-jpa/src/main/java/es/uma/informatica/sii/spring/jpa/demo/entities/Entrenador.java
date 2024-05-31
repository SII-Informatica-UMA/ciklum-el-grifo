package es.uma.informatica.sii.spring.jpa.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.sql.Date;

@Entity
public class Entrenador {
   @Id
   @GeneratedValue
   private Long id;
   private Long idUsuario;
   private String telefono;
   private String direccion;
   private String dni;
   private Date fechaNacimiento;
   private Date fechaAlta;
   private Date fechaBaja;
   private String especialidad;
   private String titulacion;
   private String experiencia;
   private String observaciones;
   private Long idCentro;

   public Long getId() {
      return this.id;
   }

   public Long getIdUsuario() {
      return this.idUsuario;
   }

   public String getTelefono() {
      return this.telefono;
   }

   public String getDireccion() {
      return this.direccion;
   }

   public String getDni() {
      return this.dni;
   }

   public Date getFechaNacimiento() {
      return this.fechaNacimiento;
   }

   public Date getFechaAlta() {
      return this.fechaAlta;
   }

   public Date getFechaBaja() {
      return this.fechaBaja;
   }

   public String getEspecialidad() {
      return this.especialidad;
   }

   public String getTitulacion() {
      return this.titulacion;
   }

   public String getExperiencia() {
      return this.experiencia;
   }

   public String getObservaciones() {
      return this.observaciones;
   }

   public Long getIdCentro() {
      return this.idCentro;
   }

   public void setId(final Long id) {
      this.id = id;
   }

   public void setIdUsuario(final Long idUsuario) {
      this.idUsuario = idUsuario;
   }

   public void setTelefono(final String telefono) {
      this.telefono = telefono;
   }

   public void setDireccion(final String direccion) {
      this.direccion = direccion;
   }

   public void setDni(final String dni) {
      this.dni = dni;
   }

   public void setFechaNacimiento(final Date fechaNacimiento) {
      this.fechaNacimiento = fechaNacimiento;
   }

   public void setFechaAlta(final Date fechaAlta) {
      this.fechaAlta = fechaAlta;
   }

   public void setFechaBaja(final Date fechaBaja) {
      this.fechaBaja = fechaBaja;
   }

   public void setEspecialidad(final String especialidad) {
      this.especialidad = especialidad;
   }

   public void setTitulacion(final String titulacion) {
      this.titulacion = titulacion;
   }

   public void setExperiencia(final String experiencia) {
      this.experiencia = experiencia;
   }

   public void setObservaciones(final String observaciones) {
      this.observaciones = observaciones;
   }

   public void setIdCentro(final Long idCentro) {
      this.idCentro = idCentro;
   }

   public Entrenador() {
   }

   public Entrenador(final Long id, final Long idUsuario, final String telefono, final String direccion, final String dni, final Date fechaNacimiento, final Date fechaAlta, final Date fechaBaja, final String especialidad, final String titulacion, final String experiencia, final String observaciones, final Long idCentro) {
      this.id = id;
      this.idUsuario = idUsuario;
      this.telefono = telefono;
      this.direccion = direccion;
      this.dni = dni;
      this.fechaNacimiento = fechaNacimiento;
      this.fechaAlta = fechaAlta;
      this.fechaBaja = fechaBaja;
      this.especialidad = especialidad;
      this.titulacion = titulacion;
      this.experiencia = experiencia;
      this.observaciones = observaciones;
      this.idCentro = idCentro;
   }
}
