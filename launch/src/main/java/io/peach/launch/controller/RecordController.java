package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.model.Record;
import io.peach.launch.service.RecordService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by anshi on 2019/09/23.
*/
@RestController
@RequestMapping("/record")
public class RecordController {
    @Resource
    private RecordService recordService;

    @PostMapping("/add")
    public Result add(@RequestBody Record record) {
        recordService.save(record);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        recordService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody Record record) {
        recordService.update(record);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Record record = recordService.findById(id);
        return ResultGenerator.successResult(record);
    }

    @GetMapping("/list")
    public Result list(PageBean<Record> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<Record> list = recordService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody Record record) {
        PageBean<Record> page = new PageBean<Record>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(Record.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<Record> list = recordService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @GetMapping("/getRecordByShopid")
    public Result getRecordByShopid(@RequestParam Integer shopid) {
        Condition condition = new Condition(Record.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("shopid=",shopid);
        List<Record> list = recordService.findByCondition(condition);
        return ResultGenerator.successResult(list);
    }
    @GetMapping("/getRecordList")
    public Result getRecordList(PageBean<Record> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        Condition condition = new Condition(Record.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("order by createtime desc");
        List<Record> list = recordService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

}
