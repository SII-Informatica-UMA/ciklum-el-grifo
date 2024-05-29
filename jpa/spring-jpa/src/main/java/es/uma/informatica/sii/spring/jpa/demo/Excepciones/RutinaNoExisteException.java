package es.uma.informatica.sii.spring.jpa.demo.Excepciones;

public class RutinaNoExisteException extends RuntimeException{

    public RutinaNoExisteException(){
        super();
    }

    public RutinaNoExisteException(String msg){
        super(msg);
    }
    
}
