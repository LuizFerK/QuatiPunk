package br.com.quatipunk.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.quatipunk.models.Client;
import br.com.quatipunk.repositories.ClientRepository;

/**
 *
 * A sample greetings controller to return greeting text
 */
@RestController
public class ClientsController {
  @Autowired
	ClientRepository clientRepository;

  /**
   *
   * @return all clients
   */
  @RequestMapping(value = "/clients", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  public List<Client> index() {
    return clientRepository.findAll();
  }
}
