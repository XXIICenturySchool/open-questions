package com.db.javaschool.openquestions.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TaskEntity {
    @Id
    private String id;
    private String question;
    private String category;
    private String pictureUrl;
    private List<String> answer;
    @Singular
    private List<String> options;
}
