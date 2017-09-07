package com.db.javaschool.openquestions.service;

import com.db.javaschool.openquestions.data.ExamConfiguration;
import com.db.javaschool.openquestions.dao.ExamRepository;
import com.db.javaschool.openquestions.dao.TaskRepository;
import com.db.javaschool.openquestions.data.ExamData;
import com.db.javaschool.openquestions.data.TaskData;
import com.db.javaschool.openquestions.entity.ExamEntity;
import com.db.javaschool.openquestions.entity.TaskEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.*;

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
    public ExamData get(String globalExamId, String teacherId) {
        List<TaskEntity> tasks = getTaskEntities(globalExamId);

        List<TaskData> taskData = new ArrayList<>();
        for (TaskEntity task : tasks) {
            taskData.add(TaskData.builder()
                    .answer(task.getAnswer())
                    .question(task.getQuestion())
                    .options(task.getOptions())
                    .pictureUrl(task.getPictureUrl())
                    .build());
        }

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

    public List<TaskEntity> getTaskEntities(String globalExamId) {
        ExamEntity exam = this.examRepository.findByGlobalExamId((String.valueOf(globalExamId)));
        ExamConfiguration configuration = exam.getConfiguration();
        List<TaskEntity> tasks = new ArrayList<>();

        if (configuration.getIds() != null) {
            for (String id : configuration.getIds()) {
                TaskEntity task = taskRepository.findOne(id);
                if (task != null)
                    tasks.add(task);
            }
        }

        if (configuration.getExamContainer() != null) {
            Random random = new Random();
            Map<String, Integer> map = new HashMap<>();
            configuration.getExamContainer().forEach(((s, integer) -> {
                List<TaskEntity> category = taskRepository.findByCategory(s);
                for (int i = 0; i < integer; i++) {
                    TaskEntity taskEntity = category.get(random.nextInt(category.size()));
                    if (category.size()<integer) try {
                        throw new Exception("cannot create exam from this category because there is no enough questions for your exam configuration");
                    } catch (Exception e) {
                        e.printStackTrace();
                    } finally {
                        break;
                    }
                    while (!tasks.contains(taskEntity)) {
                        taskEntity = category.get(random.nextInt(category.size()));
                            break;
                    }
                    tasks.add(taskEntity);
                }
            }));
        }
        return tasks;
    }

    @Override
    public ExamEntity create(ExamConfiguration configuration) {
        ExamEntity examEntity = ExamEntity.builder()
                .configuration(configuration)
                .build();
        examRepository.insert(examEntity);
        String returnedGlobalExamId = outerService.register(examEntity.getId(), configuration.getTeacherId());
        examEntity = ExamEntity.builder()
                .configuration(examEntity.getConfiguration())
                .id(examEntity.getId())
                .globalExamId(returnedGlobalExamId)
                .build();
        examRepository.save(examEntity);
        return examEntity;
    }
}
