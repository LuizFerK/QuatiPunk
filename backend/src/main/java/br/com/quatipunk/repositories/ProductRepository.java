package br.com.quatipunk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.quatipunk.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
}
