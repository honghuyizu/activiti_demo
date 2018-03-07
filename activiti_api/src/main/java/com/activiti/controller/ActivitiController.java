package com.activiti.controller;

import com.mayland.base_api.util.ApiUtil;
import com.mayland.rbac_api.util.RbacProjectUtil;
import lombok.extern.slf4j.Slf4j;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018/3/6 0006.
 */
@Slf4j
@Controller
@RequestMapping("/activiti/demo/")
public class ActivitiController {

    /**
     * 请求参数预处理
     *
     * @param request 请求对象
     * @param model   数据模型
     */
    @ModelAttribute
    public void preHandler(HttpServletRequest request, Model model) {
        RbacProjectUtil.preHandler(request, model);
    }


    /**
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("deploy")
    public Map<String, Object> deploy(String xml,HttpServletRequest request) {
        Map<String, Object> resultValue = new HashMap<>();
        try{
            ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
            Map<String, Object> data = new HashMap<String,Object>();
            processEngine.getRepositoryService().createDeployment()
                    .addInputStream("process.bpmn20.xml", new ByteArrayInputStream(xml.getBytes("UTF-8")))
                    .deploy();
            ApiUtil.successWithData(resultValue, data);
        }catch (Exception e){
            resultValue = ApiUtil.fail("系统异常,稍后再试");
            log.error(e.getMessage(), e);
        }
        return resultValue;
    }
}
