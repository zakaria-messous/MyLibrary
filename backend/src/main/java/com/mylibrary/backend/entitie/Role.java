package com.mylibrary.backend.entitie;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum Role {
    SUPERADMIN(
            Set.of(Permission.ADMIN_READ,
                    Permission.ADMIN_UPDATE,
                    Permission.ADMIN_CREATE,
                    Permission.ADMIN_DELETE,
                    Permission.ADMIN_READADMIN,
                    Permission.ADMIN_CREATEADMIN,
                    Permission.ADMIN_UPDATEADMIN,
                    Permission.ADMIN_DELETEADMIN
            )
    ),
    ADMIN(
            Set.of(Permission.ADMIN_READ,
                    Permission.ADMIN_UPDATE,
                    Permission.ADMIN_CREATE,
                    Permission.ADMIN_DELETE
            )
    ) ,
    CLIENT(Collections.emptySet())
    ;

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getSimpleGrantedAuthorities() {
        var authorities = getPermissions().stream()
                 .map(permission -> new SimpleGrantedAuthority(permission.name()))
                 .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + name()));
        return authorities;
    }
}
