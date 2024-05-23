package grifo.spring.jpa.demo.security;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfguration {
   @Autowired

   public SecurityConfguration() {
   }

   @Bean
   public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
   }

   public static Optional<UserDetails> getAuthenticatedUser() {
      return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication()).map((authentication) -> {
         return (UserDetails)authentication.getPrincipal();
      });
   }
}
