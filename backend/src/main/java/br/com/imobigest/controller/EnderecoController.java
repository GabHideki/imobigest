/*
 * Feito por Gustavo Vinícius Vieira Cravo
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package br.com.imobigest.controller;

import br.com.imobigest.model.Endereco;
import br.com.imobigest.repository.EnderecoRepository;
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
@RequestMapping("/enderecos")
@CrossOrigin(origins = "*")
public class EnderecoController {

    @Autowired
    private EnderecoRepository repository;

    // Listar enderecos
    @GetMapping
    public List<Endereco> listar() {
        return repository.findAll();
    }

    // Adicionar endereco
    @PostMapping
    public Endereco create(@RequestBody Endereco endereco) {
        return repository.save(endereco);
    }

    // Buscar ID de endereco
    @GetMapping("/{id}")
    public Endereco read(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Endereço não encontrado"));
    }

    // Editar endereco
    @PutMapping("/{id}")
    public Endereco update(@PathVariable Long id, @RequestBody Endereco endereco) {
        // Valida se o endereço existe usando o método read
        Endereco antigo = read(id);

        // Atualiza os campos com os novos dados enviados no corpo da requisição
        antigo.setRua(endereco.getRua());
        antigo.setNumero(endereco.getNumero());
        antigo.setComplemento(endereco.getComplemento());
        antigo.setBairro(endereco.getBairro());
        antigo.setCidade(endereco.getCidade());
        antigo.setEstado(endereco.getEstado());
        antigo.setCep(endereco.getCep());

        return repository.save(antigo);
    }

    // Excluir endereco
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Endereco endereco = read(id);
        repository.delete(endereco);
    }
}
