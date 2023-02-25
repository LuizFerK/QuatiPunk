package br.com.quatipunk.models;

import java.util.Date;
import java.util.Set;

import javax.persistence.*;

import javax.validation.constraints.NotNull;

import br.com.quatipunk.dtos.OrderParams;

@Entity(name = "orders")
public class Order {
	@Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @NotNull
  private Date date;

  @NotNull
  private Integer quantity;

  @NotNull
  private Float price;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "clientId")
	private Client client;

	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinTable(
		name = "order_products", 
		joinColumns = @JoinColumn(name = "orderId"), 
		inverseJoinColumns = @JoinColumn(name = "productId"))
	Set<Product> products;

	public static Order paramsToOrder(OrderParams orderParams) {
		Order newOrder = new Order();

		newOrder.date = orderParams.getDate();
		newOrder.quantity = orderParams.getQuantity();
		newOrder.price = orderParams.getPrice();

		return newOrder;
	}

  public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

  public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Set<Product> getProducts() {
		return products;
	}

	public void setProducts(Set<Product> products) {
		this.products = products;
	}
}
