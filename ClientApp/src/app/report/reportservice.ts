import {CountByDesignation} from "./entity/countbydesignation";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ItemCountByCategory} from "./entity/itemcountbycategory";

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http: HttpClient) {  }

  async countByDesignation(): Promise<Array<CountByDesignation>> {

    const countbydesignations = await this.http.get<Array<CountByDesignation>>('http://localhost:8080/reports/countbydesignation').toPromise();
    if(countbydesignations == undefined){
      return [];
    }
    return countbydesignations;
  }

  async itemCountByCategory(): Promise<Array<ItemCountByCategory>> {

    const itemcountbycategory = await this.http.get<Array<ItemCountByCategory>>('http://localhost:8080/reports/itemcountbycategory').toPromise();
    if(itemcountbycategory == undefined){
      return [];
    }
    return itemcountbycategory;
  }
}
