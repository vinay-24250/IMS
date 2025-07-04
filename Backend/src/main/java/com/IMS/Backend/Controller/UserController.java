package com.IMS.Backend.Controller;

import com.IMS.Backend.Model.Users;
import com.IMS.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

	@PostMapping("/login")
	public Map<String, String> login(@RequestBody Users user) {
		String token = service.verify(user);
		Map<String, String> response = new HashMap<>();
		response.put("token", "Bearer " + token);
		return response;
	}

}