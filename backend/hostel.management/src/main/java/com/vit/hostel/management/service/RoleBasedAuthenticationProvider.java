package com.vit.hostel.management.service;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

public class RoleBasedAuthenticationProvider implements AuthenticationProvider {
    private final AdminDetailsService adminDetailsService;
    private final StudentDetailsService studentDetailsService;
    private final PasswordEncoder encoder;

    public RoleBasedAuthenticationProvider(AdminDetailsService adminDetailsService, StudentDetailsService studentDetailsService, PasswordEncoder encoder) {
        this.adminDetailsService = adminDetailsService;
        this.studentDetailsService = studentDetailsService;
        this.encoder = encoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        RoleBasedAuthToken token = (RoleBasedAuthToken) authentication;
        String username = token.getName();
        String password = token.getCredentials().toString();
        String roleType = token.getRoleType();
        UserDetails userDetails;
        try {
            if ("Warden".equalsIgnoreCase(roleType)) {
                userDetails = adminDetailsService.loadUserByUsername(username);
            } else if ("Student".equalsIgnoreCase(roleType)) {
                userDetails = studentDetailsService.loadUserByUsername(username);
            } else {
                throw new BadCredentialsException("Unsupported role type: " + roleType);
            }
        } catch (Exception e) {
            throw new BadCredentialsException("User not found for role: " + roleType + " and username: " + username);
        }

        // ✅ Password Matching Logic
        if (!encoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password!");
        }

        return new RoleBasedAuthToken(userDetails, password,roleType, userDetails.getAuthorities() );
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return RoleBasedAuthToken.class.isAssignableFrom(authentication);
    }
}
