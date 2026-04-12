package com.fresherguide;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@SpringBootApplication
@SpringBootApplication(scanBasePackages = "com.fresherguide")
public class FresherguideBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(FresherguideBackendApplication.class, args);
    }

}
