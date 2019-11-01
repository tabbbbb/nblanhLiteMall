package com.nblanh.litemall.admin.web;

import com.nblanh.litemall.admin.annotation.RequiresPermissionsDesc;
import com.github.pagehelper.PageInfo;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import com.nblanh.litemall.core.util.ResponseUtil;
import com.nblanh.litemall.core.validator.Order;
import com.nblanh.litemall.core.validator.Sort;
import com.nblanh.litemall.db.domain.LitemallLog;
import com.nblanh.litemall.db.service.LitemallLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/log")
@Validated
public class AdminLogController {
    private final Log logger = LogFactory.getLog(AdminLogController.class);

    @Autowired
    private LitemallLogService logService;

    @RequiresPermissions("admin:log:list")
    @RequiresPermissionsDesc(menu={"系统管理" , "操作日志"}, button="查询")
    @GetMapping("/list")
    public Object list(String name,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @Sort @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallLog> logList = logService.querySelective(name, page, limit, sort, order);
        long total = PageInfo.of(logList).getTotal();
        Map<String, Object> data = new HashMap<>();
        data.put("total", total);
        data.put("items", logList);

        return ResponseUtil.ok(data);
    }
}
