package com.db.javaschool.openquestions.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class ExamData {
    private String teacherId;
    private List<TaskData> tasks;
}
