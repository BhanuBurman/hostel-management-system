package com.vit.hostel.management.config;

import com.vit.hostel.management.service.AdminDetailsService;
import com.vit.hostel.management.service.StudentDetailsService;
import com.vit.hostel.management.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final ApplicationContext context;

    public JwtAuthenticationFilter(JwtService jwtService, ApplicationContext context) {
        this.jwtService = jwtService;
        this.context = context;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;
        String roleType = null;

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7).trim();
            username = jwtService.extractUsername(token);
            roleType = jwtService.extractRoleType(token);
        }

        if(username != null && roleType != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails;
            if ("Warden".equalsIgnoreCase(roleType)) {
                userDetails = context.getBean(AdminDetailsService.class).loadUserByUsername(username);
            } else if ("Student".equalsIgnoreCase(roleType)) {
                userDetails = context.getBean(StudentDetailsService.class).loadUserByUsername(username);
            } else {
                throw new RuntimeException("Invalid roleType found in JWT: " + roleType);
            }
            if(jwtService.validateToken(token,userDetails)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request,response);
    }
}
