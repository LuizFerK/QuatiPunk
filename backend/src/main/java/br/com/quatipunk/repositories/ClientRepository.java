package br.com.quatipunk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.quatipunk.models.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, String>{
}
