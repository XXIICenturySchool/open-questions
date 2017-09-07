package com.db.javaschool.openquestions.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Map;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamConfiguration {
    private String name;
    private String teacherId;
    private List<String> ids;
    private Map<String, Integer> examContainer;
}
