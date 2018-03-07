package com.activiti;

import com.mayland.rbac_api.util.config.ProjectConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.core.annotation.Order;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

/**
 * Created by Administrator on 2018/3/2
 */
@Slf4j
@Order(1)
@SpringBootApplication(scanBasePackages = {"**/application", "**/controller", "**/service", "**/handler", "**/dao", "**/tree"})
public class ActivitiApiMain extends org.springframework.boot.web.support.SpringBootServletInitializer{
    public static void main(String[] args) throws Exception {
        SpringApplication.run(ActivitiApiMain.class, args);
        log.debug(ProjectConfig.getInstance().getRootUrl());
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        super.onStartup(servletContext);
        log.debug("---------------------" + this.getClass().getName() + "-----------------------");
    }
}
