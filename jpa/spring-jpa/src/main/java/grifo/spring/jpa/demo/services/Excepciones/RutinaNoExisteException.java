package grifo.spring.jpa.demo.services.Excepciones;

public class RutinaNoExisteException extends RuntimeException{

    public RutinaNoExisteException(){
        super();
    }

    public RutinaNoExisteException(String msg){
        super(msg);
    }
    
}
