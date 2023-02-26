package br.com.quatipunk.controllers;

import java.util.Optional;

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
import org.springframework.web.bind.annotation.RestController;

import at.favre.lib.crypto.bcrypt.BCrypt;
import br.com.quatipunk.hooks.Error;
import br.com.quatipunk.models.User;
import br.com.quatipunk.repositories.UserRepository;

/**
 *
 * Manage the app users
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UsersController {
  @Autowired
	UserRepository userRepository;

  /**
   *
   * @return user login
   */
  @RequestMapping(value = "/users/login", method = RequestMethod.POST)
  @PostMapping(
    consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
    produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
  )
  public Object login(@RequestBody User userCredentials) {
    Optional<User> user = userRepository.findById(userCredentials.getName());

    if (user.isPresent()) {
      System.out.println(userCredentials.getPassword());
      System.out.println(user.get().getPassword());
      BCrypt.Result result = BCrypt.verifyer().verify(userCredentials.getPassword().toCharArray(), user.get().getPassword());
      
      if (result.verified) {
        return new ResponseEntity<>(HttpStatus.OK);
      } else {
        return new ResponseEntity<Error>(Error.forbidden(), HttpStatus.FORBIDDEN);
      }
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }
  }

  /**
   *
   * @return create a user
   */
  @RequestMapping(value = "/users", method = RequestMethod.POST)
  @PostMapping(
    consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
    produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
  )
  public Object create(@RequestBody User user) {
    Optional<User> alreadyCreatedUser = userRepository.findById(user.getName());

    if (alreadyCreatedUser.isPresent()) {
      return new ResponseEntity<Error>(Error.alreadyExists("User"), HttpStatus.BAD_REQUEST);
    }

    try {
      user.putHashedPassword(user.getPassword());
      User persistedUser = userRepository.save(user);
      return new ResponseEntity<User>(persistedUser, HttpStatus.OK);
    } catch(Exception err) {
      return new ResponseEntity<Error>(Error.badRequest(), HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @return delete user by name
   */
  @RequestMapping(value = "/users/{name}", method = RequestMethod.DELETE)
  public Object delete(@PathVariable String name) {
    Optional<User> user = userRepository.findById(name);

    if (user.isPresent()) {
      userRepository.delete(user.get());
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }
  }
}
