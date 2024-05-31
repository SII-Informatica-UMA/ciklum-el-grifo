package es.uma.informatica.sii.spring.jpa.demo;

import static org.assertj.core.api.Assertions.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import es.uma.informatica.sii.spring.jpa.demo.controladores.ControladorEjercicios;
import es.uma.informatica.sii.spring.jpa.demo.controladores.ControladorRutina;
import es.uma.informatica.sii.spring.jpa.demo.dtos.EjercicioDTO;
import es.uma.informatica.sii.spring.jpa.demo.dtos.EjercicioNuevoDTO;
import es.uma.informatica.sii.spring.jpa.demo.dtos.FragmentoRutinaDTO;
import es.uma.informatica.sii.spring.jpa.demo.dtos.RutinaDTO;
import es.uma.informatica.sii.spring.jpa.demo.dtos.RutinaNuevaDTO;
import es.uma.informatica.sii.spring.jpa.demo.entities.Ejercicio;
import es.uma.informatica.sii.spring.jpa.demo.entities.FragmentoRutina;
import es.uma.informatica.sii.spring.jpa.demo.entities.Rutina;
import es.uma.informatica.sii.spring.jpa.demo.repositories.EjercicioRepository;
import es.uma.informatica.sii.spring.jpa.demo.repositories.RutinaRepository;
import es.uma.informatica.sii.spring.jpa.demo.security.JwtUtil;
import es.uma.informatica.sii.spring.jpa.demo.services.EjercicioService;
import es.uma.informatica.sii.spring.jpa.demo.services.RutinaService;

import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) 
@DisplayName("En el servicio de Rutinas y Ejercicios")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)

public class EjerciciosRutinasApplicationTests {
    
    @Autowired
    private TestRestTemplate restTemplate;

    @Mock 
    private RestTemplate restMock;

    @Value(value = "${local.server.port}")
    private int port;
    
    @Autowired
    private EjercicioRepository ejercicioRepository;

    @Autowired
    private RutinaRepository rutinaRepository;

    @Autowired
	private JwtUtil jwtUtil;

    String jwtToken ;

	@InjectMocks
	private EjercicioService ejercicioService;
	@InjectMocks
	private ControladorEjercicios ControladorEjercicios;

    @InjectMocks
	private RutinaService rutinaService;
	@InjectMocks
	private ControladorRutina controladorRutina;
    

    @BeforeEach
    public void initializeDatabase() {
        ejercicioRepository.deleteAll();
        rutinaRepository.deleteAll();
        jwtToken = jwtUtil.generateToken("1");
    }

    private URI uri(String scheme, String host, int port, String paths) {
        URI uri = UriComponentsBuilder.newInstance()
        .scheme(scheme)
        .host(host)
        .port(port)
        .path(paths)
        .queryParam("entrenador",1L)
        .build()
        .toUri();
        return uri;
    }

     /*	public URI uriQuery(String scheme, String host, int port, String query, String ...paths) {
		UriBuilderFactory ubf = new DefaultUriBuilderFactory();
		UriBuilder ub = ubf.builder()
				.scheme(scheme)
				.host(host).port(port);
		for (String path: paths) {
			ub = ub.path(path);
		}
		ub = ub.query("plan=1");
		return ub.build();
	} */



    private RequestEntity<Void> get(String scheme, String host, int port, String path) {
            URI uri = uri(scheme, host,port,path);

            return RequestEntity.get(uri)
                .header("Authorization", "Bearer "+jwtToken)
                .accept(MediaType.APPLICATION_JSON)
                .build();
        }
    
        
    private RequestEntity<Void> delete(String scheme, String host, int port, String path) {
        URI uri = uri(scheme, host,port,path);

        return RequestEntity.delete(uri)
                    .header("Authorization", "Bearer "+jwtToken)
                    .accept(MediaType.APPLICATION_JSON).build();
    }
        
    private <T> RequestEntity<T> post(String scheme, String host, int port, T body, String path) {
        URI uri = uri(scheme, host,port,path);

        return RequestEntity.post(uri)
            .header("Authorization", "Bearer "+jwtToken)
            .accept(MediaType.APPLICATION_JSON)
            .body(body);
        }

