package com.db.javaschool.openquestions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
@EntityScan
public class OpenQuestionsApplication {

	public static void main(String[] args) {
		SpringApplication.run(OpenQuestionsApplication.class, args);
	}
}
