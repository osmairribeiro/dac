package com.dac.conta.model;

import java.io.Serializable;
import java.util.Objects;

public class Usuario implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private int id;
	private String nome;
	private String cpf;
	private String perfilUsuario;
	
	public Usuario() {
		super();
	}

	public Usuario(int id, String nome, String cpf, String perfilUsuario) {
		super();
		this.id = id;
		this.nome = nome;
		this.cpf = cpf;
		this.perfilUsuario = perfilUsuario;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getPerfilUsuario() {
		return perfilUsuario;
	}

	public void setPerfilUsuario(String perfilUsuario) {
		this.perfilUsuario = perfilUsuario;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		return id == other.id;
	}
}
