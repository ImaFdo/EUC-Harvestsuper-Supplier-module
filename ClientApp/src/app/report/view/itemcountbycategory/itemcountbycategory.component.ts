import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ReportService} from "../../reportservice";
import {ItemCountByCategory} from "../../entity/itemcountbycategory";


declare var google: any;
@Component({
  selector: 'app-itemcountbycategory',
  templateUrl: './itemcountbycategory.component.html',
  styleUrls: ['./itemcountbycategory.component.css']
})
export class ItemcountbycategoryComponent {


  itemcountbycategories!: ItemCountByCategory[];
  data!: MatTableDataSource<ItemCountByCategory>;

  columns: string[] = ['name', 'count'];
  headers: string[] = ['Name', 'Count'];
  binders: string[] = ['name', 'count'];

  @ViewChild('barchart', { static: false }) barchart: any;

  constructor(private rs: ReportService) {
    //Define Interactive Panel with Needed Form Elements
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize():void{
    this.rs.itemCountByCategory()
      .then((its: ItemCountByCategory[]) => {
        this.itemcountbycategories = its;
        this.createView();
      });

  }

  createView():void {
    this.loadTable();
    this.loadCharts();
  }

  loadTable() : void{
    this.data = new MatTableDataSource(this.itemcountbycategories);
  }

  loadCharts() : void{
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawCharts.bind(this));
  }


  drawCharts() {

    const barData = new google.visualization.DataTable();
    barData.addColumn('string', 'Name');
    barData.addColumn('number', 'Count');


    this.itemcountbycategories.forEach((itc: ItemCountByCategory) => {
      barData.addRow([itc.name, itc.count]);

    });

    const barOptions = {
      title: 'Item Count (Bar Chart)',
      subtitle: 'Count by Category',
      bars: 'horizontal',
      height: 400,
      width: 600
    };


    const barChart = new google.visualization.BarChart(this.barchart.nativeElement);
    barChart.draw(barData, barOptions);

  }
}
