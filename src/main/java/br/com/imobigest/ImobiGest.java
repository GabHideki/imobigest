/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 */

package br.com.imobigest;

import br.com.imobigest.dao.ContratoDAO;
import br.com.imobigest.dao.EnderecoDAO;
import br.com.imobigest.dao.ImovelDAO;
import br.com.imobigest.dao.PagamentoDAO;
import br.com.imobigest.dao.UsuarioDAO;

/**
 *
 * @author ghide
 */
public class ImobiGest {
    public static void main(String[] args) {
        ContratoDAO contratoDAO = new ContratoDAO();
        EnderecoDAO enderecoDAO = new EnderecoDAO();
        ImovelDAO imovelDAO = new ImovelDAO();
        PagamentoDAO pagamentoDAO = new PagamentoDAO();
        UsuarioDAO usuarioDAO = new UsuarioDAO();
    }
}