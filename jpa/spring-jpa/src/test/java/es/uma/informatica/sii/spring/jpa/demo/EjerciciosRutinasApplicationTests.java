package es.uma.informatica.sii.spring.jpa.demo;

import static org.assertj.core.api.Assertions.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.test.annotation.DirtiesContext;

import org.springframework.web.util.UriComponentsBuilder;

import es.uma.informatica.sii.spring.jpa.demo.dtos.*;

import es.uma.informatica.sii.spring.jpa.demo.entities.*;
import es.uma.informatica.sii.spring.jpa.demo.repositories.EjercicioRepository;
import es.uma.informatica.sii.spring.jpa.demo.repositories.RutinaRepository;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) 
@DisplayName("En el servicio de Rutinas y Ejercicios")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)

public class EjerciciosRutinasApplicationTests {
    
    @Autowired
    private TestRestTemplate restTemplate;

    @Value(value = "${local.server.port}")
    private int port;
    //private String jwtToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.jGgT0iha61tFeyXv30J931J_Z8wXnOPlr4LPwSVYwEM";

    @Autowired
    private EjercicioRepository ejercicioRepository;

    @Autowired
    private RutinaRepository rutinaRepository;

    @BeforeEach
    public void initializeDatabase() {
        ejercicioRepository.deleteAll();
        rutinaRepository.deleteAll();
    }

    private URI uri(String scheme, String host, int port, String paths) {
        URI uri = UriComponentsBuilder.newInstance()
        .scheme(scheme)
        .host(host).port(port)
        .path(paths)
        .queryParam("entrenador",1)
        .build()
        .toUri();
        return uri;
    }

    /*private URI uri(String scheme, String host, int port, String ...paths) {
        UriBuilderFactory ubf = new DefaultUriBuilderFactory();
        UriBuilder ub = ubf.builder()
                .scheme(scheme)
                .host(host).port(port);
        for (String path: paths) {
            ub = ub.path(path);
        }
        return ub.build();
    }*/

    private RequestEntity<Void> get(String scheme, String host, int port, String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.get(uri)//.header("Authorization", "Bearer "+ jwtToken)
            .accept(MediaType.APPLICATION_JSON)
            .build();
        return peticion;
    }

    private RequestEntity<Void> delete(String scheme, String host, int port, String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.delete(uri)//.header("Authorization", "Bearer "+ jwtToken)
            .build();
        return peticion;
    }

    private <T> RequestEntity<T> post(String scheme, String host, int port,  T object, String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.post(uri)//.header("Authorization", "Bearer "+ jwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .body(object);
        return peticion;
    }

    private <T> RequestEntity<T> put(String scheme, String host, int port,  T object, String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.put(uri)//.header("Authorization", "Bearer "+ jwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .body(object);
        return peticion;
    }

    @Nested
    @DisplayName("cuando no hay datos")
    public class EjerciciosVacios {

        @Test
        @DisplayName("devuelve la lista de ejercicios vacía")
        public void devuelveEjercicios() {
            var peticion = get("http", "localhost", port, "/ejercicio");

            var respuesta = restTemplate.exchange(peticion,
                    new ParameterizedTypeReference<List<EjercicioDTO>>() {
                    });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
            assertThat(respuesta.getBody()).isEmpty();
        }