    private <T> RequestEntity<T> put(String scheme, String host, int port, T body, String path) {
            URI uri = uri(scheme, host,port,path);

        return RequestEntity.put(uri)
            .header("Authorization", "Bearer "+jwtToken)
            .accept(MediaType.APPLICATION_JSON)
            .body(body);
    }


    @Nested
    @DisplayName("cuando no hay datos")
    public class EjerciciosVacios {

        @Test
        @DisplayName("Devuelve la lista de ejercicios vacía")
        public void devuelveEjercicios() {
            var peticion = get("http", "localhost", port, "/ejercicio");
        
            var respuesta = restTemplate.exchange(peticion,
                    new ParameterizedTypeReference<List<EjercicioDTO>>() {
                    });
        
            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
            assertThat(respuesta.getBody()).isEmpty();
        }

        @Test
        @DisplayName("Error al intentar obtener ejercicio especifico cuando no hay ejercicios")
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
        @DisplayName("Error al eliminar ejercicio especifico no existente")
        public void eliminarEjercicioNoExiste() {
            Long idEjercicio = 1L;

            var peticion = delete("http", "localhost", port, "/ejercicio/" + idEjercicio);
            var respuesta = restTemplate.exchange(peticion, Void.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        @Test
        @DisplayName("Añade un ejercicio correctamente con la base de datos vacia")
        public void ponerEjercicioNoExiste() {
            EjercicioNuevoDTO nuevoEjercicio = new EjercicioNuevoDTO();
            nuevoEjercicio.setNombre("Nuevo Ejercicio 1");
            

            var peticion = post("http", "localhost", port, nuevoEjercicio,"/ejercicio");
            var respuesta = restTemplate.exchange(peticion, Ejercicio.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(201);
        }

        @Test
        @DisplayName("Devuelve la lista de rutinas vacía")
        public void devuelveRutinas() {
            var peticion = get("http", "localhost", port, "/rutina");

            var respuesta = restTemplate.exchange(peticion,
                    new ParameterizedTypeReference<List<RutinaDTO>>() {
                    });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
            assertThat(respuesta.getBody()).isEmpty();
        }

        @Test
        @DisplayName("Error al intentar obtener rutina especifica cuando no hay rutinas")
        public void obtenerRutinaNoExiste() {
            Long idRutina = 1L;

            var peticion = get("http", "localhost", port, "/rutina/" + idRutina);
            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }
    

        @Test
        @DisplayName("Error al actualizar una rutina especifica no existente")
        public void actualizarRutinaNoExiste() {
            Long idRutina = 1L;
            RutinaDTO rutinaActualizada = new RutinaDTO();
            rutinaActualizada.setNombre("Nuevo Ejercicio 1");

            var peticion = put("http", "localhost", port, rutinaActualizada, "/rutina/" + idRutina);

            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        
        @Test
        @DisplayName("Error al eliminar rutina especifica no existente")
        public void eliminarRutinaNoExiste() {
            Long idRutina = 1L;

            var peticion = delete("http", "localhost", port, "/rutina/" + idRutina);
            var respuesta = restTemplate.exchange(peticion, Void.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
        }

        

        @Test
        @DisplayName("Añade una rutina correctamente con la base de datos vacia")
        public void ponerRutinaNoExiste() {
            RutinaNuevaDTO nuevaRutina = new RutinaNuevaDTO();
            nuevaRutina.setNombre("Nuevo Rutina 1");

            List<String> videos =new ArrayList<>();
            videos.add("youtube.com");

            Ejercicio e1= new Ejercicio(1L, "Ejercicio1", "Ejercicio de piernas", "Hacer con cuidado", "Piernas", "Gluteos,Isqueos...", "Esterilla", "Facil",videos, 1L);
            FragmentoRutina f1= new FragmentoRutina(1L, 10L, 5L, 15L, e1);
            ejercicioRepository.save(e1);
            
            FragmentoRutinaDTO f1DTO = FragmentoRutinaDTO.fromEntity(f1);

            List<FragmentoRutinaDTO> lf1DTO= new ArrayList<>();
            lf1DTO.add(f1DTO);

            nuevaRutina.setEjercicios(lf1DTO);

            var peticion = post("http", "localhost", port, nuevaRutina,"/rutina");
            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(201);
        }
    }

    @Nested
    @ExtendWith(MockitoExtension.class)
    @DisplayName("cuando hay datos")
    public class EjerciciosPuestos {

        

        @BeforeEach
        public void insertaDatos(){

            List<String> videos =new ArrayList<>();
            videos.add("youtube.com");
            Ejercicio e1= new Ejercicio(1L, "Ejercicio1", "Ejercicio de piernas", "Hacer con cuidado", "Piernas", "Gluteos,Isqueos...", "Esterilla", "Facil",videos, 1L);
            Ejercicio e2= new Ejercicio(2L, "Ejercicio2", "Ejercicio de espalda", "No apto para principiantes", "Espalda", "Espalda,Triceps...", "Esterilla", "Intermedio",videos, 1L);
            Ejercicio e3= new Ejercicio(3L, "Ejercicio2", "Ejercicio de espalda", "No apto para principiantes", "Espalda", "Espalda,Triceps...", "Esterilla", "Intermedio",videos, 1L);
            FragmentoRutina f1= new FragmentoRutina(1L, 10L, 5L, 15L, e1);
            FragmentoRutina f2= new FragmentoRutina(2L, 3L, 6L, 10L, e2);
            ejercicioRepository.save(e1);
            ejercicioRepository.save(e2);
            ejercicioRepository.save(e3);

            List<FragmentoRutina> lf1= new ArrayList<>();
            lf1.add(f1);

            List<FragmentoRutina> lf2= new ArrayList<>();
            lf2.add(f2);

            Rutina r1= new Rutina(1L,"Rutina1","Rutina que contiene el ejercicio 1","Rutina sencilla",lf1,1L);
            rutinaRepository.save(r1);

            Rutina r2= new Rutina(2L,"Rutina2","Rutina que contiene el ejercicio 2","Rutina intermedia",lf2,1L);
            rutinaRepository.save(r2);

             
        }
        
        @Test
        @DisplayName("Devuelve la lista de ejercicios")
        public void devuelveEjercicios() {
            var peticion = get("http", "localhost", port, "/ejercicio");

            var respuesta = restTemplate.exchange(peticion,
                    new ParameterizedTypeReference<List<EjercicioDTO>>() {
                    });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
            assertThat(respuesta.getBody()).isNotEmpty();
        }

        @Test
        @DisplayName("Devuelve un ejercicio especifico")
        public void obtenerEjercicioExiste() {
            Long idEjercicio = 1L;

            var peticion = get("http", "localhost", port, "/ejercicio/" + idEjercicio);
            var respuesta = restTemplate.exchange(peticion, Ejercicio.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
        }

        @Test
        @DisplayName("Actualiza un ejercicio correctamente")
        public void actualizarEjercicioExiste() {
            Long idEjercicio = 1L;
            EjercicioDTO ejercicioActualizado = new EjercicioDTO();
            ejercicioActualizado.setNombre("lajshfjasd");

            var peticion = put("http", "localhost", port, ejercicioActualizado, "/ejercicio/" + idEjercicio);

            var respuesta = restTemplate.exchange(peticion, Ejercicio.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
        }
    
        @Test
        @DisplayName("Elimina ejercicio  especifico")
        public void eliminarEjercicioExiste() {
            Long idEjercicio = 3L;

            var peticion = delete("http", "localhost", port, "/ejercicio/" + idEjercicio);
            var respuesta = restTemplate.exchange(peticion, Void.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
        }
/* 
        @Test
        @DisplayName("Fallo al eliminar ejercicio especifico")
        public void errorEliminarEjercicioExistente() {

            Long idEjercicio = 3L;

            // Inicializar los mocks
        MockitoAnnotations.openMocks(this);

        // Configurar el comportamiento del mock
        when(rutinaRepository.existsRutinaWithEjercicio(3L)).thenReturn(true);
           
            var peticion = delete("http", "localhost", port, "/ejercicio/" + idEjercicio);
            var respuesta = restTemplate.exchange(peticion, Void.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(417);
        }

*/


        //TODO CASO EN EL QUE BORRAS EJERCICIO DE RUTINA Y SALE EXCEPCION
        @Test
        @DisplayName("Añade ejercicio")
        public void ponerEjercicioExiste() {
            EjercicioNuevoDTO nuevoEjercicio = new EjercicioNuevoDTO();
            nuevoEjercicio.setNombre("Nuevo Ejercicio 1");
            

            var peticion = post("http", "localhost", port, nuevoEjercicio,"/ejercicio");
            var respuesta = restTemplate.exchange(peticion, Ejercicio.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(201);
        }

        @Test
        @DisplayName("Devuelve la lista de rutinas")
        public void devuelveRutinas() {
            var peticion = get("http", "localhost", port, "/rutina");

            var respuesta = restTemplate.exchange(peticion,
                    new ParameterizedTypeReference<List<RutinaDTO>>() {
                    });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
            assertThat(respuesta.getBody()).isNotEmpty();
        }

        @Test
        @DisplayName("Devuelve una  rutina especifica")
        public void obtenerRutinaExiste() {
            Long idRutina = 1L;

            var peticion = get("http", "localhost", port, "/rutina/" + idRutina);
            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
        }
    

        @Test
        @DisplayName("Actualiza una rutina especifica")
        public void actualizarRutinaExiste() {
            Long idRutina = 1L;
            RutinaDTO rutinaActualizada = new RutinaDTO();
            rutinaActualizada.setNombre("alsjhdaasdkjñ");
            
            List<String> videos =new ArrayList<>();
            videos.add("youtube.com");
            Ejercicio e1= new Ejercicio(1L, "Ejercicio1", "Ejercicio de piernas", "Hacer con cuidado", "Piernas", "Gluteos,Isqueos...", "Esterilla", "Facil",videos, 1L);
            FragmentoRutina f1= new FragmentoRutina(1L, 10L, 5L, 15L, e1);
            ejercicioRepository.save(e1);
            
            FragmentoRutinaDTO f1DTO = FragmentoRutinaDTO.fromEntity(f1);

            List<FragmentoRutinaDTO> lf1DTO= new ArrayList<>();
            lf1DTO.add(f1DTO);

            rutinaActualizada.setEjercicios(lf1DTO);


            var peticion = put("http", "localhost", port, rutinaActualizada, "/rutina/" + idRutina);

            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
        }

        
        @Test
        @DisplayName("Elimina rutina especifica")
        public void eliminarRutinaExiste() {
            Long idRutina = 1L;

            var peticion = delete("http", "localhost", port, "/rutina/" + idRutina);
            var respuesta = restTemplate.exchange(peticion, Void.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
        }

        @Test
        @DisplayName("Añade rutina")
        public void ponerRutinaExiste() {
            RutinaNuevaDTO nuevaRutina = new RutinaNuevaDTO();
            nuevaRutina.setNombre("Nuevo Rutina 1");

            List<String> videos =new ArrayList<>();
            videos.add("youtube.com");

            Ejercicio e1= new Ejercicio(1L, "Ejercicio1", "Ejercicio de piernas", "Hacer con cuidado", "Piernas", "Gluteos,Isqueos...", "Esterilla", "Facil",videos, 1L);
            FragmentoRutina f1= new FragmentoRutina(1L, 10L, 5L, 15L, e1);
            ejercicioRepository.save(e1);
            
            FragmentoRutinaDTO f1DTO = FragmentoRutinaDTO.fromEntity(f1);

            List<FragmentoRutinaDTO> lf1DTO= new ArrayList<>();
            lf1DTO.add(f1DTO);

            nuevaRutina.setEjercicios(lf1DTO);

            var peticion = post("http", "localhost", port, nuevaRutina,"/rutina");
            var respuesta = restTemplate.exchange(peticion, Rutina.class);

            assertThat(respuesta.getStatusCode().value()).isEqualTo(201);
        }
    }

    
}