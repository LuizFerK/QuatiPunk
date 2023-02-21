package br.com.quatipunk.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.quatipunk.dtos.OrderParams;
import br.com.quatipunk.hooks.Error;
import br.com.quatipunk.models.Client;
import br.com.quatipunk.models.Order;
import br.com.quatipunk.repositories.ClientRepository;
import br.com.quatipunk.repositories.OrderRepository;

/**
 *
 * Manage the app orders
 */
@RestController
public class OrdersController {
  @Autowired
	OrderRepository orderRepository;
  
  @Autowired
	ClientRepository clientRepository;

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
  public Object create(@RequestBody OrderParams orderParams) {
    Optional<Client> client = clientRepository.findById(orderParams.getClientId());

    Order order = Order.paramsToOrder(orderParams);

    if (client.isPresent()) {
      order.setClient(client.get());
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }

    try {
      Order persistedOrder = orderRepository.save(order);
      return new ResponseEntity<Order>(persistedOrder, HttpStatus.OK);
    } catch(Exception err) {
      return new ResponseEntity<Error>(Error.badRequest(), HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @return update a order
   */
  @RequestMapping(value = "/orders/{id}", method = RequestMethod.PUT)
  @PutMapping(
    consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
    produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
  )
  public Object update(@RequestBody Order order, @PathVariable Integer id) {
    Optional<Order> orderInDb = orderRepository.findById(id);

    if (orderInDb.isPresent()) {
      try {
        Order orderToUpdate = orderInDb.get();
        // orderToUpdate.setName(order.getName());
        // orderToUpdate.setQuantity(order.getQuantity());
        // orderToUpdate.setMaxQuantity(order.getMaxQuantity());
        // orderToUpdate.setCategory(order.getCategory());
        // orderToUpdate.setPrice(order.getPrice());
        // orderToUpdate.setUm(order.getUm());

        Order persistedOrder = orderRepository.save(orderToUpdate);
        return new ResponseEntity<Order>(persistedOrder, HttpStatus.OK);
      } catch(Exception err) {
        return new ResponseEntity<Error>(Error.badRequest(), HttpStatus.BAD_REQUEST);
      }
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
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
