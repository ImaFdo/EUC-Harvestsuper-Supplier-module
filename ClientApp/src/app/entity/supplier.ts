
import {Suppliertype} from "./suppliertype";
import {Supplierstatus} from "./supplierstatus";
import {Employee} from "./employee";
import {Supply} from "./supply";

export class Supplier {
  constructor(id: number, name: string, code: string, mobile: string, doregistered: string, address: string, email: string, description: string, supplierstatus: Supplierstatus, suppliertype: Suppliertype, supplies: Array<Supply>, employee: Employee) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.mobile = mobile;
    this.doregistered = doregistered;
    this.address = address;
    this.email = email;
    this.description = description;
    this.supplierstatus = supplierstatus;
    this.suppliertype = suppliertype;
    this.supplies = supplies;
    this.employee = employee;
  }

  public id !: number;
  public name !: string;
  public code !: string;
  public mobile !: string;
  public doregistered !: string;
  public address !: string;
  public email !: string;
  public description !: string;
  public supplierstatus !: Supplierstatus;
  public suppliertype !: Suppliertype ;
  public supplies!:Array<Supply>;
  public employee!:Employee;


}
