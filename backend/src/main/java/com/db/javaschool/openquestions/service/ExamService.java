package com.db.javaschool.openquestions.service;

import com.db.javaschool.openquestions.data.ExamConfiguration;
import com.db.javaschool.openquestions.data.ExamData;
import com.db.javaschool.openquestions.entity.ExamEntity;

public interface ExamService {
    ExamData get(String id, String teacherId);
    ExamData getByGlobalExamId(String id, String teacherId);
    ExamEntity create(ExamConfiguration configuration);
}
