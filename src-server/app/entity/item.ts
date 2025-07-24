import {Brand} from "./brand";
import {Itemstatus} from "./itemstatus";
import {Unittype} from "./unittype";
import {Subcategory} from "./subcategory";

export class Item {

  public id !: number;
  public code !: string;
  public name !: string;
  public sprice !: number;
  public pprice !: number;
  public photo !: string;
  public quantity !: number;
  public rop !: number;
  public dointroduced !: string;
  public itemstatus !: Itemstatus;
  public unittype !: Unittype;
  public subcategory !: Subcategory;
  public brand !: Brand;

  constructor(id: number, name: string,code:string, sprice: number, pprice: number, photo: string, quantity: number, rop: number, dointroduced: string, itemstatus: Itemstatus, unittype: Unittype, subcategory: Subcategory, brand: Brand) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.sprice = sprice;
    this.pprice = pprice;
    this.photo = photo;
    this.quantity = quantity;
    this.rop = rop;
    this.dointroduced = dointroduced;
    this.itemstatus = itemstatus;
    this.unittype = unittype;
    this.subcategory = subcategory;
    this.brand = brand;
  }

}
