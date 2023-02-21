package br.com.quatipunk.dtos;

import java.util.List;

import br.com.quatipunk.models.Order;

public class OrderParams extends Order {
  private Integer clientId;
  private List<Integer> productIds;

  public Integer getClientId() {
    return clientId;
  }

  public void setClientId(Integer clientId) {
    this.clientId = clientId;
  }
  
  public List<Integer> getProductIds() {
    return productIds;
  }

  public void setProductIds(List<Integer> productIds) {
    this.productIds = productIds;
  }
}
