import {Component, ViewChild} from '@angular/core';
import {Employee} from "../../../entity/employee";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Item} from "../../../entity/item";
import {UiAssist} from "../../../util/ui/ui.assist";
import {ItemService} from "../../../service/itemservice";
import {Gender} from "../../../entity/gender";
import {Designation} from "../../../entity/designation";
import {Empstatus} from "../../../entity/empstatus";
import {Emptype} from "../../../entity/emptype";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  columns: string[] = ['code', 'name', 'sprice', 'pprice', 'status', 'modi'];
  headers: string[] = ['Code', 'Name', 'Sale Price', 'Purchase Price', 'Status', 'Modification'];
  binders: string[] = ['code', 'name', 'sprice', 'pprice', 'itemstatus.name', 'getModi()'];

  items: Array<Item> = [];
  data!: MatTableDataSource<Item>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  uiassist: UiAssist;

  constructor(
    private  is:ItemService
  ) {
    this.uiassist = new UiAssist(this);

  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.createView();
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

}
