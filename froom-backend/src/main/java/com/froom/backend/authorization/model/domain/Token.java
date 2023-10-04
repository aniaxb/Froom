package com.froom.backend.authorization.model.domain;

import com.froom.backend.user.model.dto.UserDto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Token {
    String token;
    String refreshToken;
    UserDto userDto;
}
