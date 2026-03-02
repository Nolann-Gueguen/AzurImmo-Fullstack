package bts.sio.azurimmo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class AzurimmoApplication {

	public static void main(String[] args) {
		SpringApplication.run(AzurimmoApplication.class, args);
	}
	@RestController
	@RequestMapping("/api")
	public class UserController {

	    @GetMapping("/hello")
	    public String hello() {
	        return "Bonjour depuis Spring Boot";
	    }
	}
}
