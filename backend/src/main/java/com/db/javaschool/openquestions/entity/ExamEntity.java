package com.db.javaschool.openquestions.entity;

import com.db.javaschool.openquestions.data.ExamConfiguration;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@Builder
public class ExamEntity {

    @Id
    private String id;
    private String globalExamId;
    private ExamConfiguration configuration;
}
