package com.db.javaschool.openquestions.data;


import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskData {
    private String question;
    private String pictureUrl;
    private List<String> options;
    private List<String> answer;
}
