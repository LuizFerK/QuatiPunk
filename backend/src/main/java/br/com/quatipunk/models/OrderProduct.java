package br.com.quatipunk.models;

import javax.persistence.*;

import javax.validation.constraints.NotNull;

@Entity(name = "order_products")
public class OrderProduct {
  @EmbeddedId
	private OrderProductKey id = new OrderProductKey();

	@ManyToOne
	@MapsId("orderId")
	Order order;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@MapsId("productId")
	Product product;

	@NotNull
	Integer quantity;

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
}
