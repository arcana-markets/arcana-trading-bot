package com.mmorrell;

import com.mmorrell.config.ArcanaTrayIcon;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;

@SpringBootApplication
@Slf4j
public class ArcanaApplication {

    public static ConfigurableApplicationContext context;
    public static void main(String[] args) throws IOException {
        //SpringApplication.run(ArcanaApplication.class, args);
        SpringApplicationBuilder builder = new SpringApplicationBuilder(ArcanaApplication.class);
        builder.headless(false);
        context = builder.run(args);

        try {
            ArcanaTrayIcon trayIcon = new ArcanaTrayIcon();
        } catch (UnsatisfiedLinkError ex) {
            log.warn("Unable to create Tray Icon, Docker is likely being used.");
        }
    }
}