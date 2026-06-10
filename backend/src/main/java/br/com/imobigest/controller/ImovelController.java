/*
 * Feito por Gustavo Vinícius Vieira Cravo
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package br.com.imobigest.controller;

import br.com.imobigest.model.Imovel;
import br.com.imobigest.repository.ImovelRepository;
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
@RequestMapping("/imoveis")
@CrossOrigin(origins = "*")
public class ImovelController {

    @Autowired
    private ImovelRepository repository;

    // Listar imoveis
    @GetMapping
    public List<Imovel> listar() {
        return repository.findAll();
    }

    // Adicionar imóveis
    @PostMapping
    public Imovel create(@RequestBody Imovel imovel) {
        return repository.save(imovel);
    }

    // BUuscar imóveis
    @GetMapping("/{id}")
    public Imovel read(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Imóvel não encontrado"));
    }

    // Editar imóveis
    @PutMapping("/{id}")
    public Imovel update(@PathVariable Long id, @RequestBody Imovel imovel) {
        
        Imovel antigo = read(id);

        
        antigo.setDescricao(imovel.getDescricao());
        antigo.setValorCompra(imovel.getValorCompra());
        antigo.setValorAluguel(imovel.getValorAluguel());
        antigo.setStatus(imovel.getStatus());
        antigo.setTipo(imovel.getTipo());
        antigo.setEndereco(imovel.getEndereco());

        return repository.save(antigo);
    }

    // Excluir imóveis
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Imovel imovel = read(id);
        repository.delete(imovel);
    }
}