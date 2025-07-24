import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UiAssist} from "../../../util/ui/ui.assist";
import {MatDialog} from "@angular/material/dialog";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {RegexService} from "../../../service/regexservice";
import {DatePipe} from "@angular/common";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {Supplier} from 'src/app/entity/supplier';
import {SupplierService} from 'src/app/service/supplierservice';
import {Supplierstatus} from 'src/app/entity/supplierstatus';
import {Suppliertype} from 'src/app/entity/suppliertype';
import {Category} from 'src/app/entity/category';
import {SupplierstatusService} from 'src/app/service/supplierstatusservice';

// @ts-ignore
import {CategoryService, Categoryservice} from 'src/app/service/Categoryservice';
import {MatSelectionList} from "@angular/material/list";
import {Supply} from "../../../entity/supply";
import {SuppliertypeService} from "../../../service/suppliertypeservice";
import {Employee} from "../../../entity/employee";
import {EmployeeService} from "../../../service/employeeservice";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})

export class SupplierComponent {

  @ViewChild('availablelist') availablelist!: MatSelectionList;
  @ViewChild('selectedlist') selectedlist!: MatSelectionList;

  columns: string[] = ['name', 'code', 'supplierstatus', 'suppliertype', 'mobile', 'email'];
  headers: string[] = ['Name', 'Code', 'Status', 'Type', 'Contact Number', 'Email'];
  binders: string[] = ['name', 'code', 'supplierstatus.name', 'suppliertype.name', 'mobile', 'email'];

  cscolumns: string[] = ['csname', 'cscode', 'cssupplierstatus', 'cssuppliertype', 'csmobile', 'csemail'];
  csprompts: string[] = ['Search by Name', 'Search by R Number', 'Search by Status', 'Search by Type', 'Search by Category', 'Search by Office TP'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  supplier!: Supplier;
  oldsupplier!: Supplier;
  oldcategorys: Array<Category> = [];

  suppliers: Array<Supplier> = [];
  data!: MatTableDataSource<Supplier>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'
  uiassist: UiAssist;

  regexes: any;
  selectedrow: any;

  supplierstatuses: Array<Supplierstatus> = [];
  suppliertypes: Array<Suppliertype> = [];
  categorys: Array<Category> = [];
  supplies: Array<Supply> = [];
  employees: Array<Employee> = [];


  enaadd: boolean = true;
  enaupd: boolean = false;
  enadel: boolean = false;


  constructor(
    private sus: SupplierService,
    private suss: SupplierstatusService,
    private suts: SuppliertypeService,
    private sucs: CategoryService,
    private rs: RegexService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    private es: EmployeeService,
    public authService: AuthorizationManager) {

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      csname: new FormControl(),
      cscode: new FormControl(),
      cssupplierstatus: new FormControl(),
      cssuppliertype: new FormControl(),
      csmobile: new FormControl(),
      csemail: new FormControl(),
    });

    this.ssearch = this.fb.group({
      ssname: new FormControl(),
      sscode: new FormControl(),
    });

