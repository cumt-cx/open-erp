package com.skysport.inerfaces.mapper.info;

import com.skysport.core.mapper.CommonDao;
import com.skysport.inerfaces.bean.develop.AccessoriesInfo;
import com.skysport.inerfaces.bean.develop.MaterialSpInfo;
import com.skysport.inerfaces.bean.develop.MaterialUnitDosage;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 说明:
 * Created by zhangjh on 2015/9/22.
 */
@Repository("accessoriesManageMapper")
public interface AccessoriesManageMapper extends CommonDao<AccessoriesInfo> {

    void updateDosage(MaterialUnitDosage materialUnitDosage);

    void updateSp(MaterialSpInfo materialSpInfo);

    void addDosage(MaterialUnitDosage materialUnitDosage);

    void addSp(MaterialSpInfo materialSpInfo);

    List<String> selectAllAccessoriesId(String bomId);

    void deleteAccessoriesByIds(List<String> allAccessoriesIds);

    List<AccessoriesInfo> queryAccessoriesList(String bomId);

    List<AccessoriesInfo> queryAllAccessoriesByBomId(String bomId);
}
