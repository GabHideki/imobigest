package br.com.imobigest;

import br.com.imobigest.model.TipoUsuario;
import br.com.imobigest.model.Usuario;
import br.com.imobigest.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ImobigestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImobigestApiApplication.class, args);
	}
        
        @Bean
        CommandLineRunner criarAdminPadrao(UsuarioRepository repository) {
            return args -> {

                if (repository.findByTipo(TipoUsuario.ADMIN).isEmpty()) {

                    Usuario admin = new Usuario();

                    admin.setNome("Administrador");
                    admin.setUsuario("admin");
                    admin.setEmail("admin@imobigest.com");
                    admin.setSenha("admin123");
                    admin.setCpf("00000000000");
                    admin.setTelefone("00000000000");
                    admin.setTipo(TipoUsuario.ADMIN);

                    repository.save(admin);

                    System.out.println("Administrador padrão criado.");
                }
            };
        }
}
