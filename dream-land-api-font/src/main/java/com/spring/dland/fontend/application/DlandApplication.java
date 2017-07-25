package com.spring.dland.fontend.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ImportResource("classpath:application-config.xml")
@PropertySource("classpath:application.properties")
@EnableScheduling
@EnableAutoConfiguration(exclude = {
		DataSourceAutoConfiguration.class,
		JpaRepositoriesAutoConfiguration.class,
		org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration.class
})
public class DlandApplication {

	public static void main(String[] args) {
		SpringApplication.run(DlandApplication.class, args);
	}
}
