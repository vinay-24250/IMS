package com.IMS.Backend.Service;

import com.IMS.Backend.DTO.ProductDTO;
import com.IMS.Backend.Model.Product;
import com.IMS.Backend.Model.Users;
import com.IMS.Backend.Repo.ProductRepository;
import com.IMS.Backend.Repo.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository prodRepo;

    @Autowired
    private UserRepo userRepo;

    // Get all products for the logged-in user
    public List<Product> getProductsByEmail(String email) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return prodRepo.findByUser(user);
    }

    public Product addNewProductFromDTO(ProductDTO dto, String email) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = new Product();
        product.setProductName(dto.getProductName());
        product.setRating(dto.getRating());
        product.setPrice(dto.getPrice());
        product.setCategory(dto.getCategory());
        product.setQuantity(dto.getQuantity());
        product.setSupplierContact(dto.getSupplierContact());
        product.setUser(user); // ✅ Associate product with the logged-in user

        return prodRepo.save(product);
    }


    // Fetch a product by ID for a specific user
    public Optional<Product> getProductByIdForUser(int productId, String email) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Product> productOpt = prodRepo.findById(productId);
        if (productOpt.isPresent() && productOpt.get().getUser().getId().equals(user.getId())) {
            return productOpt;
        }
        return Optional.empty();
    }

    // Delete a product for a specific user
    public boolean deleteUserProduct(int id, String email) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Product> productOpt = prodRepo.findById(id);

        if (productOpt.isEmpty() || !productOpt.get().getUser().getId().equals(user.getId())) {
            return false; // Product doesn't exist or doesn't belong to the user
        }

        prodRepo.deleteById(id);
        return true;
    }

    // Update a product for a specific user
    public Product updateUserProduct(int productId, Product updatedProduct, String email) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Product> existingOpt = prodRepo.findById(productId);
        if (existingOpt.isPresent()) {
            Product existing = existingOpt.get();

            if (!existing.getUser().getId().equals(user.getId())) {
                throw new AccessDeniedException("You are not authorized to update this product");
            }

            existing.setProductName(updatedProduct.getProductName());
            existing.setPrice(updatedProduct.getPrice());
            existing.setRating(updatedProduct.getRating());
            existing.setCategory(updatedProduct.getCategory());
            existing.setQuantity(updatedProduct.getQuantity());
            existing.setSupplierContact(updatedProduct.getSupplierContact());

            return prodRepo.save(existing);
        }

        return null;
    }

    // Get low-stock products for a specific user
    public List<Product> getLowStockProductsByUser(int threshold, String email) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return prodRepo.findByUserAndQuantityLessThan(user, threshold);
    }
}
