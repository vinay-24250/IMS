package com.IMS.Backend.Repo;

import java.util.List;

import com.IMS.Backend.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import com.IMS.Backend.Model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	List<Product> findByUser(Users user);

	List<Product> findByUserAndQuantityLessThan(Users user, int threshold);
}
