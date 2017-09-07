package com.db.javaschool.openquestions.controller;

public class Main {
    public static void main(String[] args) {
        String teacher = "asd";
        String examUrl = "urlsasd";
        String name = "asdasda";
        String json = "{\"teacherId\":\""+teacher+
                "\",\"url\":\""+ examUrl + "\",\"serviceName\":\""+name+"\"}";
        System.out.println("json = " + json);
    }
}
