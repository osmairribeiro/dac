package com.dac.conta.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MovimentacaoFinanceira implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private int id;
	private String tipoOperacao;
	private Date data;
	private String valor;
	private List<Usuario> clientes = new ArrayList<>();
	
	public MovimentacaoFinanceira() {
		super();
	}

	public MovimentacaoFinanceira(int id, String tipoOperacao, Date data, String valor, List<Usuario> clientes) {
		super();
		this.id = id;
		this.tipoOperacao = tipoOperacao;
		this.data = data;
		this.valor = valor;
		this.clientes = clientes;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTipoOperacao() {
		return tipoOperacao;
	}

	public void setTipoOperacao(String tipoOperacao) {
		this.tipoOperacao = tipoOperacao;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public String getValor() {
		return valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

	public List<Usuario> getClientes() {
		return clientes;
	}

	public void setClientes(List<Usuario> clientes) {
		this.clientes = clientes;
	}
	
}
