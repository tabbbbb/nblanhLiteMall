package com.nblanh.litemall.wx.service;

import com.nblanh.litemall.db.domain.LitemallUser;
import com.nblanh.litemall.db.domain.LitemallViplevel;
import com.nblanh.litemall.db.domain.LitemallViplevelExample;
import com.nblanh.litemall.db.service.LitemallUserService;
import com.nblanh.litemall.wx.dao.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class UserInfoService {
    @Autowired
    private LitemallUserService userService;


    public UserInfo getInfo(Integer userId) {
        LitemallUser user = userService.findById(userId);
        Assert.state(user != null, "用户不存在");
        UserInfo userInfo = new UserInfo();
        userInfo.setNickName(user.getNickname());
        userInfo.setAvatarUrl(user.getAvatar());
        return userInfo;
    }


    //确认收货后增加积分
    public void  addScore(int userId,int number){
        LitemallUser lu = userService.findById(userId);
        int jifen = Integer.parseInt(lu.getVipIndex())+number;
        LitemallUser luser = new LitemallUser();
        luser.setId(userId);
        luser.setVipIndex(jifen+"");

        userService.updateById(luser);

    }


}
