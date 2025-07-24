import {Gender} from "./gender";
import {Designation} from "./designation";
import {Empstatus} from "./empstatus";
import {Emptype} from "./emptype";

export class Employee{
  constructor(id: number, number: string, fullname: string, callingname: string, photo: string, gender: Gender, dobirth: string, nic: string, address: string, mobile: string, land: string, email: string, emptype: Emptype, designation: Designation, doassignment: Date, description: string, empstatus: Empstatus) {
    this.id = id;
    this.number = number;
    this.fullname = fullname;
    this.callingname = callingname;
    this.photo = photo;
    this.gender = gender;
    this.dobirth = dobirth;
    this.nic = nic;
    this.address = address;
    this.mobile = mobile;
    this.land = land;
    this.email = email;
    this.emptype = emptype;
    this.designation = designation;
    this.doassignment = doassignment;
    this.description = description;
    this.empstatus = empstatus;

  }

  public id!: number;
  public number!: string;
  public fullname!: string;
  public callingname!: string;
  public photo!: string;
  public gender!: Gender;
  public dobirth!: string;
  public nic!: string;
  public address!: string;
  public mobile!: string;
  public land!: string;
  public email!: string;
  public emptype!: Emptype;
  public designation!: Designation;
  public doassignment!: Date;
  public description!: string;
  public empstatus!: Empstatus;

}





