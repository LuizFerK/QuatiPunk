package br.com.quatipunk.dtos;

import br.com.quatipunk.models.Product;

public class OrderProductDTO {
	Product product;
	Integer quantity;

  public OrderProductDTO(Product product, Integer quantity) {
    this.product = product;
    this.quantity = quantity;
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
