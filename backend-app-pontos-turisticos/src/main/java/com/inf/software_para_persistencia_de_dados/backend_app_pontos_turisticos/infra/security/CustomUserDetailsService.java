package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.infra.security;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.repository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}