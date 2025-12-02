package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.User;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.UserRole;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.LoginRequestDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.RegisterRequestDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.ResponseDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.infra.security.TokenService;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginRequestDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new ResponseDTO(((User) auth.getPrincipal()).getLogin(), token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterRequestDTO data){
        if(this.repository.findByEmail(data.email()).isPresent()) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

        // Define role padrão como USER se não for informado
        UserRole role = data.role() != null ? data.role() : UserRole.USER;

        User newUser = new User(data.name(), data.email(), encryptedPassword, role);

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }
}