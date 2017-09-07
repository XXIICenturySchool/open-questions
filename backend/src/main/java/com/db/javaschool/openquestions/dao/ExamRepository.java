package com.db.javaschool.openquestions.dao;

import com.db.javaschool.openquestions.entity.ExamEntity;
import com.db.javaschool.openquestions.entity.TaskEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "exams", path = "exams")
public interface ExamRepository extends MongoRepository<ExamEntity, String> {
    ExamEntity findByGlobalExamId(String globalExamId);
}
