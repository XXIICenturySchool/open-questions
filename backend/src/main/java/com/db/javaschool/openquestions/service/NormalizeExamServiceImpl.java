package com.db.javaschool.openquestions.service;

import com.db.javaschool.openquestions.data.ExamConfiguration;
import com.db.javaschool.openquestions.dao.ExamRepository;
import com.db.javaschool.openquestions.dao.TaskRepository;
import com.db.javaschool.openquestions.data.NormalizedExamData;
import com.db.javaschool.openquestions.entity.ExamEntity;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Builder
@Data
@Service
public class NormalizeExamServiceImpl implements NormalizeExamService {
    private TaskRepository taskRepository;
    private ExamRepository examRepository;
    private ExamServiceImpl examService;

    @Override
    public NormalizedExamData get(String globalExamId) {
        ExamEntity exam = examRepository.findByGlobalExamId(globalExamId);
        ExamConfiguration configuration = exam.getConfiguration();
        return NormalizedExamData.builder()
                .globalExamId(globalExamId)
                .tasks(Optional.of(configuration.getIds()).orElseGet(ArrayList::new).stream()
                        .map(taskId -> taskRepository.findOne(taskId))
                        .collect(Collectors.toList()))
                .name(configuration.getName())
                .examContainer(configuration.getExamContainer())
                .build();
    }
}
