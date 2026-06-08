/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.controller;

import br.com.imobigest.model.Usuario;
import br.com.imobigest.repository.UsuarioRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository repository;
    
    @GetMapping
    public List<Usuario> listar(){
        return repository.findAll();
    }
    
    @PostMapping
    public Usuario create(@RequestBody Usuario usuario){
        
        if(repository.findByUsuario(usuario.getUsuario()).isPresent()){
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Usuário já cadastrado");
        }
        
        if(repository.findByCpf(usuario.getCpf()).isPresent()){
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "CPF já cadastrado");
        }
        
        if(repository.findByEmail(usuario.getEmail()).isPresent()){
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email já cadastrado");
        }
        
        return repository.save(usuario);
    }
    
    @GetMapping("/{id}")
    public Usuario read(@PathVariable Long id){
        return repository.findById(id)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Usuario nao encontrado"));
    }
    
    @PutMapping("/{id}")
    public Usuario update(@PathVariable Long id, @RequestBody Usuario usuario){
        Usuario antigo = read(id);
        Usuario existente = repository.findByUsuario(usuario.getUsuario())
                            .orElse(null);
        
        if (existente != null && !existente.getId().equals(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Usuário já cadastrado");
        }
        
        existente = repository.findByCpf(usuario.getCpf())
                        .orElse(null);
        
        if (existente != null && !existente.getId().equals(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "CPF já cadastrado");
        }
        
        existente = repository.findByEmail(usuario.getEmail())
                        .orElse(null);
        
        if (existente != null && !existente.getId().equals(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email já cadastrado");
        }
        
        antigo.setUsuario(usuario.getUsuario());
        antigo.setSenha(usuario.getSenha());
        antigo.setNome(usuario.getNome());
        antigo.setCpf(usuario.getCpf());
        antigo.setEmail(usuario.getEmail());
        antigo.setTelefone(usuario.getTelefone());
        antigo.setTipo(usuario.getTipo());
        antigo.setEndereco(usuario.getEndereco());
        
        return repository.save(antigo);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        Usuario usuario = read(id);
        repository.delete(usuario);
    }
    
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario dados) {

        Usuario usuario = repository.findByUsuario(dados.getUsuario())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "Usuário ou senha inválidos"));

        if (!usuario.getSenha().equals(dados.getSenha())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Usuário ou senha inválidos");
        }

        return usuario;
    }
}