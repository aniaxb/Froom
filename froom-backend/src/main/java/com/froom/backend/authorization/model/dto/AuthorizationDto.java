package com.froom.backend.authorization.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class AuthorizationDto {
    private String token;
    private Date expiresIn;
    private String refresh;

}
