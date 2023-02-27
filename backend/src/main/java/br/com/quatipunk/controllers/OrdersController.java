package br.com.quatipunk.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.quatipunk.dtos.OrderParamsDTO;
import br.com.quatipunk.dtos.OrderProductDTO;
import br.com.quatipunk.dtos.OrderProductParamsDTO;
import br.com.quatipunk.hooks.Error;
import br.com.quatipunk.models.Client;
import br.com.quatipunk.models.Order;
import br.com.quatipunk.models.OrderProduct;
import br.com.quatipunk.models.Product;
import br.com.quatipunk.repositories.ClientRepository;
import br.com.quatipunk.repositories.OrderRepository;
import br.com.quatipunk.repositories.ProductRepository;
import br.com.quatipunk.repositories.OrderProductRepository;

/**
 *
 * Manage the app orders
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OrdersController {
  @Autowired
	OrderRepository orderRepository;
  
  @Autowired
	ClientRepository clientRepository;
  
  @Autowired
	ProductRepository productRepository;
  
  @Autowired
	OrderProductRepository orderProductRepository;

  /**
   *
   * @return all orders
   */
  @RequestMapping(value = "/orders", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  public List<Order> index() {
    return orderRepository.findAll();
  }

  /**
   *
   * @return get order by id
   */
  @RequestMapping(value = "/orders/{id}", method = RequestMethod.GET)
  public Object show(@PathVariable Integer id) {
    Optional<Order> order = orderRepository.findById(id);

    if (order.isPresent()) {
      return new ResponseEntity<Order>(order.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }
  }

  /**
   *
   * @return create a order
   */
  @RequestMapping(value = "/orders", method = RequestMethod.POST)
  @PostMapping(
    consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
    produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
  )
  public Object create(@RequestBody OrderParamsDTO orderParams) {
    Order order = Order.paramsToOrder(orderParams);

    if (orderParams.getClientCpf() != null) {
      Optional<Client> client = clientRepository.findById(orderParams.getClientCpf());

      if (client.isPresent()) {
        order.setClient(client.get());
      } else {
        return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
      }
  
    }
    
    try {
      Order persistedOrder = orderRepository.save(order);
      Set<OrderProduct> products = new HashSet<OrderProduct>();

      for (OrderProductParamsDTO opDto : orderParams.getProductsDTO()) {
        Optional<Product> product = productRepository.findById(opDto.getProductId());

        if (product.isPresent()) {
          OrderProduct op = new OrderProduct();
          op.setOrder(persistedOrder);
          op.setProduct(product.get());
          op.setQuantity(opDto.getQuantity());

          orderProductRepository.save(op);
          products.add(op);
        } else {
          return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
        }
      }

      persistedOrder.setProducts(products);
      Order rePersistedOrder = orderRepository.save(persistedOrder);
      return new ResponseEntity<Order>(rePersistedOrder, HttpStatus.OK);
    } catch(Exception err) {
      System.out.println(err);
      return new ResponseEntity<Error>(Error.badRequest(), HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @return delete order by id
   */
  @RequestMapping(value = "/orders/{id}", method = RequestMethod.DELETE)
  public Object delete(@PathVariable Integer id) {
    Optional<Order> order = orderRepository.findById(id);

    if (order.isPresent()) {
      orderRepository.delete(order.get());
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }
  }
}
