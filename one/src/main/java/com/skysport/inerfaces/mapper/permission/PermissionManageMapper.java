package com.skysport.inerfaces.mapper.permission;

import com.skysport.core.bean.permission.ResourceRole;
import com.skysport.core.bean.permission.RoleUser;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 说明:
 * Created by zhangjh on 2015/10/29.
 */
@Repository("permissionManageMapper")
public interface PermissionManageMapper {


    void addBatchRoleUser(List<RoleUser> roleUsers);

    void delRoleInfoByUserId(String userId);

    List<RoleUser> queryRoleUsers(String userId);

    void delResourceInfoByRoleId(String roleId);

    void addBatchResourceRole(List<ResourceRole> resourceRoles);

    List<ResourceRole> queryResourceRoles(String roleId);
}
