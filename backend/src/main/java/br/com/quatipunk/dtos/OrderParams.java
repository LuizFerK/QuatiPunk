package br.com.quatipunk.dtos;

import br.com.quatipunk.models.Order;

public class OrderParams extends Order {
  private Integer clientId;

  public Integer getClientId() {
    return clientId;
  }

  public void setClientId(Integer clientId) {
    this.clientId = clientId;
  }
}
