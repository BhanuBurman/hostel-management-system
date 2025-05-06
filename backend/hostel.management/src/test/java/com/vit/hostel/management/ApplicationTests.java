package com.vit.hostel.management;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ApplicationTests {

	@Test
	void contextLoads() {
		// Just to test if the Spring context loads
	}

	@Test
	void testAddition() {
		int result = 2 + 3;
		assertEquals(5, result);
	}
}
