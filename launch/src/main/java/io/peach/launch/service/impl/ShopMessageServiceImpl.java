package io.peach.launch.service.impl;

import io.peach.launch.dao.ShopMessageMapper;
import io.peach.launch.model.Record;
import io.peach.launch.model.ShopMessage;
import io.peach.launch.service.ShopMessageService;
import io.peach.launch.base.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by anshi on 2019/09/11.
 */
@Service
@Transactional
public class ShopMessageServiceImpl extends AbstractService<ShopMessage> implements ShopMessageService {
    @Resource
    private ShopMessageMapper qzxShopMessageMapper;

    @Override
    public void addGrading(int shopid, int recommendid, int positionid) {
        qzxShopMessageMapper.addGradingRecommend(shopid, recommendid);
        qzxShopMessageMapper.addGradingPosition(shopid, positionid);
    }

    @Override
    public void balanceMoney(int shopid, int recommendid, int positionid) {
        /*先查出当前店铺的金额*/
        BigDecimal b=qzxShopMessageMapper.getShopMoney(shopid);
        BigDecimal profit=new BigDecimal(0);
        BigDecimal cashin=new BigDecimal(0);
        /*再查询出不同金额对应的比例
        * person1  表示人员一级推荐
        * person2  表示人员二级推荐
        * position1 表示地区一级推荐
        * position2 表示地区二级推荐*/
        Map<String,BigDecimal> map=qzxShopMessageMapper.getPoint();
        /*开始算钱*/
        /*先判断一级推荐人id是否为1  主店的id设置为1*/
        if(recommendid!=1){
            /*当前为一级推荐人 修改推荐人的佣金以及未体现的佣金数额*/
            /*先取出当前推荐人的佣金以及未体现的佣金*/
            ShopMessage s=qzxShopMessageMapper.getShopMessageByid(recommendid);
             profit=s.getProfit().add(b.multiply(map.get("person1")));
             cashin=s.getCashin().add(b.multiply(map.get("person1")));
            qzxShopMessageMapper.updateShopMoney(recommendid,profit,cashin);
              /*记录表中插入一条记录*/
            Record r=new Record();
            r.setType("佣金消息");
            r.setMoney(b.multiply(map.get("person1")));
            r.setShopid(recommendid);
            r.setSourceid(shopid);
            qzxShopMessageMapper.insertRecord(r);
        }
        if(positionid!=1){
             /*当前为一级地区推荐 修改推荐人的佣金以及未体现的佣金数额*/
            /*先取出当前推荐人的佣金以及未体现的佣金*/
            ShopMessage s=qzxShopMessageMapper.getShopMessageByid(positionid);
             profit=s.getProfit().add(b.multiply(map.get("position1")));
             cashin=s.getCashin().add(b.multiply(map.get("position1")));
            qzxShopMessageMapper.updateShopMoney(positionid,profit,cashin);
              /*记录表中插入一条记录*/
            Record r=new Record();
            r.setType("佣金消息");
            r.setMoney(b.multiply(map.get("position1")));
            r.setShopid(positionid);
            r.setSourceid(shopid);
            qzxShopMessageMapper.insertRecord(r);
        }

        /*查询出一级人员推荐的二级人员推荐的id*/
        ShopMessage shopRR=qzxShopMessageMapper.getTwoGradingPerson(recommendid);
        /*先判断查询出的店铺不是总店  总店id为1*/
        if(shopRR.getId()!=1){
            /*取出佣金与未提现的佣金  算完后存入数据库*/
             profit=shopRR.getProfit().add(b.multiply(map.get("person2")));
             cashin=shopRR.getCashin().add(b.multiply(map.get("person2")));
            qzxShopMessageMapper.updateShopMoney(shopRR.getId(),profit,cashin);
            /*记录表中插入一条记录*/
            Record r=new Record();
            r.setType("佣金消息");
            r.setMoney(b.multiply(map.get("person2")));
            r.setShopid(shopRR.getId());
            r.setSourceid(shopid);
            qzxShopMessageMapper.insertRecord(r);
        }

        /*查询出一级人员推荐的二级地区推荐的id*/
        ShopMessage shopRP=qzxShopMessageMapper.getTwoGradingPosition(recommendid);
        /*先判断查询出的店铺不是总店  总店id为1*/
        if(shopRP.getId()!=1){
            /*取出佣金与未提现的佣金  算完后存入数据库*/
             profit=shopRP.getProfit().add(b.multiply(map.get("position2")));
             cashin=shopRP.getCashin().add(b.multiply(map.get("position2")));
            qzxShopMessageMapper.updateShopMoney(shopRP.getId(),profit,cashin);
              /*记录表中插入一条记录*/
            Record r=new Record();
            r.setType("佣金消息");
            r.setMoney(b.multiply(map.get("position2")));
            r.setShopid(shopRP.getId());
            r.setSourceid(shopid);
            qzxShopMessageMapper.insertRecord(r);
        }

        /*查询出一级地区推荐的二级人员推荐的id*/
        ShopMessage shopPR=qzxShopMessageMapper.getTwoGradingPerson(positionid);
        /*先判断查询出的店铺不是总店  总店id为1*/
        if(shopPR.getId()!=1){
            /*取出佣金与未提现的佣金  算完后存入数据库*/
            profit=shopPR.getProfit().add(b.multiply(map.get("person2")));
            cashin=shopPR.getCashin().add(b.multiply(map.get("person2")));
            qzxShopMessageMapper.updateShopMoney(shopPR.getId(),profit,cashin);
              /*记录表中插入一条记录*/
            Record r=new Record();
            r.setType("佣金消息");
            r.setMoney(b.multiply(map.get("person2")));
            r.setShopid(shopPR.getId());
            r.setSourceid(shopid);
            qzxShopMessageMapper.insertRecord(r);
        }

        /*查询出一级地区推荐的二级地区推荐的id*/
        ShopMessage shopPP=qzxShopMessageMapper.getTwoGradingPerson(positionid);
        /*先判断查询出的店铺不是总店  总店id为1*/
        if(shopPP.getId()!=1){
            /*取出佣金与未提现的佣金  算完后存入数据库*/
            profit=shopPP.getProfit().add(b.multiply(map.get("position2")));
            cashin=shopPP.getCashin().add(b.multiply(map.get("position2")));
            qzxShopMessageMapper.updateShopMoney(shopPP.getId(),profit,cashin);
              /*记录表中插入一条记录*/
            Record r=new Record();
            r.setType("佣金消息");
            r.setMoney(b.multiply(map.get("position2")));
            r.setShopid(shopPP.getId());
            r.setSourceid(shopid);
            qzxShopMessageMapper.insertRecord(r);
        }
    }

    @Override
    public List<Map<String,String>> getRecommendAndPosition() {
        /*查询出所有已经存在的店铺信息*/
        List<Map<String,String>> list=qzxShopMessageMapper.getRecommendAndPosition();
        List<Map<String,String>> list1=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            if(null==list.get(i)){
                continue;
            }
            Map<String,String> map=new HashMap<>();
            map.put("id",list.get(i).get("id"));
            map.put(("shopname"),list.get(i).get("username")+" "+list.get(i).get("shopname"));
            list1.add(map);
        }
        return list1;
    }
}
