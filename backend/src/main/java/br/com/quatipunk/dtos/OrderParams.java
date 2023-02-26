package br.com.quatipunk.dtos;

import java.util.List;

import br.com.quatipunk.models.Order;

public class OrderParams extends Order {
  private String clientCpf;
  private List<Integer> productIds;

  public String getClientCpf() {
    return clientCpf;
  }

  public void setClientCpf(String clientCpf) {
    this.clientCpf = clientCpf;
  }
  
  public List<Integer> getProductIds() {
    return productIds;
  }

  public void setProductIds(List<Integer> productIds) {
    this.productIds = productIds;
  }
}
