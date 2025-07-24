package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.BrandDao;
import lk.earth.earthuniversity.entity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/brands")
public class BrandController {

    @Autowired
    private BrandDao branddao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Brand> get() {

        List<Brand> brands = this.branddao.findAll();

        brands = brands.stream().map(
                brand -> { Brand d = new Brand();
                    d.setId(brand.getId());
                    d.setName(brand.getName());
                    return d; }
        ).collect(Collectors.toList());

        return brands;

    }

}


