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
    public void balanceMoney(int shopid, int recommendid, int positionid) {
        BigDecimal profit=new BigDecimal(0);
        BigDecimal cashin=new BigDecimal(0);
       /*查询当前店铺的加盟费是多少*/
        BigDecimal shopMoney=qzxShopMessageMapper.getShopMoney(shopid);
        /*查询推荐人的店铺信息*/
        ShopMessage Fshop=qzxShopMessageMapper.getShopMessageByid(recommendid);
        ShopMessage Newshop=qzxShopMessageMapper.getShopMessageByid(shopid);
        /*第一种  推荐人是代理的情况 不可以是总店*/
        if(Fshop.getId()==1){
            /*如果父级是总店  就不用算钱了*/
            return ;
        }
        if(Fshop.getShoptype_id()!=1){
            /*如果当前店铺是代理，那么将当前店铺加盟费的20%作为上级代理的提成*/
            if(Newshop.getShoptype_id()!=1){
                profit=Fshop.getProfit().add(shopMoney.multiply(new BigDecimal(0.2)));
                cashin=Fshop.getCashin().add(shopMoney.multiply(new BigDecimal(0.2)));
                qzxShopMessageMapper.updateShopMoney(recommendid,profit,cashin);
              /*记录表中插入一条记录*/
                Record r=new Record();
                r.setType("佣金消息");
                r.setMoney(shopMoney.multiply(new BigDecimal(0.2)));
                r.setShopid(recommendid);
                r.setSourceid(shopid);
                qzxShopMessageMapper.insertRecord(r);
            }else{
                /*如果当前店铺是联盟店 那么直接给推荐人店铺7000的提成*/
                profit=Fshop.getProfit().add(new BigDecimal(7000));
                cashin=Fshop.getCashin().add(new BigDecimal(7000));
                qzxShopMessageMapper.updateShopMoney(recommendid,profit,cashin);
              /*记录表中插入一条记录*/
                Record r=new Record();
                r.setType("佣金消息");
                r.setMoney(shopMoney.multiply(new BigDecimal(7000)));
                r.setShopid(recommendid);
                r.setSourceid(shopid);
                qzxShopMessageMapper.insertRecord(r);
            }
        }else{
            /*如果推荐人店铺为普通店铺 给当前店铺提5000的*/
            profit=Fshop.getProfit().add(new BigDecimal(5000));
            cashin=Fshop.getCashin().add(new BigDecimal(5000));
            qzxShopMessageMapper.updateShopMoney(recommendid,profit,cashin);
              /*记录表中插入一条记录*/
            Record r=new Record();
            r.setType("佣金消息");
            r.setMoney(shopMoney.multiply(new BigDecimal(5000)));
            r.setShopid(recommendid);
            r.setSourceid(shopid);
            qzxShopMessageMapper.insertRecord(r);

            /*判断推荐人店铺的上级店铺类型*/
            /*先查询出推荐人店铺的上级店铺*/
            ShopMessage FFshop=qzxShopMessageMapper.getFShopPerson(recommendid);
            if(FFshop.getId()==1){
                return;
            }
            /*当店铺为联盟店  就没有提成了  如果为代理 那么分的3500的提成*/
            if(FFshop.getShoptype_id()!=1){
                profit=FFshop.getProfit().add(new BigDecimal(3500));
                cashin=FFshop.getCashin().add(new BigDecimal(3500));
                qzxShopMessageMapper.updateShopMoney(recommendid,profit,cashin);
              /*记录表中插入一条记录*/
                Record r1=new Record();
                r1.setType("佣金消息");
                r1.setMoney(shopMoney.multiply(new BigDecimal(3500)));
                r1.setShopid(recommendid);
                r1.setSourceid(shopid);
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
    public ShopMessage getShopMessageByid(int shopid) {
        ShopMessage shopMessage=qzxShopMessageMapper.getShopMessageByid(shopid);
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
