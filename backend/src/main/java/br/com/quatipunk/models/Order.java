package br.com.quatipunk.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import javax.validation.constraints.NotNull;

import br.com.quatipunk.dtos.OrderParamsDTO;
import br.com.quatipunk.dtos.OrderProductDTO;

@Entity(name = "orders")
public class Order {
	@Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @NotNull
  private Date date;

  @NotNull
  private String payment;

  @NotNull
  private Float price;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "clientCpf")
	private Client client;

	@OneToMany(mappedBy = "order", cascade = CascadeType.REMOVE)
	Set<OrderProduct> products  = new HashSet<>();

	public static Order paramsToOrder(OrderParamsDTO orderParams) {
		Order newOrder = new Order();

		newOrder.date = orderParams.getDate();
		newOrder.payment = orderParams.getPayment();
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

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
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

	public Set<OrderProductDTO> getProducts() {
		Set<OrderProductDTO> productsDtos = new HashSet<OrderProductDTO>();
		products.forEach(op -> productsDtos.add(new OrderProductDTO(op.getProduct(), op.getQuantity())));

		return productsDtos;
	}

	public void setProducts(Set<OrderProduct> products) {
		this.products = products;
	}
}
