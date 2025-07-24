import {Category} from "../entity/category";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Category>> {

    const categorys = await this.http.get<Array<Category>>('http://localhost:8080/categories/list').toPromise();
    if(categorys == undefined){
      return [];
    }
    return categorys;
  }


}