        @Test
        @DisplayName("error al intentar obtener ejercicio especifico cuando no hay ejercicios")
        public void obtenerEjercicioNoExiste() {
            Long idEjercicio = 1L;

            var peticion = get("http", "localhost", port, "/ejercicio/" + idEjercicio);
            var respuesta = restTemplate.exchange(peticion, Ejercicio.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        @Test
        @DisplayName("Error al actualizar un ejercicio especifico no existente")
        public void actualizarEjercicioNoExiste() {
            Long idEjercicio = 1L;
            EjercicioDTO ejercicioActualizado = new EjercicioDTO();
            ejercicioActualizado.setNombre("Nuevo Ejercicio 1");

            var peticion = put("http", "localhost", port, ejercicioActualizado, "/ejercicio/" + idEjercicio);

            var respuesta = restTemplate.exchange(peticion, Ejercicio.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        @Test
        @DisplayName("error al eliminar ejercicio especifico no existente")
        public void eliminarEjercicioNoExiste() {
            Long idEjercicio = 1L;

            var peticion = delete("http", "localhost", port, "/ejercicio/" + idEjercicio);
            var respuesta = restTemplate.exchange(peticion, Void.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        @Test
        @DisplayName("Pone un ejercicio correctamente con la base de datos vacia")
        public void ponerEjercicioNoExiste() {
            EjercicioNuevoDTO nuevoEjercicio = new EjercicioNuevoDTO();
            nuevoEjercicio.setNombre("Nuevo Ejercicio 1");
            

            var peticion = post("http", "localhost", port, nuevoEjercicio,"/ejercicio");
            var respuesta = restTemplate.exchange(peticion, Ejercicio.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(201);
        }

        @Test
        @DisplayName("devuelve la lista de rutinas vacía")
        public void devuelveRutinas() {
            var peticion = get("http", "localhost", port, "/rutina");

            var respuesta = restTemplate.exchange(peticion,
                    new ParameterizedTypeReference<List<RutinaDTO>>() {
                    });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
            assertThat(respuesta.getBody()).isEmpty();
        }

        @Test
        @DisplayName("error al intentar obtener rutina especifica cuando no hay rutinas")
        public void obtenerRutinaNoExiste() {
            Long idRutina = 1L;

            var peticion = get("http", "localhost", port, "/rutina/" + idRutina);
            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }
    

        @Test
        @DisplayName("Error al actualizar una rutina especifica no existente")
        public void actualizarRutinaNoExiste() {
            Long idEjercicio = 1L;
            RutinaDTO rutinaActualizada = new RutinaDTO();
            rutinaActualizada.setNombre("Nuevo Ejercicio 1");

            var peticion = put("http", "localhost", port, rutinaActualizada, "/ejercicio/" + idEjercicio);

            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        
        @Test
        @DisplayName("error al eliminar rutina especifica no existente")
        public void eliminarRutinaNoExiste() {
            Long idRutina = 1L;

            var peticion = delete("http", "localhost", port, "/rutina/" + idRutina);
            var respuesta = restTemplate.exchange(peticion, Void.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        @Test
        @DisplayName("Pone una rutina correctamente con la base de datos vacia")
        public void ponerRutinaNoExiste() {
            RutinaNuevaDTO nuevaRutina = new RutinaNuevaDTO();
            nuevaRutina.setNombre("Nuevo Rutina 1");
            List<String> videos =new ArrayList<>();
            videos.add("youtube.com");
            Ejercicio e1= new Ejercicio(1L, "Ejercicio1", "Ejercicio de piernas", "Hacer con cuidado", "Piernas", "Gluteos,Isqueos...", "Esterilla", "Facil",videos, 1L);
            FragmentoRutina f1= new FragmentoRutina(1L, 10L, 5L, 15L, e1);
            
            List<FragmentoRutina> lf1= new ArrayList<>();
            lf1.add(f1);

            nuevaRutina.setEjercicios(lf1);

            var peticion = post("http", "localhost", port, nuevaRutina,"/rutina");
            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(201);
        }
    }

    @Nested
    @DisplayName("cuando hay datos ")
    public class EjerciciosPuestos {

        @BeforeEach
        public void insertaDatos(){

            List<String> videos =new ArrayList<>();
            videos.add("youtube.com");

            Ejercicio e1= new Ejercicio(1L, "Ejercicio1", "Ejercicio de piernas", "Hacer con cuidado", "Piernas", "Gluteos,Isqueos...", "Esterilla", "Facil",videos, 1L);
            Ejercicio e2= new Ejercicio(2L, "Ejercicio2", "Ejercicio de espalda", "No apto para principiantes", "Espalda", "Espalda,Triceps...", "Esterilla", "Intermedio",videos, 1L);
            FragmentoRutina f1= new FragmentoRutina(1L, 10L, 5L, 15L, e1);
            FragmentoRutina f2= new FragmentoRutina(2L, 3L, 6L, 10L, e2);
            ejercicioRepository.save(e1);
            ejercicioRepository.save(e2);

            List<FragmentoRutina> lf1= new ArrayList<>();
            lf1.add(f1);

            List<FragmentoRutina> lf2= new ArrayList<>();
            lf2.add(f2);

            Rutina r1= new Rutina(1L,"Rutina1","Rutina que contiene el ejercicio 1","Rutina sencilla",lf1,1L);
            rutinaRepository.save(r1);

            Rutina r2= new Rutina(2L,"Rutina2","Rutina que contiene el ejercicio 2","Rutina intermedia",lf2,1L);
            rutinaRepository.save(r2);

        }
        //TODO PONER LOS TEST

    }
}