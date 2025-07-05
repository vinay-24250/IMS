package com.IMS.Backend.Controller;

import com.IMS.Backend.Model.Users;
import com.IMS.Backend.Repo.UserRepo;
import com.IMS.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping
public class UserController {

	@Autowired
	private UserService service;

	@Autowired
	private UserRepo userRepo;

	@GetMapping("/")
    public String greet(HttpServletRequest request) {
    	return request.getSession().getId();
    }
	
	@GetMapping("csrf-token")
	public CsrfToken getcsrfToken(HttpServletRequest request) {
		return (CsrfToken) request.getAttribute("_csrf");
	}

	@PostMapping("/register")
	public Users register(@RequestBody Users user){
             return service.registerUser(user);
	}

	@GetMapping("/users")
	public List<Users> getUsers(){
		 return service.getAllUsers();
	}

	@GetMapping("/api/users/me")
	public ResponseEntity<Users> getCurrentUserInfo(Authentication authentication) {
		String email = authentication.getName(); // from JWT
		Users user = userRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		return ResponseEntity.ok(user);
	}


	@PostMapping("/login")
	public Map<String, String> login(@RequestBody Users user) {
		String token = service.verify(user);
		Map<String, String> response = new HashMap<>();
		response.put("token", "Bearer " + token);
		return response;
	}

}