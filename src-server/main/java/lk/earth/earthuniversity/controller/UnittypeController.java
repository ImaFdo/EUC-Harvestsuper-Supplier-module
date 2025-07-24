package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.UnittypeDao;
import lk.earth.earthuniversity.entity.Unittype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/unittypes")
public class UnittypeController {

    @Autowired
    private UnittypeDao unittypedao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Unittype> get() {

        List<Unittype> unittypes = this.unittypedao.findAll();

        unittypes = unittypes.stream().map(
                unittype -> { Unittype d = new Unittype();
                    d.setId(unittype.getId());
                    d.setName(unittype.getName());
                    return d; }
        ).collect(Collectors.toList());

        return unittypes;

    }

}


