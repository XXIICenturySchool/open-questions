package com.db.javaschool.openquestions.service;

import com.db.javaschool.openquestions.dao.TaskRepository;
import com.db.javaschool.openquestions.entity.TaskEntity;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Builder
@Data
@Service
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;


    @Override
    public String create(TaskEntity task) {
        TaskEntity taskEntity = TaskEntity.builder().
                question(task.getQuestion()).
                category(task.getCategory()).
                answer(task.getAnswer()).
                options(task.getOptions()).
                pictureUrl(task.getPictureUrl()).build();

        taskRepository.insert(taskEntity);

        return taskEntity.getId();
    }
}
