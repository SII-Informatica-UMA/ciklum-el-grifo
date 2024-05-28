package grifo.spring.jpa.demo;

import static org.assertj.core.api.Assertions.*;

import java.net.URI;
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

import grifo.spring.jpa.demo.dtos.EjercicioDTO;
import grifo.spring.jpa.demo.dtos.RutinaDTO;
import grifo.spring.jpa.demo.entities.Ejercicio;
import grifo.spring.jpa.demo.entities.Rutina;
import grifo.spring.jpa.demo.repositories.EjercicioRepository;
import grifo.spring.jpa.demo.repositories.RutinaRepository;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) 
@DisplayName("En el servicio de Rutinas y Ejercicios")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class EjerciciosRutinasAplicationTests {
    
    @Autowired
    private TestRestTemplate restTemplate;

    @Value(value = "${local.server.port}")
    private int port;

    private String jwtToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.IBSSjpqzoW51MJn_pfxJbD_apZGaKI-6WQEk0ZkGKKo";

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

    private RequestEntity<Void> get(String scheme, String host, int port, String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.get(uri).header("Authorization", "Bearer "+ jwtToken)
            .accept(MediaType.APPLICATION_JSON)
            .build();
        return peticion;
    }

    private RequestEntity<Void> delete(String scheme, String host, int port, String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.delete(uri).header("Authorization", "Bearer "+ jwtToken)
            .build();
        return peticion;
    }

    private <T> RequestEntity<T> post(String scheme, String host, int port,  T object,String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.post(uri).header("Authorization", "Bearer "+ jwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .body(object);
        return peticion;
    }

    private <T> RequestEntity<T> put(String scheme, String host, int port,  T object,String path) {
        URI uri = uri(scheme, host, port, path);
        var peticion = RequestEntity.put(uri).header("Authorization", "Bearer "+ jwtToken)
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
            var peticion = get("http", "localhost", port, "/ejercicios");

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

            var peticion = get("http", "localhost", port, "/ejercicios/" + idEjercicio);
            var respuesta = restTemplate.exchange(peticion, Ejercicio.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        @Test
        @DisplayName("Error al actualizar un ejercicio especifico no existente")
        public void actualizarEjercicioNoExiste() {
            Long idEjercicio = 1L;
            EjercicioDTO ejercicioActualizado = new EjercicioDTO();
            ejercicioActualizado.setNombre("Nuevo Ejercicio 1");

            var peticion = put("http", "localhost", port, ejercicioActualizado, "/ejercicios/" + idEjercicio);

            var respuesta = restTemplate.exchange(peticion, Ejercicio.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        @Test
        @DisplayName("error al eliminar ejercicio especifico no existente")
        public void eliminarEjercicioNoExiste() {
            Long idEjercicio = 1L;

            var peticion = delete("http", "localhost", port, "/ejercicios/" + idEjercicio);
            var respuesta = restTemplate.exchange(peticion, Void.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        @Test
        @DisplayName("Pone un ejercicio correctamente con la base de datos vacia")
        public void ponerEjercicioNoExiste() {
            Long idEjercicio = 1L;
            EjercicioDTO nuevoEjercicio = new EjercicioDTO();
            nuevoEjercicio.setNombre("Nuevo Ejercicio 1");

            var peticion = post("http", "localhost", port, nuevoEjercicio,"/ejercicios/" + idEjercicio);
            var respuesta = restTemplate.exchange(peticion, Ejercicio.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
        }

        @Test
        @DisplayName("devuelve la lista de rutinas vacía")
        public void devuelveRutinas() {
            var peticion = get("http", "localhost", port, "/rutinas");

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

            var peticion = get("http", "localhost", port, "/rutinas/" + idRutina);
            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }
    

        @Test
        @DisplayName("Error al actualizar una rutina especifica no existente")
        public void actualizarRutinaNoExiste() {
            Long idEjercicio = 1L;
            RutinaDTO rutinaActualizada = new RutinaDTO();
            rutinaActualizada.setNombre("Nuevo Ejercicio 1");

            var peticion = put("http", "localhost", port, rutinaActualizada, "/ejercicios/" + idEjercicio);

            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        
        @Test
        @DisplayName("error al eliminar rutina especifica no existente")
        public void eliminarRutinaNoExiste() {
            Long idRutina = 1L;

            var peticion = delete("http", "localhost", port, "/rutinas/" + idRutina);
            var respuesta = restTemplate.exchange(peticion, Void.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        @Test
        @DisplayName("Pone una rutina correctamente con la base de datos vacia")
        public void ponerRutinaNoExiste() {
            Long idRutina = 1L;
            RutinaDTO nuevaRutina = new RutinaDTO();
            nuevaRutina.setNombre("Nuevo Ejercicio 1");

            var peticion = post("http", "localhost", port, nuevaRutina,"/rutinas/" + idRutina);
            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
        }
    }

    @Nested
    @DisplayName("cuando hay datos ")
    public class EjerciciosPuestos {
        

    }
}
