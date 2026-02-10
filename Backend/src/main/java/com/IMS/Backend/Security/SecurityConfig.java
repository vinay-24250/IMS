/* package com.IMS.Backend.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Disable CSRF for APIs (required for Postman/React)
            .authorizeHttpRequests()
            .requestMatchers(
                "/",
                "/api/products/**", // allow access to your product endpoints
                "/api/auth/**",     // allow auth/signup/login if added
                "/csrf-token"
            ).permitAll()
            .anyRequest().authenticated(); // any other request needs auth

        return http.build();
    }
}

*/
