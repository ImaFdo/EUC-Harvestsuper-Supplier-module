package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ItemDao;
import lk.earth.earthuniversity.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/items")
public class ItemController {
    @Autowired private ItemDao itemDao;
    private ItemDao itemdao;

    @GetMapping(produces = "application/json")
    public List<Item> get (@RequestParam HashMap<String,String> params){

        List<Item> items = this.itemDao.findAll();

        if(params.isEmpty()) return items;

        String name = params.get("name");
        String code = params.get("code");
        String itemstatusid = params.get("itemstatusid");

        Stream<Item> iStream = items.stream();

        if (name!=null) iStream = iStream.filter(i->i.getName().contains(name));
        if (code!=null) iStream = iStream.filter(i->i.getCode().equals(code));
        if (itemstatusid!=null) iStream = iStream.filter(i->i.getItemstatus().getId()==Integer.parseInt(itemstatusid));
        
        return iStream.collect(Collectors.toList());
    }

    @GetMapping(path ="/list",produces = "application/json")
    public List<Item> get() {

        List<Item> items = this.itemDao.findAllNameId();

        items = items.stream().map(
                    item -> {
                    Item i = new Item(item.getId(), item.getName());
                    return  i;
                }
        ).collect(Collectors.toList());

        return items;
        
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> add(@RequestBody Item item){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(itemDao.findByCode(item.getCode())!=null)
            errors = errors+"<br> Existing Code";
        if(itemDao.findByName(item.getName())!=null)
            errors = errors+"<br> Existing Name";

        if(errors=="")
            itemDao.save(item);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(item.getId()));
        responce.put("url","/items/"+item.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> update(@RequestBody Item item){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Item itm = itemDao.findByCode(item.getCode());

        if(itm!=null && item.getId()!=itm.getId())
            errors = errors+"<br> Existing Code";

        Item itm1 = itemDao.findByName(item.getName());

        if(itm!=null && item.getId()!=itm.getId())
            errors = errors+"<br> Existing Name";
        
        if(errors=="") itemDao.save(item);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(item.getId()));
        responce.put("url","/items/"+item.getId());
        responce.put("errors",errors);

        return responce;
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){
        
        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Item itm = itemDao.findByMyId(id);

        if(itm==null)
            errors = errors+"<br> Item Does Not Existed";

        if(errors.isEmpty()) itemDao.delete(itm);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/items/"+id);
        responce.put("errors",errors);

        return responce;
    }
    
}
