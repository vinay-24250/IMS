package com.IMS.Backend.Service;

import com.IMS.Backend.Model.Product;
import com.IMS.Backend.Repo.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    // Get all products
    public List<Product> getProducts() {
        return repository.findAll();
    }

    public Product addNewProduct(Product product) {
        return repository.save(product);
    }

    // Get product by ID
    public Optional<Product> getProductById(int id) {
        return repository.findById(id);
    }

    // Delete product by ID
    public void deleteProductById(int id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        repository.deleteById(id);
    }

    // Update product
    public Product updateProduct(int id, Product updatedProduct) {
        Optional<Product> existing = repository.findById(id);
        if (existing.isPresent()) {
            Product product = existing.get();
            
            product.setProductName(updatedProduct.getProductName());
            product.setRating(updatedProduct.getRating());
            product.setPrice(updatedProduct.getPrice());
            product.setCategory(updatedProduct.getCategory());
            product.setQuantity(updatedProduct.getQuantity());
            product.setSupplierContact(updatedProduct.getSupplierContact());

            return repository.save(product);
        }
        return null;
    }


    // Get low stock products
    public List<Product> getLowStockProducts(int threshold) {
        return repository.findByQuantityLessThan(threshold);
    }
}
