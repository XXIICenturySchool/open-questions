package com.db.javaschool.openquestions.controller;

import com.db.javaschool.openquestions.entity.TaskEntity;
import com.db.javaschool.openquestions.service.TaskServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class TaskController {
    private TaskServiceImpl taskService;
    @PostMapping(path = "/api/createTask")
    public String createTask(@RequestBody TaskEntity task) {
        return taskService.create(task);
    }

}
