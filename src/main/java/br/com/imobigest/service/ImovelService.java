/*
 * Feito por Gabriel Hideki de Almeida Yamamoto
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.imobigest.service;

import br.com.imobigest.dao.ImovelDAO;
import br.com.imobigest.model.Endereco;
import br.com.imobigest.model.Imovel;
import br.com.imobigest.model.StatusImovel;
import br.com.imobigest.model.TipoImovel;
import br.com.imobigest.util.Validador;
import java.util.List;

/**
 *
 * @author ghide
 */
public class ImovelService {
    private final ImovelDAO imovelDAO;
    private final EnderecoService enderecoService;
    
    public ImovelService(ImovelDAO imovelDAO, EnderecoService enderecoService){
        this.imovelDAO = imovelDAO;
        this.enderecoService = enderecoService;
    }
    
    public void cadastrarImovel(
        String descricao, 
        double valorCompra, 
        double valorAluguel, 
        StatusImovel status, 
        TipoImovel tipo,
        String rua,
        int numero,
        String complemento,
        String bairro,
        String cidade,
        String estado,
        String cep
        ) {
        
        validarDadosImovel(
            descricao,
            valorCompra,
            valorAluguel,
            status,
            tipo
        );
        
        Endereco endereco = enderecoService.cadastrarEndereco(
            rua, 
            numero, 
            complemento, 
            bairro, 
            cidade, 
            estado, 
            cep
        );
        
        Imovel imovel = new Imovel(
            descricao, 
            valorCompra, 
            valorAluguel, 
            status, 
            tipo,
            endereco
        );
        
        imovelDAO.salvar(imovel);
    }
    
    private void validarDadosImovel(
        String descricao, 
        double valorCompra, 
        double valorAluguel, 
        StatusImovel status, 
        TipoImovel tipo
        ) {
        Validador.validarString(descricao, "Descricao");
        Validador.validarNumeroPositivo(valorCompra, "Valor compra");
        Validador.validarNumeroPositivo(valorAluguel, "Valor aluguel");
        if(status == null) {
            throw new IllegalArgumentException(
                "Status inválido"
            );
        }
        if(tipo == null) {
            throw new IllegalArgumentException(
                "Tipo inválido"
            );
        }
    }
    
    public List<Imovel> listarImoveis(){
        return imovelDAO.listar();
    }
    
    public Imovel buscarImovelPorId(int id){
        Imovel imovel = imovelDAO.buscarPorId(id);
        if(imovel == null){
            throw new IllegalArgumentException("Imovel nao encontrado");
        }
        return imovel;
    }
    
    public void removerImovel(int id){
        buscarImovelPorId(id);
        imovelDAO.remover(id);
    }
}