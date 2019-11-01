package com.nblanh.litemall.db.dao;

import com.nblanh.litemall.db.domain.LitemallOrder;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

public interface OrderMapper {
    int updateWithOptimisticLocker(@Param("lastUpdateTime") LocalDateTime lastUpdateTime, @Param("order") LitemallOrder order);
}