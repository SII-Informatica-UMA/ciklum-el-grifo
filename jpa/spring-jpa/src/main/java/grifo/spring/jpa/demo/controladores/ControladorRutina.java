package grifo.spring.jpa.demo.controladores;

import java.util.List;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import grifo.spring.jpa.demo.services.RutinaService;

@RequestMapping({"/rutina"})
@RestController
public class ControladorRutina {
    private RutinaService rutinaService;

    private ControladorRutina (RutinaService rutinaService){
        this.rutinaService = rutinaService;
    }

    
}
