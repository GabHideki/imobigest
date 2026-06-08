/*
 * Feito por Gustavo Vinícius Vieira Cravo
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/*
 * Feito por Gustavo Vinícius Vieira Cravo
 * Adaptado para gerenciamento de Imóveis
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

    // LISTAR TODOS OS IMÓVEIS
    @GetMapping
    public List<Imovel> listar() {
        return repository.findAll();
    }

    // ADICIONAR IMÓVEL
    @PostMapping
    public Imovel create(@RequestBody Imovel imovel) {
        return repository.save(imovel);
    }

    // BUSCAR IMÓVEL POR ID
    @GetMapping("/{id}")
    public Imovel read(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Imóvel não encontrado"));
    }

    // EDITAR IMÓVEL
    @PutMapping("/{id}")
    public Imovel update(@PathVariable Long id, @RequestBody Imovel imovel) {
        // Valida se o imóvel existe no banco de dados
        Imovel antigo = read(id);

        // Atualiza os campos com as novas informações fornecidas
        antigo.setDescricao(imovel.getDescricao());
        antigo.setValorCompra(imovel.getValorCompra());
        antigo.setValorAluguel(imovel.getValorAluguel());
        antigo.setStatus(imovel.getStatus());
        antigo.setTipo(imovel.getTipo());
        antigo.setEndereco(imovel.getEndereco());

        return repository.save(antigo);
    }

    // EXCLUIR IMÓVEL
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Imovel imovel = read(id);
        repository.delete(imovel);
    }
}