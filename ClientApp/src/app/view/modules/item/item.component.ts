import {Component, ViewChild} from '@angular/core';
import {Employee} from "../../../entity/employee";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Item} from "../../../entity/item";
import {UiAssist} from "../../../util/ui/ui.assist";
import {ItemService} from "../../../service/itemservice";
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ItemstatusService} from "../../../service/itemstatusservice";
import {Itemstatus} from "../../../entity/itemstatus";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {Brand} from "../../../entity/brand";
import {Category} from "../../../entity/category";
import {Subcategory} from "../../../entity/subcategory";
import {Unittype} from "../../../entity/unittype";
import {BrandService} from "../../../service/brandservice";

import {UnittypeService} from "../../../service/unittypeservice";
import {SubcategoryService} from "../../../service/subcategoryservice";
import {DatePipe} from "@angular/common";
import {RegexService} from "../../../service/regexservice";
import {CategoryService} from "../../../service/categoryservice";
import {MessageComponent} from "../../../util/dialog/message/message.component";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  columns: string[] = ['code', 'name', 'sprice', 'pprice', 'status', 'modi'];
  headers: string[] = ['Code', 'Name', 'Sale Price', 'Purchase Price', 'Status', 'Modification'];
  binders: string[] = ['code', 'name', 'sprice', 'pprice', 'itemstatus.name', 'getModi()'];

  cscolumns: string[] = ['cscode', 'csname', 'cssprice', 'cspprice', 'csstatus', 'csmodi'];
  csprompts: string[] = ['Search By Code', 'Search By Name', 'Search By Sale Price', 'Search By Purchase Price', 'Search By Status', 'Search By Modification'];

  items: Array<Item> = [];
  data!: MatTableDataSource<Item>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  item!: Item;
  olditem!: Item;

  selectedrow: any;

  itemstatuses:Array<Itemstatus> = [];
  brands:Array<Brand> = [];
  categories:Array<Category> = [];
  subcategories:Array<Subcategory> = [];
  unittypes:Array<Unittype> = [];


  imageitmurl: string = 'assets/default.png'

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  regexes: any;

  uiassist: UiAssist;

  constructor(
    private is:ItemService,
    private fb:FormBuilder,
    private iss:ItemstatusService,
    private dg: MatDialog,
    private bs: BrandService,
    private cs: CategoryService,
    private sc: SubcategoryService,
    private us: UnittypeService,
    private dp: DatePipe,
    private rs: RegexService,


  ) {

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "cscode": new FormControl(),
      "csname": new FormControl(),
      "cssprice": new FormControl(),
      "cspprice": new FormControl(),
      "csstatus": new FormControl(),
      "csmodi": new FormControl(),
    });

    this.ssearch = this.fb.group({
      "sscode": new FormControl(),
      "ssname": new FormControl(),
      "ssstatus": new FormControl(),
    });

    this.form = this.fb.group({
      "category": new FormControl('', Validators.required),
      "subcategory": new FormControl('', Validators.required),
      "brand": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "code": new FormControl('', Validators.required),
      "photo": new FormControl('', Validators.required),
      "sprice": new FormControl('', Validators.required),
      "pprice": new FormControl('', Validators.required),
      "quantity": new FormControl('', Validators.required),
      "rop": new FormControl('', Validators.required),
      "dointroduced": new FormControl('', Validators.required),
      "unittype": new FormControl('', Validators.required),
      "itemstatus": new FormControl('', Validators.required),

    }, {updateOn: 'change'});
  }

  //---------------Initialization logic-------------------

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.createView();

    this.iss.getAllList().then((itmsts: Itemstatus[]) => {
      this.itemstatuses = itmsts;
    });

    this.bs.getAllList().then((brds: Brand[]) => {
      this.brands = brds;
    });

    this.cs.getAllList().then((cats: Category[]) => {
      this.categories = cats;
    });

    this.sc.getAllList().then((scats: Subcategory[]) => {
      this.subcategories = scats;
    });

    this.us.getAllList().then((uts: Unittype[]) => {
      this.unittypes = uts;
    });

    this.rs.get('item').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  loadTable(query: string) {
    this.is.getAll(query)
      .then((itms: Item[]) => {
        this.items = itms;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.items);
        this.data.paginator = this.paginator;
      });
  }

  getModi(element: Item) {
    return element.code + '(' + element.name + ')';
  }

  createForm() {

    this.form.controls['category'].setValidators([Validators.required]);
    this.form.controls['subcategory'].setValidators([Validators.required]);
    this.form.controls['brand'].setValidators([Validators.required]);
    this.form.controls['name'].setValidators([Validators.required, Validators.pattern(this.regexes['name']['regex'])]);
    this.form.controls['code'].setValidators([Validators.required, Validators.pattern(this.regexes['code']['regex'])]);
    this.form.controls['photo'].setValidators([Validators.required]);
    this.form.controls['sprice'].setValidators([Validators.required, Validators.pattern(this.regexes['sprice']['regex'])]);
    this.form.controls['pprice'].setValidators([Validators.required, Validators.pattern(this.regexes['pprice']['regex'])]);
    this.form.controls['quantity'].setValidators([Validators.required,Validators.pattern(this.regexes['quantity']['regex'])]);
    this.form.controls['rop'].setValidators([Validators.required,Validators.pattern(this.regexes['rop']['regex'])]);
    this.form.controls['dointroduced'].setValidators([Validators.required]);
    this.form.controls['unittype'].setValidators([Validators.required]);
    this.form.controls['itemstatus'].setValidators([Validators.required]);


    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (controlName == "dointroduced")
            value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

          if (this.item!= undefined && control.valid) {
            //@ts-ignore
            if (value === this.item[controlName]) {
              control.markAsPristine();
            } else {
              control.markAsDirty();
            }
          } else {
            control.markAsPristine();
          }
        }
      );

    }

    this.enableButtons(true,false,false);

  }

  enableButtons(add:boolean, upd:boolean, del:boolean){
    this.enaadd=add;
    this.enaupd=upd;
    this.enadel=del;
  }

  //---------------Event Handling logic-------------------

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (item: Item, filter: string) => {
      return (cserchdata.cscode == null || item.code.toLowerCase().includes(cserchdata.cscode)) &&
        (cserchdata.csname == null || item.name.toLowerCase().includes(cserchdata.csname)) &&
        (cserchdata.cssprice == null || item.sprice.toString().includes(cserchdata.cssprice)) &&
        (cserchdata.cspprice == null || item.pprice.toString().includes(cserchdata.cspprice)) &&
        (cserchdata.csstatus == null || item.itemstatus.name.toLowerCase().includes(cserchdata.csstatus)) &&
        (cserchdata.csmodi == null || this.getModi(item).toLowerCase().includes(cserchdata.csmodi));
    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    let name = sserchdata.ssname;
    let code = sserchdata.sscode;
    let statusid = sserchdata.ssstatus;

    let query = "";

    if (name != null && name.trim() != "") query = query + "&name=" + name;
    if (code != null && code.trim() != "") query = query + "&code=" + code;
    if (statusid != null) query = query + "&itemstatusid=" + statusid;

    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);

  }

  btnSearchClearMc(): void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.ssearch.reset();
        this.loadTable("");
      }
    });

  }

  selectImage(e: any): void {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageitmurl = event.target.result;
        this.form.controls['photo'].clearValidators();
      }
    }
  }

  clearImage(): void {
    this.imageitmurl = 'assets/default.png';
    this.form.controls['photo'].setErrors({'required': true});
  }

  getErrors(): string {

    let errors: string = "";

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.errors) {

        if (this.regexes[controlName] != undefined) {
          errors = errors + "<br>" + this.regexes[controlName]['message'];
        } else {
          errors = errors + "<br>Invalid " + controlName;
        }
      }
    }

    return errors;
  }

  add() {

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Item Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.item = this.form.getRawValue();
      this.item.photo = btoa(this.imageitmurl);

      let itmdata: string = "";

      itmdata = itmdata + "<br>Item Name is : " + this.item.name;
      itmdata = itmdata + "<br>Item Code is : " + this.item.code;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Item Add",
          message: "Are you sure to Add the following Item? <br> <br>" + itmdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          this.is.add(this.item).then((responce: [] | undefined) => {
            if (responce != undefined) { // @ts-ignore
              console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
              // @ts-ignore
              addstatus = responce['errors'] == "";
              console.log("Add Sta-" + addstatus);
              if (!addstatus) { // @ts-ignore
                addmessage = responce['errors'];
              }
            } else {
              console.log("undefined");
              addstatus = false;
              addmessage = "Content Not Found"
            }
          }).finally(() => {

            if (addstatus) {
              addmessage = "Successfully Saved";
              this.form.reset();
              this.clearImage();
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Item Add", message: addmessage}
            });

            stsmsg.afterClosed().subscribe(async result => {
              if (!result) {
                return;
              }
            });
          });
        }
      });
    }
  }

  clear():void{
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Item Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset();
        this.clearImage();
        this.createForm();
      }
    });
  }

  getUpdates(): string {

    let updates: string = "";
    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1)+" Changed";
      }
    }
    return updates;
  }

  fillForm(item: Item) {

    this.enableButtons(false,true,true);

    this.selectedrow=item;

    this.item = JSON.parse(JSON.stringify(item));
    this.olditem = JSON.parse(JSON.stringify(item));

    if (this.item.photo != null) {
      this.imageitmurl = atob(this.item.photo);
      this.form.controls['photo'].clearValidators();
    } else {
      this.clearImage();
    }
    this.item.photo = "";

    //@ts-ignore
    this.item.brand = this.brands.find(g => g.id === this.item.brand.id);
    //@ts-ignore
    this.item.itemstatus = this.itemstatuses.find(d => d.id === this.item.itemstatus.id);
    //@ts-ignore
    this.item.unittype = this.unittypes.find(s => s.id === this.item.unittype.id);

    //@ts-ignore
    this.item.subcategory.category = this.categories.find(s => s.id === this.item.subcategory.category.id);
    this.form.get('category')?.setValue(this.item.subcategory.category);

    //@ts-ignore
    this.item.subcategory = this.subcategories.find(s => s.id === this.item.subcategory.id);

    this.form.patchValue(this.item);
    this.form.markAsPristine();

  }

  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Item Update ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

    } else {

      let updates: string = this.getUpdates();

      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Item Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.item = this.form.getRawValue();
            if (this.form.controls['photo'].dirty) this.item.photo = btoa(this.imageitmurl);
            else this.item.photo = this.olditem.photo;
            this.item.id = this.olditem.id;

            this.is.update(this.item).then((responce: [] | undefined) => {
              if (responce != undefined) {
                // @ts-ignore
                updstatus = responce['errors'] == "";
                if (!updstatus) { // @ts-ignore
                  updmessage = responce['errors'];
                }
              } else {
                updstatus = false;
                updmessage = "Content Not Found"
              }
            } ).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                this.clearImage();
                Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Employee Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

            });
          }
        });
      }
      else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Item Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }

  }

  delete() {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Item Delete",
        message: "Are you sure to Delete following Employee? <br> <br>" + this.item.name
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.is.delete(this.item.id).then((responce: [] | undefined) => {

          if (responce != undefined) { // @ts-ignore
            delstatus = responce['errors'] == "";
            if (!delstatus) { // @ts-ignore
              delmessage = responce['errors'];
            }
          } else {
            delstatus = false;
            delmessage = "Content Not Found"
          }
        } ).finally(() => {
          if (delstatus) {
            delmessage = "Successfully Deleted";
            this.form.reset();
            this.clearImage();
            Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
            this.loadTable("");
          }

          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Item Delete ", message: delmessage}
          });
          stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

        });
      }
    });
  }

}
