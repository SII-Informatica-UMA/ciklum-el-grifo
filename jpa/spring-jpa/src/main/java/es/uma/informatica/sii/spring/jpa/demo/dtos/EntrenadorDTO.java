// Source code is decompiled from a .class file using FernFlower decompiler.
package es.uma.informatica.sii.spring.jpa.demo.dtos;

import java.sql.Date;


public class EntrenadorDTO extends EntrenadorNuevoDTO {
   private Long id;

   public EntrenadorDTO(Long id, Long idUsuario, String telefono, String direccion, String dni, Date fechaNacimiento, Date fechaAlta, Date fechaBaja, String especialidad, String titulacion, String experiencia, String observaciones) {
      super(idUsuario, telefono, direccion, dni, fechaNacimiento, fechaAlta, fechaBaja, especialidad, titulacion, experiencia, observaciones);
      this.id = id;
   }

   public Long getId() {
      return this.id;
   }

   public void setId(final Long id) {
      this.id = id;
   }

   public EntrenadorDTO() {
   }
}
