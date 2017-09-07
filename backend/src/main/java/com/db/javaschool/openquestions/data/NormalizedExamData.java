package com.db.javaschool.openquestions.data;

import com.db.javaschool.openquestions.entity.TaskEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Builder
@Data
public class NormalizedExamData {
    private String globalExamId;
    private List<TaskEntity> tasks;
    private String name;
    private Map<String, Integer> examContainer;
}
