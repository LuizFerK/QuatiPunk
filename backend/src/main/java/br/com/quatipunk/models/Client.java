package br.com.quatipunk.models;

import javax.persistence.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.br.CPF;

@Entity(name = "clients")
public class Client {
  @Id
  @CPF(message = "Não é um CPF válido.")
  @Column(unique = true)
  private String cpf;

  @NotNull
  @Size(min = 1, max = 25, message = "O nome do cliente deve ter no máximo 25 caracteres.")
  @Pattern(regexp = "[^0-9]*", message = "O nome de cliente não pode conter digitos.")
  private String name;

  @NotNull
  @Size(min = 11, max = 11, message = "O telefone do cliente deve ter no máximo 11 dígitos.")
  @Pattern(regexp = "[\\d]*", message = "O telefone de cliente pode conter apenas digitos.")
  private String phone;

  @NotNull
  @Size(min = 3, max = 40, message = "O endereço do cliente deve ter no mínimo 3 e no máximo 40 caracteres.")
  private String address;

  @Email(message = "Não é um endereço de E-mail válido.")
  private String mail;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}
}
