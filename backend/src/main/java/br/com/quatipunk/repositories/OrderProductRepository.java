package br.com.quatipunk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.quatipunk.models.OrderProduct;
import br.com.quatipunk.models.OrderProductKey;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, OrderProductKey>{
}
