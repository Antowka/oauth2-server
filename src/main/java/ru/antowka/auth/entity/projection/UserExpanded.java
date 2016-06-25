package ru.antowka.auth.entity.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import ru.antowka.auth.entity.Authority;
import ru.antowka.auth.entity.User;

import java.util.List;

@Projection(name="exp_user", types = {User.class})
public interface UserExpanded {

    String getUsername();

    String getEmail();

    boolean isEnabled();

    //TODO: // FIXME: 25.06.16 
    @Value("#{target?.getAuthorities()}")
    List<Authority> getAuthorities();
}
