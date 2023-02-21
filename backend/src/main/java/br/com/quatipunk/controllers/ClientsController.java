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

import br.com.quatipunk.hooks.Error;
import br.com.quatipunk.models.Client;
import br.com.quatipunk.repositories.ClientRepository;

/**
 *
 * Manage the app clients
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

  /**
   *
   * @return get client by id
   */
  @RequestMapping(value = "/clients/{id}", method = RequestMethod.GET)
  public Object show(@PathVariable Integer id) {
    Optional<Client> client = clientRepository.findById(id);

    if (client.isPresent()) {
      return new ResponseEntity<Client>(client.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }
  }

  /**
   *
   * @return create a client
   */
  @RequestMapping(value = "/clients", method = RequestMethod.POST)
  @PostMapping(
    consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
    produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
  )
  public Object create(@RequestBody Client client) {
    try {
      Client persistedClient = clientRepository.save(client);
      return new ResponseEntity<Client>(persistedClient, HttpStatus.OK);
    } catch(Exception err) {
      return new ResponseEntity<Error>(Error.badRequest(), HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @return update a client
   */
  @RequestMapping(value = "/clients/{id}", method = RequestMethod.PUT)
  @PutMapping(
    consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
    produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
  )
  public Object update(@RequestBody Client client, @PathVariable Integer id) {
    Optional<Client> clientInDb = clientRepository.findById(id);

    if (clientInDb.isPresent()) {
      try {
        Client clientToUpdate = clientInDb.get();
        clientToUpdate.setAddress(client.getAddress());
        clientToUpdate.setCpf(client.getCpf());
        clientToUpdate.setMail(client.getMail());
        clientToUpdate.setName(client.getName());
        clientToUpdate.setPhone(client.getPhone());

        Client persistedClient = clientRepository.save(clientToUpdate);
        return new ResponseEntity<Client>(persistedClient, HttpStatus.OK);
      } catch(Exception err) {
        return new ResponseEntity<Error>(Error.badRequest(), HttpStatus.BAD_REQUEST);
      }
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }
  }

  /**
   *
   * @return delete client by id
   */
  @RequestMapping(value = "/clients/{id}", method = RequestMethod.DELETE)
  public Object delete(@PathVariable Integer id) {
    Optional<Client> client = clientRepository.findById(id);

    if (client.isPresent()) {
      clientRepository.delete(client.get());
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }
  }
}
