package com.nblanh.litemall.db.service;

import com.nblanh.litemall.db.dao.LitemallBenefitMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class LitemallBenefitService {

    @Resource
    private LitemallBenefitMapper benefitMapper;

}
