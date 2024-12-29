package com.mylibrary.backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        // Autoriser toutes les origines
        corsConfiguration.setAllowedOrigins(Collections.singletonList("*"));

        // Autoriser toutes les méthodes HTTP
        corsConfiguration.setAllowedMethods(Collections.singletonList("*"));

        // Autoriser tous les headers
        corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));

        // Appliquer la configuration à tous les chemins
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(source);
    }
}
