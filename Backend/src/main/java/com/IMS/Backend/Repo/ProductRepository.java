package com.IMS.Backend.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.IMS.Backend.Model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
   
	List<Product> findByQuantityLessThan(int threshold);
}
