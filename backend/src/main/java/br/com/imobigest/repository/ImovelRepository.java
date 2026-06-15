/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.repository;

import br.com.imobigest.model.Imovel;
import br.com.imobigest.model.StatusImovel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author ghide
 */
public interface ImovelRepository extends JpaRepository<Imovel, Long> {
    List<Imovel> findByStatus(StatusImovel status);
    List<Imovel> findByNomeContainingIgnoreCase(String nome);
}
