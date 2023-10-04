package com.froom.backend.authorization.model.command;

public record AuthorizationCommand (
    String email,
    String password
) {}
