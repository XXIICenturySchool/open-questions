package com.db.javaschool.openquestions.service;

import com.db.javaschool.openquestions.dao.ExamRepository;
import com.db.javaschool.openquestions.dao.TaskRepository;
import com.db.javaschool.openquestions.data.ExamConfiguration;
import com.db.javaschool.openquestions.data.ExamData;
import com.db.javaschool.openquestions.data.TaskData;
import com.db.javaschool.openquestions.entity.ExamEntity;
import com.db.javaschool.openquestions.entity.TaskEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Builder
@Data
@Service
@AllArgsConstructor
public class ExamServiceImpl implements ExamService {
    private TaskRepository taskRepository;
    private ExamRepository examRepository;
    private OuterServiceImpl outerService;

    @Override
    public ExamData get(String localExamId, String teacherId) {
        List<TaskData> taskData = getTaskEntities(localExamId).stream()
                .map(task -> TaskData.builder()
                        .answer(task.getAnswer())
                        .question(task.getQuestion())
                        .options(task.getOptions())
                        .pictureUrl(task.getPictureUrl())
                        .build())
                .collect(Collectors.toList());

        return ExamData.builder()
                .tasks(taskData)
                .teacherId(teacherId)
                .build();
    }

    @Override
    public ExamData getByGlobalExamId(String id, String teacherId) {
        ExamEntity examEntity = this.examRepository.findByGlobalExamId(id);
        return get(examEntity.getId(), teacherId);
    }

    public List<TaskEntity> getTaskEntities(String localExamId) {
        ExamEntity exam = this.examRepository.findOne(localExamId);
        ExamConfiguration configuration = exam.getConfiguration();

        List<TaskEntity> tasks = Optional.of(configuration.getIds())
                .orElse(Collections.emptyList())
                .stream()
                .map(taskRepository::findOne)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());


        Optional.of(configuration.getExamContainer()).orElse(Collections.emptyMap())
                .forEach((category, categoryCount) -> {
                    List<String> ids = taskRepository.findIdsByCategory(category.toLowerCase()).stream()
                            .map(TaskEntity::getId)
                            .filter(id -> tasks.stream().noneMatch(task -> task.getId().equals(id)))
                            .collect(Collectors.toList());

                    Collections.shuffle(ids);
                    tasks.addAll(ids.stream()
                            .limit(categoryCount)
                            .map(taskRepository::findOne)
                            .filter(Objects::nonNull)
                            .collect(Collectors.toList())
                    );
                });

        return tasks;
    }

    @Override
    public ExamEntity create(ExamConfiguration configuration) {
        ExamEntity examEntity = ExamEntity.builder()
                .configuration(configuration)
                .build();
        examRepository.insert(examEntity);

        String returnedGlobalExamId = null;
        try {
            returnedGlobalExamId = outerService.register(examEntity.getId(), configuration.getTeacherId());
        } catch (Exception e) {
            examRepository.delete(examEntity.getId());
            throw e;
        }

        examEntity = ExamEntity.builder()
                .configuration(examEntity.getConfiguration())
                .id(examEntity.getId())
                .globalExamId(returnedGlobalExamId)
                .build();
        examRepository.save(examEntity);
        return examEntity;
    }
}
