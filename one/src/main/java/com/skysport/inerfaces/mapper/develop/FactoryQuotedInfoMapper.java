package com.skysport.inerfaces.mapper.develop;

import com.skysport.core.mapper.CommonDao;
import com.skysport.inerfaces.bean.develop.FactoryQuoteInfo;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 说明:
 * Created by zhangjh on 2015/10/8.
 */
@Repository("factoryQuotedInfoMapper")
public interface FactoryQuotedInfoMapper extends CommonDao<FactoryQuoteInfo> {

    List<FactoryQuoteInfo> queryFactoryQuoteInfoList(String bomId);

    List<String> selectAlId(String bomId);

    void deleteByIds(List<String> allPackagingIds);
}
