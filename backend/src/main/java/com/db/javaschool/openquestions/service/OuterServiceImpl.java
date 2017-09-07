package com.db.javaschool.openquestions.service;

import com.db.javaschool.openquestions.discovery.Services;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Data
@Component
public class OuterServiceImpl implements OuterService {

    @Autowired
    private DiscoveryClient discoveryClient;

    @Override
    public String register(String id, String teacher) {

        ServiceInstance serviceInstance = Services.MAPLOGIN.pickRandomInstance(discoveryClient);
        String globalExamId = Integer.toString((int)(Math.random() * Integer.MAX_VALUE));
        //TODO implementation of connecting to another service (gate, and login service)
        return globalExamId;
    }
}
