package br.com.quatipunk.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.quatipunk.hooks.Error;
import br.com.quatipunk.models.Product;
import br.com.quatipunk.repositories.ProductRepository;

/**
 *
 * Manage the app products
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductsController {
  @Autowired
	ProductRepository productRepository;

  /**
   *
   * @return all products
   */
  @RequestMapping(value = "/products", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  public List<Product> index() {
    return productRepository.findAll();
  }

  /**
   *
   * @return get product by id
   */
  @RequestMapping(value = "/products/{id}", method = RequestMethod.GET)
  public Object show(@PathVariable Integer id) {
    Optional<Product> product = productRepository.findById(id);

    if (product.isPresent()) {
      return new ResponseEntity<Product>(product.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }
  }

  /**
   *
   * @return create a product
   */
  @RequestMapping(value = "/products", method = RequestMethod.POST)
  @PostMapping(
    consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
    produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
  )
  public Object create(@RequestBody Product product) {
    try {
      Product persistedProduct = productRepository.save(product);
      return new ResponseEntity<Product>(persistedProduct, HttpStatus.OK);
    } catch(Exception err) {
      return new ResponseEntity<Error>(Error.badRequest(), HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @return update a product
   */
  @RequestMapping(value = "/products/{id}", method = RequestMethod.PUT)
  @PutMapping(
    consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
    produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
  )
  public Object update(@RequestBody Product product, @PathVariable Integer id) {
    Optional<Product> productInDb = productRepository.findById(id);

    if (productInDb.isPresent()) {
      try {
        Product productToUpdate = productInDb.get();
        productToUpdate.setName(product.getName());
        productToUpdate.setDescription(product.getDescription());
        productToUpdate.setQuantity(product.getQuantity());
        productToUpdate.setMinQuantity(product.getMinQuantity());
        productToUpdate.setCategory(product.getCategory());
        productToUpdate.setPrice(product.getPrice());
        productToUpdate.setUm(product.getUm());

        Product persistedProduct = productRepository.save(productToUpdate);
        return new ResponseEntity<Product>(persistedProduct, HttpStatus.OK);
      } catch(Exception err) {
        return new ResponseEntity<Error>(Error.badRequest(), HttpStatus.BAD_REQUEST);
      }
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }
  }

  /**
   *
   * @return delete product by id
   */
  @RequestMapping(value = "/products/{id}", method = RequestMethod.DELETE)
  public Object delete(@PathVariable Integer id) {
    Optional<Product> product = productRepository.findById(id);

    if (product.isPresent()) {
      productRepository.delete(product.get());
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<Error>(Error.notFound(), HttpStatus.NOT_FOUND);
    }
  }
}
