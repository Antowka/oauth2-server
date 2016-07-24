package ru.antowka.auth.config;

import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

/**
 * Config resource for use oauth2 authorization
 */
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

    private static final String RESOURCE_PREFIX = "oauth2-server";

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
              .csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/users/signup").anonymous()
                .antMatchers("/", "/dist/**").permitAll()
              .and()
                .authorizeRequests()
                .antMatchers("/api/**").hasAuthority("ROLE_ADMIN")
              .and()
                .authorizeRequests()
                .anyRequest().authenticated();
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.resourceId(RESOURCE_PREFIX);
    }
}
