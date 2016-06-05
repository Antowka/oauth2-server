package ru.antowka.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .jdbcAuthentication()
            .passwordEncoder(passwordEncoder)
            .dataSource(dataSource)
            .usersByUsernameQuery("SELECT username, password, enabled FROM users WHERE username = ?")
            .authoritiesByUsernameQuery(
                        "SELECT u.username, a.authority FROM users u " +
                        "LEFT JOIN users_authorities ua ON u.id = ua.users_id " +
                        "LEFT JOIN authorities a ON a.id = ua.authorities_id " +
                        "WHERE u.username=?");
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {

        http
              .requestMatchers()
                .antMatchers("/api")
                .antMatchers("/api/**")
              .and()
                .authorizeRequests()
                .antMatchers("/api/users/signup").permitAll()
              .and()
                .formLogin()
              .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login")
              .and()
                .csrf().disable();
    }


    @Configuration
    @Order(Ordered.LOWEST_PRECEDENCE - 20)
    protected static class AuthenticationManagerConfiguration extends GlobalAuthenticationConfigurerAdapter {

        @Autowired
        private DataSource dataSource;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Override
        public void init(AuthenticationManagerBuilder auth) throws Exception {
            auth
                .jdbcAuthentication()
                .passwordEncoder(passwordEncoder)
                .dataSource(dataSource)
                .usersByUsernameQuery("SELECT username, password, enabled FROM users WHERE username = ?")
                .authoritiesByUsernameQuery(
                        "SELECT u.username, a.authority FROM users u " +
                                "LEFT JOIN users_authorities ua ON u.id = ua.users_id " +
                                "LEFT JOIN authorities a ON a.id = ua.authorities_id " +
                                "WHERE u.username=?");
        }

    }
}
