package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.CategoryDao;
import lk.earth.earthuniversity.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/categories")
public class CategoryController {

    @Autowired
    private CategoryDao categorydao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Category> get() {

        List<Category> categorys = this.categorydao.findAll();

        categorys = categorys.stream().map(
                category -> { Category d = new Category();
                    d.setId(category.getId());
                    d.setName(category.getName());
                    return d; }
        ).collect(Collectors.toList());

        return categorys;

    }

}


