package com.froom.froombackend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FroomBackendApplication

fun main(args: Array<String>) {
	runApplication<FroomBackendApplication>(*args)
}