    this.form = this.fb.group({
      "employee": new FormControl('', [Validators.required]),
      "name": new FormControl('', [Validators.required]),
      "code": new FormControl('', [Validators.required]),
      "doregistered": new FormControl('', [Validators.required]),
      "address": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required]),
      "mobile": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "supplierstatus": new FormControl('', [Validators.required]),
      "suppliertype": new FormControl('', [Validators.required]),
      "supplies": new FormControl('', [Validators.required]),
    }, {updateOn: 'change'});

  }

  //---------------Initialization logic-------------------

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.suss.getAllList().then((vsts: Supplierstatus[]) => {
      this.supplierstatuses = vsts;
    });

    this.suts.getAllList().then((vtys: Suppliertype[]) => {
      this.suppliertypes = vtys;
    });

    this.es.getAllListNameId().then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.sucs.getAllList().then((scos: Category[]) => {
      this.categorys = scos;
    });

    this.rs.get('supplier').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });
  }

  filterDates = (date: Date | null): boolean => {
    const currentDate = new Date();
    return !date || date.getTime() <= currentDate.getTime();
  };

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  loadTable(query: string) {

    this.sus.getAll(query)
      .then((supp: Supplier[]) => {
        this.suppliers = supp;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.suppliers);
        this.data.paginator = this.paginator;
      });

  }

  createForm() {

    this.form.controls['employee'].setValidators([Validators.required]);
    this.form.controls['name'].setValidators([Validators.required]);
    this.form.controls['supplierstatus'].setValidators([Validators.required]);
    this.form.controls['suppliertype'].setValidators([Validators.required]);
    this.form.controls['doregistered'].setValidators([Validators.required]);
    this.form.controls['code'].setValidators([Validators.required]);
    this.form.controls['address'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required]);
    this.form.controls['email'].setValidators([Validators.required]);
    this.form.controls['email'].setValidators([Validators.required]);
    this.form.controls['contactperson'].setValidators([Validators.required]);
    this.form.controls['mobile'].setValidators([Validators.required]);
    this.form.controls['doenter'].setValidators([Validators.required]);
    this.form.controls['supplies'].setValidators([Validators.required]);


    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (controlName == "doregistered")
            value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

          if (this.supplier != undefined && control.valid) {
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

    this.enableButtons(true, false, false);
  }

  enableButtons(add: boolean, upd: boolean, del: boolean) {
    this.enaadd = add;
    this.enaupd = upd;
    this.enadel = del;
  }

  //---------------Event Handling logic-------------------

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (supplier: Supplier, filter: string) => {
      return (cserchdata.csname == null || supplier.name.toLowerCase().includes(cserchdata.csname.toLowerCase())) &&
        (cserchdata.cscode == null || supplier.code.toLowerCase().includes(cserchdata.cscode.toLowerCase())) &&
        (cserchdata.cssupplierstatus == null || supplier.supplierstatus.name.toLowerCase().includes(cserchdata.cssupplierstatus.toLowerCase())) &&
        (cserchdata.cssuppliertype == null || supplier.suppliertype.name.toLowerCase().includes(cserchdata.cssuppliertype.toLowerCase())) &&
        (cserchdata.csmobile == null || supplier.mobile.includes(cserchdata.csmobile)) &&
        (cserchdata.csemail == null || supplier.email.includes(cserchdata.csemail));

    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    this.csearch.reset();
    const sserchdata = this.ssearch.getRawValue();

    let name = sserchdata.ssname;
    let code = sserchdata.sscode;


    let query = "";

    if (name != null && name.trim() != "") query = query + "&name=" + name;
    if (code != null) query = query + "&code=" + code;

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
        this.csearch.reset();
        this.ssearch.reset();
        this.loadTable("");
      }
    });

  }

  getErrors(): string {

    let errors: string = "";

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.errors) {

        if (this.regexes[controlName] != undefined) {
          // errors = errors + "<br>" + this.regexes[controlName]['message'];
        } else {
          errors = errors + "<br>Invalid " + controlName;
        }
      }
    }

    return errors;
  }

  fillForm(supplier: Supplier) {

    this.enableButtons(false, true, true);
    this.categorys = Array.from(this.oldcategorys);

    this.selectedrow = supplier;

    this.supplier = JSON.parse(JSON.stringify(supplier));
    this.oldsupplier = JSON.parse(JSON.stringify(supplier));

    //@ts-ignore
    this.supplier.supplierstatus = this.supplierstatuses.find(s => s.id === this.supplier.supplierstatus.id);

    //@ts-ignore
    this.supplier.suppliertype = this.suppliertypes.find(t => t.id === this.supplier.suppliertype.id);

    //@ts-ignore
    this.supplier.employee = this.employees.find(e => e.id === this.supplier.employee.id);

    //@ts-ignore
    this.supplier.supplies = this.supplier.supplies.map(s => new Supply({category: s.category}));

    this.supplies = this.supplier.supplies; // Load User Roles
    this.supplier.supplies.forEach((sl) => this.categorys = this.categorys.filter((c) => c.id != sl.category.id));

    this.form.patchValue(this.supplier);
    this.form.markAsPristine();

  }

  add() {

    let errors = this.getErrors();
    // let errors = "";

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Supplier Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }
      });
    } else {

      let sp: Supplier = this.form.getRawValue();
      console.log('sp', sp)

      if (!this.supplier) {
        // @ts-ignore
        this.supplier = new Supplier();
        this.supplier.supplies = [];
      }

      sp.supplies = this.supplier.supplies;
      this.supplier = sp;

      let supdata: string = "";

      supdata = supdata + "<br>Name is : " + this.supplier.name;
      supdata = supdata + "<br>Register Number is : " + this.supplier.code;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Supplier Add",
          message: "Are you sure to Add the following Supplier? <br> <br>" + supdata
        }
      });

      let addstatus = false;
      let addmessage = "Server Not Found";

      confirm.afterClosed().subscribe(result => {
        if (result) {
          this.sus.add(this.supplier).then((responce: [] | undefined) => {
            if (responce != undefined) {
              // @ts-ignore
              addstatus = responce['errors'] == "";
              if (!addstatus) {
                // @ts-ignore
                addmessage = responce['errors'];
              }
            }

            if (addstatus) {
              addmessage = "Successfully Saved";
              this.form.reset();
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Supplier Add", message: addmessage}
            });

            stsmsg.afterClosed().subscribe(result => {
              if (!result) {
                return;
              }
            });
          });
        }
      });
    }
  }

  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Supplier Update ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });

    } else {

      let updates: string = this.getUpdates();

      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Supplier Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            this.supplier = this.form.getRawValue();
            this.supplier.id = this.oldsupplier.id;

            // @ts-ignore
            this.sus.update(this.supplier).then((responce: [] | undefined) => {
              if (responce != undefined) { // @ts-ignore
                updstatus = responce['errors'] == "";
                if (!updstatus) { // @ts-ignore
                  updmessage = responce['errors'];
                }
              } else {
                updstatus = false;
                updmessage = "Content Not Found"
              }
            }).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                Object.values(this.form.controls).forEach(control => {
                  control.markAsTouched();
                });
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Supplier Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => {
                if (!result) {
                  return;
                }
              });

            });
          }
        });
      } else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Supplier Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => {
          if (!result) {
            return;
          }
        });

      }
    }


  }

  getUpdates(): string {

    let updates: string = "";
    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
      }
    }
    return updates;
  }

  delete() {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Supplier Delete",
        message: "Are you sure to Delete following Supplier? <br> <br>" + this.supplier.code
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.sus.delete(this.supplier.id).then((responce: [] | undefined) => {

          if (responce != undefined) { // @ts-ignore
            delstatus = responce['errors'] == "";
            if (!delstatus) { // @ts-ignore
              delmessage = responce['errors'];
            }
          } else {
            delstatus = false;
            delmessage = "Content Not Found"
          }
        }).finally(() => {
          if (delstatus) {
            delmessage = "Successfully Deleted";
            this.form.reset();
            Object.values(this.form.controls).forEach(control => {
              control.markAsTouched();
            });
            this.loadTable("");
          }

          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Supplier Delete ", message: delmessage}
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

  clear(): void {
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Supplier Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset();
        this.enableButtons(true, false, false);
        this.loadTable("");
      }
    });
  }

  rightSelected(): void {

    if (!this.supplier) {
      // @ts-ignore
      this.supplier = new Supplier();
      this.supplier.supplies = [];
    }

    const selectedOptions = this.availablelist.selectedOptions.selected;

    selectedOptions.forEach(option => {
      const category: Category = option.value;
      const supply = new Supply({category});

      this.categorys = this.categorys.filter(cat => cat.id !== category.id);
      this.supplies.push(supply);
    });

    this.supplier.supplies = [...this.supplies];

    this.form.controls['supplies'].clearValidators();
    this.form.controls['supplies'].updateValueAndValidity();
  }

  leftSelected(): void {
    const selectedOptions = this.selectedlist.selectedOptions.selected;

    selectedOptions.forEach(option => {
      const supply: Supply = option.value;

      // Remove from supplies (right list)
      this.supplies = this.supplies.filter(s => s !== supply);

      // Add back to categories (left list) if not already present
      if (!this.categorys.find(c => c.id === supply.category.id)) {
        this.categorys.push(supply.category);
      }
    });

    // Reassign updated supplies to the supplier
    this.supplier.supplies = [...this.supplies];

    this.form.controls['supplies'].setValidators(Validators.required);
    this.form.controls['supplies'].updateValueAndValidity();
  }

  rightAll(): void {
    const selectedOptions = this.availablelist.selectAll();

    selectedOptions.forEach(option => {
      const category: Category = option.value;
      const supply = new Supply({category});

      this.categorys = this.categorys.filter(cat => cat.id !== category.id);
      this.supplies.push(supply);
    });

    this.supplier.supplies = [...this.supplies];

    this.form.controls['supplies'].clearValidators();
    this.form.controls['supplies'].updateValueAndValidity();
  }

  leftAll(): void {
    this.supplies.forEach(supply => {
      if (!this.categorys.find(cat => cat.id === supply.category.id)) {
        this.categorys.push(supply.category);
      }
    });

    this.supplies = [];
    this.supplier.supplies = [];

    this.form.controls['supplies'].setValidators(Validators.required);
    this.form.controls['supplies'].updateValueAndValidity();


  }

}
