package io.peach.launch.controller;
import io.peach.launch.base.core.Result;
import io.peach.launch.base.core.ResultGenerator;
import io.peach.launch.base.core.ServiceException;
import io.peach.launch.model.ShopType;
import io.peach.launch.service.ShopTypeService;
import io.peach.launch.base.core.PageBean;
import com.github.pagehelper.PageHelper;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
* Created by anshi on 2019/09/11.
*/
@RestController
@RequestMapping("/shop/type")
public class ShopTypeController {
    @Resource
    private ShopTypeService shopTypeService;

    @PostMapping("/add")
    public Result add(@RequestBody ShopType shopType) {
        shopTypeService.save(shopType);
        return ResultGenerator.successResult();
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody Integer id) {
        shopTypeService.deleteById(id);
        return ResultGenerator.successResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody ShopType shopType) {
        shopTypeService.update(shopType);
        return ResultGenerator.successResult();
    }

    @GetMapping("/detail")
    public Result detail(@RequestParam Integer id) {
        ShopType shopType = shopTypeService.findById(id);
        return ResultGenerator.successResult(shopType);
    }

    @GetMapping("/list")
    public Result list(PageBean<ShopType> page) {
        PageHelper.startPage(page.getPageNum(),page.getSize());
        List<ShopType> list = shopTypeService.findAll();
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @PostMapping("/custom/list")
    public Result customList(@RequestBody ShopType shopType) {
        PageBean<ShopType> page = new PageBean<ShopType>();
    //        PageHelper.startPage(page.getPageNum(),page.getSize());
    Condition condition = new Condition(ShopType.class);
    Example.Criteria criteria = condition.createCriteria();
    criteria.andLike("id","%1%");
    List<ShopType> list = shopTypeService.findByCondition(condition);
        page.setList(list);
        return ResultGenerator.successResult(page);
    }

    @GetMapping("/getTypeList")
    public Result getTypeList(){
        Map<String,Object> map=new HashMap<>();
        Condition condition = new Condition(ShopType.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("statu=1");
        List<ShopType> list=shopTypeService.findByCondition(condition);
        return ResultGenerator.successResult(list);
    }

    @PostMapping("/addShopType")
    public Result addShopType(@RequestBody ShopType shopType) {
        if(shopType.getTypename()!=null||!shopType.getTypename().equals("")||shopType.getAgencycost().compareTo(new BigDecimal(0))<1){
            throw new ServiceException(5006,"新增的商店类型数据不符合要求");
        }
        Condition condition = new Condition(ShopType.class);
        Example.Criteria criteria = condition.createCriteria();
        criteria.andCondition("typename="+shopType.getTypename());
        criteria.andCondition("statu=1");
        List<ShopType> list=shopTypeService.findByCondition(condition);
        if(list.size()==0){
            shopTypeService.save(shopType);
        }else{
            throw new ServiceException(5007,"商店类型名已经存在");
        }
        return ResultGenerator.successResult();
    }

    @PostMapping("/updateShopType")
    public Result updateShopType(@RequestBody ShopType shopType) {
        shopTypeService.update(shopType);
        return ResultGenerator.successResult();
    }
    @PostMapping("/shopTypeUpOrDown")
    public Result shopTypeUpOrDown(@RequestParam Integer id,@RequestParam String type) {
        shopTypeService.shopTypeUpOrDown(id,type);
        return ResultGenerator.successResult();
    }


}
