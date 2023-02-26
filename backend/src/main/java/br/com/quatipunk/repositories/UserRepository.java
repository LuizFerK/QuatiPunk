package br.com.quatipunk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.quatipunk.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
}
