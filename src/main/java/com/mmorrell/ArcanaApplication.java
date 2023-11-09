package com.mmorrell;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Resources;
import com.mmorrell.config.ArcanaTrayIcon;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@Slf4j
public class ArcanaApplication {

    public static ConfigurableApplicationContext context;
    public static void main(String[] args) throws IOException {
        //SpringApplication.run(ArcanaApplication.class, args);
        SpringApplicationBuilder builder = new SpringApplicationBuilder(ArcanaApplication.class);
        builder.headless(false);
        context = builder.run(args);

        ArcanaTrayIcon trayIcon = new ArcanaTrayIcon();
    }
}