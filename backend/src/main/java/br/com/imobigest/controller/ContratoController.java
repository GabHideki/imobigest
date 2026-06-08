/*
 * Feito por Gustavo Vinícius Vieira Cravo
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/*
 * Feito por Gustavo Vinícius Vieira Cravo
 * Adaptado para gerenciamento de Contratos
 */
package br.com.imobigest.controller;

import br.com.imobigest.model.Contrato;
import br.com.imobigest.repository.ContratoRepository;
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
@RequestMapping("/contratos")
@CrossOrigin(origins = "*")
public class ContratoController {
    
    @Autowired
    private ContratoRepository repository;
    
    // Listar todos os contratos
    @GetMapping
    public List<Contrato> listar(){
        return repository.findAll();
    }
    
    // Adicionar contratos
    @PostMapping
    public Contrato create(@RequestBody Contrato contrato){
        // Caso queira adicionar validações futuras de negócio (ex: verificar se o imóvel está disponível),
        // o espaço ideal é aqui antes do save.
        return repository.save(contrato);
    }
    
    // Buscar por ID
    @GetMapping("/{id}")
    public Contrato read(@PathVariable Long id){
        return repository.findById(id)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Contrato não encontrado"));
    }
    
    // Editar contratos
    @PutMapping("/{id}")
    public Contrato update(@PathVariable Long id, @RequestBody Contrato contrato){
        // Reaproveita a lógica do read(id) para validar se o contrato existe
        Contrato antigo = read(id);
        
        // Atualiza os campos com as novas informações vindas da requisição
        antigo.setStatus(contrato.getStatus());
        antigo.setPrazoContrato(contrato.getPrazoContrato());
        antigo.setTipo(contrato.getTipo());
        antigo.setCliente(contrato.getCliente());
        antigo.setCorretor(contrato.getCorretor());
        antigo.setImovel(contrato.getImovel());
        antigo.setPagamentos(contrato.getPagamentos());
        
        return repository.save(antigo);
    }
    
    // Excluir contratos
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        Contrato contrato = read(id);
        repository.delete(contrato);
    }
}
