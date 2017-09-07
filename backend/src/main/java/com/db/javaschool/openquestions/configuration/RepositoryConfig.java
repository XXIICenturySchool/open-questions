package com.db.javaschool.openquestions.configuration;

import com.db.javaschool.openquestions.entity.ExamEntity;
import com.db.javaschool.openquestions.entity.TaskEntity;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(TaskEntity.class);
        config.exposeIdsFor(ExamEntity.class);
    }
}
