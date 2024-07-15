package com.dac.conta.dto;

import java.io.Serializable;
import java.util.Date;

import com.dac.conta.model.Conta;
import com.dac.conta.model.Usuario;

public class ContaDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private int idConta;
	private int numeroConta;
	private int valorLimite;
	private int saldoConta;
	private Date dataAbertura;
	private Usuario cliente;
	private Usuario gerente;
	
	public ContaDTO() {}
	
	public ContaDTO(Conta conta) {
		idConta = conta.getIdConta();
		numeroConta = conta.getNumeroConta();
		valorLimite = conta.getValorLimite();
		saldoConta = conta.getSaldoConta();
		dataAbertura = conta.getDataAbertura();
		cliente = conta.getCliente();
		gerente = conta.getGerente();
	}

	public int getIdConta() {
		return idConta;
	}

	public void setIdConta(int idConta) {
		this.idConta = idConta;
	}

	public int getNumeroConta() {
		return numeroConta;
	}

	public void setNumeroConta(int numeroConta) {
		this.numeroConta = numeroConta;
	}

	public int getValorLimite() {
		return valorLimite;
	}

	public void setValorLimite(int valorLimite) {
		this.valorLimite = valorLimite;
	}

	public int getSaldoConta() {
		return saldoConta;
	}

	public void setSaldoConta(int saldoConta) {
		this.saldoConta = saldoConta;
	}

	public Date getDataAbertura() {
		return dataAbertura;
	}

	public void setDataAbertura(Date dataAbertura) {
		this.dataAbertura = dataAbertura;
	}

	public Usuario getCliente() {
		return cliente;
	}

	public void setCliente(Usuario cliente) {
		this.cliente = cliente;
	}

	public Usuario getGerente() {
		return gerente;
	}

	public void setGerente(Usuario gerente) {
		this.gerente = gerente;
	}
}
