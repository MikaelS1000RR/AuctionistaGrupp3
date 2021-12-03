package com.example.auctionista;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

import java.util.Collections;

@SpringBootApplication
//@EnableAutoConfiguration(exclude = HibernateJpaAutoConfiguration.class)

public class AuctionistaApplication {

	public static void main(String[] args) {
		//SpringApplication.run(AuctionistaApplication.class, args);

		String PORT = System.getenv("PORT");

		SpringApplication app = new SpringApplication(AuctionistaApplication.class);
		app.setDefaultProperties(Collections
				.singletonMap("server.port", PORT == null ? 4000 : PORT));
		app.run(args);

	}

}
