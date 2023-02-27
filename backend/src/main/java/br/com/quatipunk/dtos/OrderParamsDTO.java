package br.com.quatipunk.dtos;

import java.util.List;

import br.com.quatipunk.models.Order;

public class OrderParamsDTO extends Order {
  private String clientCpf;
  private List<OrderProductParamsDTO> products;

  public String getClientCpf() {
    return clientCpf;
  }

  public void setClientCpf(String clientCpf) {
    this.clientCpf = clientCpf;
  }
  
  public List<OrderProductParamsDTO> getProductsDTO() {
    return products;
  }

  public void setProducts(List<OrderProductParamsDTO> products) {
    this.products = products;
  }
}
