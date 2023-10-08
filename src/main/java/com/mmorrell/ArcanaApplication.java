package com.mmorrell;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Resources;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@Slf4j
public class ArcanaApplication {
    public static void main(String[] args) throws IOException {
        SpringApplication.run(ArcanaApplication.class, args);
    }
}