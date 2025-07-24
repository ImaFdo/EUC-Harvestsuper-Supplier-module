import {Category} from "../entity/category";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CategoryyService {

  constructor(private http: HttpClient) {  }

  async getAllListNameId(): Promise<Array<Category>> {

    const categorys = await this.http.get<Array<Category>>('http://localhost:8080/categorys/list').toPromise();
    if(categorys == undefined){
      return [];
    }
    return categorys;
  }

  async add(category: Category): Promise<[]|undefined>{
    //console.log("Category Adding-"+JSON.stringify(category));
    //category.number="47457";
    return this.http.post<[]>('http://localhost:8080/categorys', category).toPromise();
  }

}


