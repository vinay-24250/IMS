package com.IMS.Backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping
public class UserController {
	
	@GetMapping("/")
    public String greet(HttpServletRequest request) {
    	return request.getSession().getId();
    }

}
