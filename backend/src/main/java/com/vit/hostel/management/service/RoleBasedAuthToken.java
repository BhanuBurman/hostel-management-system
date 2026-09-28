package com.vit.hostel.management.service;

import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class RoleBasedAuthToken extends UsernamePasswordAuthenticationToken {
    private final String roleType;

    public RoleBasedAuthToken(String principal, String credentials, String roleType) {
        super(principal, credentials);
        this.roleType = roleType;
    }

    public RoleBasedAuthToken(Object principal, Object credentials, String roleType, Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
        this.roleType = roleType;
    }

}
