package com.froom.backend.authorization.model.command;

public record RegisterUserCommand (

    String firstName,
    String lastName,
    String email,
    String password

) {}
