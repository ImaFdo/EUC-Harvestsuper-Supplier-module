import {Subcategory} from "../entity/subcategory";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class SubcategoryService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Subcategory>> {

    const subcategorys = await this.http.get<Array<Subcategory>>('http://localhost:8080/subcategories/list').toPromise();
    if(subcategorys == undefined){
      return [];
    }
    return subcategorys;
  }

}


