package com.IMS.Backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import com.IMS.Backend.Model.Product;
import com.IMS.Backend.Service.ProductService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("http://localhost:5173")
public class ProductController {
    
    @Autowired
    private ProductService service;
    
    @GetMapping("/")
    public String greet(HttpServletRequest request) {
    	return request.getSession().getId();
    }
    
    @GetMapping("csrf-token")
    public CsrfToken getCsrfToken(HttpServletRequest request) {
    	return (CsrfToken) request.getAttribute("_csrf");
    }
    
   
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = service.getProducts();
        
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        if (product.getProductId() != 0 && service.getProductById(product.getProductId()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Product with this ID already exists.");
        }

        Product savedProduct = service.addNewProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    
    @GetMapping("/fetchById/{productId}")
    public Optional<Product> getProduct(@PathVariable int productId){
    	return service.getProductById(productId);
    }
    
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") int productId) {
        try {
            service.deleteProductById(productId);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
    }
    
    @PutMapping("/update/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable int productId, @RequestBody Product updatedProduct) {
        Product updated = service.updateProduct(productId, updatedProduct);

        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
 // Get products with quantity less than a specified threshold
    @GetMapping("/low-stock")
    public ResponseEntity<List<Product>> getLowStockProducts(@RequestParam(defaultValue = "10") int threshold) {
        List<Product> lowStockProducts = service.getLowStockProducts(threshold);

        if (lowStockProducts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(lowStockProducts, HttpStatus.OK);
    }

    
    
    
    
    }