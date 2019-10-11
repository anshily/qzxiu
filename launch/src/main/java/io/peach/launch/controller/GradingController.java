package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.dto.ChangeGradingDTO;
import io.peach.launch.model.Grading;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.service.GradingService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import io.peach.launch.service.ShopMessageService;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

/**
* Created by anshi on 2019/09/11.
*/
@RestController
@RequestMapping("/grading")
public class GradingController {
    @Resource
    private GradingService gradingService;
    @Resource
    private ShopMessageService shopMessageService;

    @PostMapping("/add")
    public Result add(@RequestBody Grading grading) {
        gradingService.save(grading);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        gradingService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody Grading grading) {
        gradingService.update(grading);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        Grading grading = gradingService.findById(id);
        return ResultGenerator.successResult(grading);
    }

    @GetMapping("/list")
    public Result list(PageBean<Grading> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<Grading> list = gradingService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody Grading grading) {
        PageBean<Grading> page = new PageBean<Grading>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(Grading.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<Grading> list = gradingService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }
    @Transactional(propagation = Propagation.REQUIRED)
    @GetMapping("/changeGrading")
    public Result changeGrading(@RequestBody ChangeGradingDTO changeGradingDTO) {
        gradingService.changeGrading(changeGradingDTO);
        return ResultGenerator.successResult();
    }

    @GetMapping("/getShopListAbandonMainShop")
    public Result getShopListAbandonMainShop() {
        Condition condition = new Condition(Grading.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("id!=1");
        List<ShopMessage> list = shopMessageService.findByCondition(condition);
        return ResultGenerator.successResult(list);
    }

    @GetMapping("/getFShopListAbandonSomeShop")
    public Result getFShopListAbandonSomeShop(){
        Condition condition = new Condition(Grading.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("id!=1");
        List<ShopMessage> list = shopMessageService.findByCondition(condition);
        return ResultGenerator.successResult(list);
    }
    @GetMapping("/getTargetShopList")
    public Result getTargetShopList(@RequestParam Integer shopid,@RequestParam String type){
        Condition condition = new Condition(Grading.class);
        /*先根据店铺id和类别查询出当前店铺的上级店铺*/
        Integer Fshopid=gradingService.getFshop(shopid, type);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("id!="+shopid);
        criteria.andCondition("id!="+Fshopid);
        List<ShopMessage> list = shopMessageService.findByCondition(condition);
        return ResultGenerator.successResult(list);
    }


}
