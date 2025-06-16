package com.IMS.Backend.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    private int productId;

    private String productName;
    private double rating;
    private float price;
    private String category;
    private int quantity;
    private String supplierContact;
}
