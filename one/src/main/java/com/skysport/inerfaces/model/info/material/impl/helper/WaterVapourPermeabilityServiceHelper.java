package com.skysport.inerfaces.model.info.material.impl.helper;

import com.skysport.core.bean.system.SelectItem2;
import com.skysport.core.bean.SpringContextHolder;
import com.skysport.core.cache.SystemBaseInfoCachedMap;
import com.skysport.inerfaces.model.info.material.impl.WaterVapourPermeabilityServiceImpl;

import java.util.List;

/**
 * 类说明:
 * Created by zhangjh on 2015/7/7.
 */
public enum WaterVapourPermeabilityServiceHelper {
    SINGLETONE;

    public void refreshSelect() {
        WaterVapourPermeabilityServiceImpl waterVapourPermeabilityService = SpringContextHolder.getBean("waterVapourPermeabilityService");
        List<SelectItem2> wvpItems = waterVapourPermeabilityService.querySelectList(null);
        SystemBaseInfoCachedMap.SINGLETONE.pushBom("wvpItems", wvpItems);
    }
}
