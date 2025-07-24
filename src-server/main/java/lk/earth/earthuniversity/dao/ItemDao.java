package lk.earth.earthuniversity.dao;


import lk.earth.earthuniversity.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemDao extends JpaRepository<Item,Integer> {

    
    
    @Query("SELECT NEW Item (i.id, i.name) FROM Item i")
    List<Item> findAllNameId();

    Item findByCode(String code);

    Item findByName(String name);

    @Query("select i from Item i where i.id = :id")
    Item findByMyId(@Param("id") Integer id);


}

