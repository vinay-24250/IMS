package com.IMS.Backend.Repo;

import com.IMS.Backend.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<Users,Long> {

        Optional<Users> findByEmail(String email);

}
