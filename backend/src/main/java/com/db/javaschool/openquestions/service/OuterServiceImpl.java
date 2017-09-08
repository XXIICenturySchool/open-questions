package com.db.javaschool.openquestions.service;

import com.db.javaschool.openquestions.discovery.Services;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URL;

@Service
@Data
@Component
public class OuterServiceImpl implements OuterService {

    @Autowired
    private DiscoveryClient discoveryClient;

    @Value("${spring.application.name}")
    private String serviceName;
    @Override
    @SneakyThrows
    public String register(String id, String teacher) {

        String examUrl = "/api/getExam?id=" + id + "&teacher=" + teacher;
        String json = "{\"teacherId\":\""+teacher+
                    "\",\"url\":\""+ examUrl +
                    "\",\"serviceName\":\""+serviceName+"\"}";

        ServiceInstance serviceInstance = Services.MAPLOGIN.pickRandomInstance(discoveryClient);
        URL url = serviceInstance.getUri().toURL();
        url = new URL(url.toString()+"/exams/saveExam");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ObjectMapper objectMapper = new ObjectMapper();

        HttpEntity<String> entity = new HttpEntity<>(json, headers);
        ResponseEntity<String> loginResponse = restTemplate.exchange(url.toString(), HttpMethod.POST, entity, String.class);

        String response ="no response";

        if (loginResponse.getStatusCode() == HttpStatus.OK) {
            response = loginResponse.getBody();
        } else if (loginResponse.getStatusCode() == HttpStatus.UNAUTHORIZED) {
            response = "bas response";
        }
        return response;
    }
}
