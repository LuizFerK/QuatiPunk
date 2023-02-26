package br.com.quatipunk.models;

import javax.persistence.*;

import javax.validation.constraints.NotNull;

import at.favre.lib.crypto.bcrypt.BCrypt;

@Entity(name = "users")
public class User {
  @Id
  @Column(unique = true)
  private String name;

  @NotNull
  private String password;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void putHashedPassword(String password) {
		this.password = BCrypt.withDefaults().hashToString(12, password.toCharArray());
	}
}
