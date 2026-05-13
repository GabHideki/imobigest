/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.service;

import br.com.imobigest.dao.ContratoDAO;
import br.com.imobigest.model.Cliente;
import br.com.imobigest.model.Contrato;
import br.com.imobigest.model.Corretor;
import br.com.imobigest.model.Imovel;
import br.com.imobigest.model.Pagamento;
import br.com.imobigest.model.StatusContrato;
import br.com.imobigest.model.StatusImovel;
import br.com.imobigest.model.TipoContrato;
import br.com.imobigest.model.Usuario;
import br.com.imobigest.util.Validador;
import java.util.List;

/**
 *
 * @author ghide
 */
public class ContratoService {
    private final ContratoDAO contratoDAO;
    private final UsuarioService usuarioService;
    private final ImovelService imovelService;
    
    public ContratoService(ContratoDAO contratoDAO, UsuarioService usuarioService,
                           ImovelService imovelService){
        this.contratoDAO = contratoDAO;
        this.usuarioService = usuarioService;
        this.imovelService = imovelService;
    }
    
    public void criarContrato(
        StatusContrato status,
        int prazoContrato,
        TipoContrato tipo,
        int idCliente,
        int idCorretor,
        int idImovel,
        List<Pagamento> pagamentos
        ) {
        
        if(status == null){
            throw new IllegalArgumentException("Status invalido");
        }
        
        Validador.validarInteiroPositivo(prazoContrato, "Prazo contrato");
        
        if(tipo == null){
            throw new IllegalArgumentException("Tipo invalido");
        }
        
        Usuario usuarioCliente = usuarioService.buscarUsuarioPorId(idCliente);
        if(!(usuarioCliente instanceof Cliente)){
            throw new IllegalArgumentException("Usuario informado nao e Cliente");
        }
        Cliente cliente = (Cliente) usuarioCliente;
        
        Usuario usuarioCorretor = usuarioService.buscarUsuarioPorId(idCorretor);
        if(!(usuarioCorretor instanceof Corretor)){
            throw new IllegalArgumentException("Usuario informado nao e Corretor");
        }
        Corretor corretor = (Corretor) usuarioCorretor;
        
        Imovel imovel = imovelService.buscarImovelPorId(idImovel);
        if(imovel.getStatus() != StatusImovel.DISPONIVEL){
            throw new IllegalArgumentException("Imovel indisponivel");
        }
        
        if(pagamentos == null || pagamentos.isEmpty()){
            throw new IllegalArgumentException("Lista de pagamentos invalida");
        }
        
        Contrato contrato = new Contrato(
            status,
            prazoContrato,
            tipo,
            cliente,
            corretor,
            imovel,
            pagamentos
        );
        
        contratoDAO.salvar(contrato);
        
        if(tipo == TipoContrato.ALUGUEL){
            imovel.setStatus(StatusImovel.ALUGADO);
        } else {
            imovel.setStatus(StatusImovel.VENDIDO);
        }
    }
    
    public List<Contrato> listarContratos(){
        return contratoDAO.listar();
    }
    
    public Contrato buscarContratoPorId(int id){
        Contrato contrato = contratoDAO.buscarPorId(id);
        if(contrato == null){
            throw new IllegalArgumentException("Contrato nao encontrado");
        }
        return contrato;
    }
    
    public void removerContrato(int id){
        Contrato contrato = buscarContratoPorId(id);
        if(contrato.getImovel().getStatus() != StatusImovel.DISPONIVEL){
            contrato.getImovel().setStatus(StatusImovel.DISPONIVEL);
        }
        contratoDAO.remover(id);
    }
}