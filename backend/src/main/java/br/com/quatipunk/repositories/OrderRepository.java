package br.com.quatipunk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.quatipunk.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{
}
