package com.db.javaschool.openquestions.controller;

import com.db.javaschool.openquestions.data.ExamConfiguration;
import com.db.javaschool.openquestions.data.ExamData;
import com.db.javaschool.openquestions.data.NormalizedExamData;
import com.db.javaschool.openquestions.entity.ExamEntity;
import com.db.javaschool.openquestions.service.ExamServiceImpl;
import com.db.javaschool.openquestions.service.NormalizeExamServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class ExamController {
    private ExamServiceImpl examService;
    private NormalizeExamServiceImpl normalizeExamService;

    @GetMapping(path = "/api/getExam")
    public ExamData getExam(@RequestParam("id") String id, @RequestParam("teacher") String teacherId) {
        return examService.get(id, teacherId);
    }

    @PostMapping(path = "/api/createExam")
    public ExamEntity createExam(@RequestBody ExamConfiguration configuration) {
        return examService.create(configuration);
    }

    @GetMapping(path = "/api/getNormalizedExam/{id}")
    public NormalizedExamData getNormalizedExam(@PathVariable("id") String globalExamId) {
        return normalizeExamService.get(globalExamId);
    }
}
