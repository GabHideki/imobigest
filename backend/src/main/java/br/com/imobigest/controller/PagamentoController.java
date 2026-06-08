/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Adaptado para gerenciamento de Pagamentos e Aluguéis
 */
package br.com.imobigest.controller;

import br.com.imobigest.model.Pagamento;
import br.com.imobigest.model.StatusPagamento;
import br.com.imobigest.repository.PagamentoRepository;
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
@RequestMapping("/pagamentos")
@CrossOrigin(origins = "*")
public class PagamentoController {

    @Autowired
    private PagamentoRepository repository;

    // LISTAR TODOS OS PAGAMENTOS
    @GetMapping
    public List<Pagamento> listar() {
        return repository.findAll();
    }

    // LISTAR APENAS PAGAMENTOS PENDENTES
    // Rota: GET /pagamentos/pendentes
    
    
    /*
    @GetMapping("/pendentes")
    public List<Pagamento> listarPendentes() {
        // Assume-se que exista um StatusPagamento.PENDENTE no Enum
        return repository.findByStatus(StatusPagamento.PENDENTE);
    }
    */
    
    
    // ADICIONAR / GERAR PAGAMENTO (Serve para parcelas avulsas ou Aluguéis)
    @PostMapping
    public Pagamento create(@RequestBody Pagamento pagamento) {
        return repository.save(pagamento);
    }

    // BUSCAR PAGAMENTO POR ID
    @GetMapping("/{id}")
    public Pagamento read(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Pagamento não encontrado"));
    }

    // EDITAR PAGAMENTO
    @PutMapping("/{id}")
    public Pagamento update(@PathVariable Long id, @RequestBody Pagamento pagamento) {
        Pagamento antigo = read(id);

        antigo.setValor(pagamento.getValor());
        antigo.setData(pagamento.getData());
        antigo.setTipo(pagamento.getTipo());
        antigo.setStatus(pagamento.getStatus());

        return repository.save(antigo);
    }

    // ENCERRAR PAGAMENTO (Quitar/Baixar uma parcela pendente)
    // Rota: PUT /pagamentos/{id}/encerrar
    @PutMapping("/{id}/encerrar")
    public Pagamento encerrarPagamento(@PathVariable Long id) {
        Pagamento pagamento = read(id);
        
        // Altera o status para PAGO (ou o equivalente concluído no seu Enum, ex: PAGO, CONCLUIDO)
        pagamento.setStatus(StatusPagamento.PAGO); 
        
        return repository.save(pagamento);
    }

    // EXCLUIR PAGAMENTO
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Pagamento pagamento = read(id);
        repository.delete(pagamento);
    }
}