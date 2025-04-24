package com.vit.hostel.management.service;

import com.vit.hostel.management.entities.AdminEntity;
import com.vit.hostel.management.repository.AdminRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdminDetailsService implements UserDetailsService {
    private final AdminRepository adminRepository;
    AdminDetailsService(AdminRepository adminRepository){
        this.adminRepository = adminRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminEntity admin = adminRepository.findByRegNumber(username);
        if(admin == null){
            System.out.println("Admin not found");
            throw new UsernameNotFoundException("User not found");
        }
        return new AdminPrincipal(admin);
    }
}
