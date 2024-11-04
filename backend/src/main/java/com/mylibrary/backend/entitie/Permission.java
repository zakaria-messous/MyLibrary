package com.mylibrary.backend.entitie;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:createAdmin"),
    ADMIN_DELETE("admin:delete"),
    ADMIN_READADMIN("admin:readAdmin"),
    ADMIN_CREATEADMIN("admin:createAdmin"),
    ADMIN_UPDATEADMIN("admin:updateAdmin"),
    ADMIN_DELETEADMIN("admin:deleteAdmin");

    @Getter
    private final String permission;

}
