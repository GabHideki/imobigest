/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.repository;

import br.com.imobigest.model.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author ghide
 */
public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    
}
