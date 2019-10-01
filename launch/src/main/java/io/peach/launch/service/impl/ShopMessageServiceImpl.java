package io.peach.launch.service.impl;

import io.peach.launch.base.core.ServiceException;
import io.peach.launch.dao.ShopMessageMapper;
import io.peach.launch.dto.CashOutDTO;
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
    public void balanceMoney(int shopid, int recommendid, int positionid,BigDecimal money) {
        /*先查出当前店铺的金额*//*
        判断传进来的Bigdecimal是否为0
        如果为0表示添加店铺时候算酬金
        如果不为0表示确认订单时候算酬金*/
        BigDecimal b=new BigDecimal(0);
        if(money.compareTo(b)==0){
            b=qzxShopMessageMapper.getShopMoney(shopid);
        }else{
            b=money;
        }
        BigDecimal profit=new BigDecimal(0);
        BigDecimal cashin=new BigDecimal(0);
        /*再查询出不同金额对应的比例
        * List<0>  表示人员一级推荐
        * List<1>  表示人员二级推荐
        * List<2> 表示地区一级推荐
        * List<3> 表示地区二级推荐*/
        List<Map<String,BigDecimal>> map=qzxShopMessageMapper.getPoint();
        /*开始算钱*/
        /*先判断一级推荐人id是否为1  主店的id设置为1*/
        if(recommendid!=1){
            /*当前为一级推荐人 修改推荐人的佣金以及未体现的佣金数额*/
            /*先取出当前推荐人的佣金以及未体现的佣金*/
            ShopMessage s=qzxShopMessageMapper.getShopMessageByid(recommendid);
             profit=s.getProfit().add(b.multiply(map.get(0).get("percentage")));
             cashin=s.getCashin().add(b.multiply(map.get(0).get("percentage")));
            qzxShopMessageMapper.updateShopMoney(recommendid,profit,cashin);
              /*记录表中插入一条记录*/
            Record r=new Record();
            r.setType("佣金消息");
            r.setMoney(b.multiply(map.get(0).get("percentage")));
            r.setShopid(recommendid);
            r.setSourceid(shopid);
            qzxShopMessageMapper.insertRecord(r);
        }
        if(positionid!=1){
             /*当前为一级地区推荐 修改推荐人的佣金以及未体现的佣金数额*/
            /*先取出当前推荐人的佣金以及未体现的佣金*/
            ShopMessage s=qzxShopMessageMapper.getShopMessageByid(positionid);
             profit=s.getProfit().add(b.multiply(map.get(2).get("percentage")));
             cashin=s.getCashin().add(b.multiply(map.get(2).get("percentage")));
            qzxShopMessageMapper.updateShopMoney(positionid,profit,cashin);
              /*记录表中插入一条记录*/
            Record r=new Record();
            r.setType("佣金消息");
            r.setMoney(b.multiply(map.get(2).get("percentage")));
            r.setShopid(positionid);
            r.setSourceid(shopid);
            qzxShopMessageMapper.insertRecord(r);
        }

        /*查询出一级人员推荐的二级人员推荐的id*/
        /*先判断一级推荐人的id是否为1  如果是就不需要查询二级推荐了*/
        if(recommendid!=1){
            ShopMessage shopRR=qzxShopMessageMapper.getTwoGradingPerson(recommendid);
        /*先判断查询出的店铺不是总店  总店id为1*/
            if(shopRR.getId()!=1){
            /*取出佣金与未提现的佣金  算完后存入数据库*/
                profit=shopRR.getProfit().add(b.multiply(map.get(1).get("percentage")));
                cashin=shopRR.getCashin().add(b.multiply(map.get(1).get("percentage")));
                qzxShopMessageMapper.updateShopMoney(shopRR.getId(),profit,cashin);
            /*记录表中插入一条记录*/
                Record r=new Record();
                r.setType("佣金消息");
                r.setMoney(b.multiply(map.get(1).get("percentage")));
                r.setShopid(shopRR.getId());
                r.setSourceid(shopid);
                qzxShopMessageMapper.insertRecord(r);
            }

            /*查询出一级人员推荐的二级地区推荐的id*/
            ShopMessage shopRP=qzxShopMessageMapper.getTwoGradingPosition(recommendid);
        /*先判断查询出的店铺不是总店  总店id为1*/
            if(shopRP.getId()!=1){
            /*取出佣金与未提现的佣金  算完后存入数据库*/
                profit=shopRP.getProfit().add(b.multiply(map.get(3).get("percentage")));
                cashin=shopRP.getCashin().add(b.multiply(map.get(3).get("percentage")));
                qzxShopMessageMapper.updateShopMoney(shopRP.getId(),profit,cashin);
              /*记录表中插入一条记录*/
                Record r=new Record();
                r.setType("佣金消息");
                r.setMoney(b.multiply(map.get(3).get("percentage")));
                r.setShopid(shopRP.getId());
                r.setSourceid(shopid);
                qzxShopMessageMapper.insertRecord(r);
            }
        }




        if(positionid!=1){
            /*查询出一级地区推荐的二级人员推荐的id*/
            ShopMessage shopPR=qzxShopMessageMapper.getTwoGradingPerson(positionid);
        /*先判断查询出的店铺不是总店  总店id为1*/
            if(shopPR.getId()!=1){
            /*取出佣金与未提现的佣金  算完后存入数据库*/
                profit=shopPR.getProfit().add(b.multiply(map.get(1).get("percentage")));
                cashin=shopPR.getCashin().add(b.multiply(map.get(1).get("percentage")));
                qzxShopMessageMapper.updateShopMoney(shopPR.getId(),profit,cashin);
              /*记录表中插入一条记录*/
                Record r=new Record();
                r.setType("佣金消息");
                r.setMoney(b.multiply(map.get(1).get("percentage")));
                r.setShopid(shopPR.getId());
                r.setSourceid(shopid);
                qzxShopMessageMapper.insertRecord(r);
            }

        /*查询出一级地区推荐的二级地区推荐的id*/
            ShopMessage shopPP=qzxShopMessageMapper.getTwoGradingPerson(positionid);
        /*先判断查询出的店铺不是总店  总店id为1*/
            if(shopPP.getId()!=1){
            /*取出佣金与未提现的佣金  算完后存入数据库*/
                profit=shopPP.getProfit().add(b.multiply(map.get(3).get("percentage")));
                cashin=shopPP.getCashin().add(b.multiply(map.get(3).get("percentage")));
                qzxShopMessageMapper.updateShopMoney(shopPP.getId(),profit,cashin);
              /*记录表中插入一条记录*/
                Record r=new Record();
                r.setType("佣金消息");
                r.setMoney(b.multiply(map.get(3).get("percentage")));
                r.setShopid(shopPP.getId());
                r.setSourceid(shopid);
                qzxShopMessageMapper.insertRecord(r);
            }
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

    @Override
    public List<ShopMessage> getShopList() {
        List<ShopMessage> list=qzxShopMessageMapper.getShopList();
        return list;
    }

    @Override
    public ShopMessage getFShopPerson(int shopid) {
        ShopMessage shopMessage=qzxShopMessageMapper.getFShopPerson(shopid);
        return shopMessage;
    }

    @Override
    public ShopMessage getFShopPosition(int shopid) {
        ShopMessage shopMessage=qzxShopMessageMapper.getFShopPosition(shopid);
        return shopMessage;
    }

    @Override
    public List<ShopMessage> getChildShopMessage(int shopid) {
        List<ShopMessage> list=qzxShopMessageMapper.getChildShopMessage(shopid);
        return list;
    }

    @Override
    public List<ShopMessage> getGoodShopList() {
        List<ShopMessage> list=qzxShopMessageMapper.getGoodShopList();
        return list;
    }

    /*@Override
    public void getCashOut(CashOutDTO cashOutDTO) {

    }*/
}
