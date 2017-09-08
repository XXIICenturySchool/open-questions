package com.db.javaschool.openquestions.dao;

import com.db.javaschool.openquestions.entity.TaskEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "tasks", path = "tasks")
public interface TaskRepository extends MongoRepository<TaskEntity, String> {
    @RestResource(path = "category")
    List<TaskEntity> findByCategory(@Param("category") String category);

    @RestResource(path = "contains")
    List<TaskEntity> findByQuestionContains(@Param("text") String target);

    @Query(fields = "{ id: 1 }")
    List<TaskEntity> findIdsByCategory(String category);

}
