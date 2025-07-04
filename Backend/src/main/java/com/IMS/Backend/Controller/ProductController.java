package com.IMS.Backend.Controller;

import com.IMS.Backend.DTO.ProductDTO;
import com.IMS.Backend.Model.Product;
import com.IMS.Backend.Service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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


    @GetMapping("/my-products")
    public ResponseEntity<List<Product>> getAllProducts(Authentication authentication) {
        String email = authentication.getName();
        List<Product> products = service.getProductsByEmail(email);

        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<?> addProduct(@RequestBody ProductDTO productDTO, Authentication authentication) {
        String email = authentication.getName();
        Product savedProduct = service.addNewProductFromDTO(productDTO, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }


    @GetMapping("/fetchById/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable int productId, Authentication authentication) {
        String email = authentication.getName();
        Optional<Product> productOpt = service.getProductByIdForUser(productId, email);

        return productOpt
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") int productId, Authentication authentication) {
        String email = authentication.getName();
        boolean deleted = service.deleteUserProduct(productId, email);

        if (deleted) return ResponseEntity.ok("Product deleted successfully");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found or unauthorized");
    }
    @PutMapping("/update/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable int productId, @RequestBody Product updatedProduct, Authentication authentication) {
        String email = authentication.getName();
        Product updated = service.updateUserProduct(productId, updatedProduct, email);

        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Product>> getLowStockProducts(@RequestParam(defaultValue = "10") int threshold, Authentication authentication) {
        String username = authentication.getName();
        List<Product> lowStockProducts = service.getLowStockProductsByUser(threshold, username);

        if (lowStockProducts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(lowStockProducts, HttpStatus.OK);
    }

    }
