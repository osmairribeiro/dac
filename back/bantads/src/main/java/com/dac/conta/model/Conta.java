package com.dac.conta.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

public class Conta implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private int idConta;
	private int numeroConta;
	private int valorLimite;
	private int saldoConta;
	private Date dataAbertura;
	private Usuario cliente;
	private Usuario gerente;
	
	public Conta() {
		super();
	}

	public Conta(int idConta, int numeroConta, int valorLimite, int saldoConta, Date dataAbertura, Usuario cliente, Usuario gerente) {
		super();
		this.idConta = idConta;
		this.numeroConta = numeroConta;
		this.valorLimite = valorLimite;
		this.saldoConta = saldoConta;
		this.dataAbertura = dataAbertura;
		this.cliente = cliente;
		this.gerente = gerente;
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

	@Override
	public int hashCode() {
		return Objects.hash(idConta, numeroConta);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Conta other = (Conta) obj;
		return Objects.equals(idConta, other.idConta) && Objects.equals(numeroConta, other.numeroConta);
	}

}
