package br.com.quatipunk.models;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

@Embeddable
public class OrderProductKey implements Serializable {
  private static final long serialVersionUID = 1L;

  private Integer orderId;
  private Integer productId;
 
  public OrderProductKey() {}

  public OrderProductKey(Integer orderId, Integer productId) {
    super();
    this.orderId = orderId;
    this.productId = productId;
  }

  public Integer getOrderId() {
    return orderId;
  }

  public void setOrderId(Integer orderId) {
    this.orderId = orderId;
  }

  public Integer getProductId() {
    return productId;
  }

  public void setProductId(Integer productId) {
    this.productId = productId;
  }

  @Override
  public int hashCode() {
      final int prime = 31;
      int result = 1;
      result = prime * result
              + ((orderId == null) ? 0 : orderId.hashCode());
      result = prime * result
              + ((productId == null) ? 0 : productId.hashCode());
      return result;
  }

  @Override
  public boolean equals(Object obj) {
      if (this == obj)
          return true;
      if (obj == null)
          return false;
      if (getClass() != obj.getClass())
          return false;
      OrderProductKey other = (OrderProductKey) obj;
      return Objects.equals(getOrderId(), other.getOrderId()) && Objects.equals(getProductId(), other.getProductId());
  }
}
