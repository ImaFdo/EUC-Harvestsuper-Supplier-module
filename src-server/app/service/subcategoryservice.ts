import {Subcategory} from "../entity/subcategory";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class SubcategoryService {

  constructor(private http: HttpClient) {  }

  async getAllListNameId(): Promise<Array<Subcategory>> {

    const subcategorys = await this.http.get<Array<Subcategory>>('http://localhost:8080/subcategorys/list').toPromise();
    if(subcategorys == undefined){
      return [];
    }
    return subcategorys;
  }

  async add(subcategory: Subcategory): Promise<[]|undefined>{
    //console.log("Subcategory Adding-"+JSON.stringify(subcategory));
    //subcategory.number="47457";
    return this.http.post<[]>('http://localhost:8080/subcategorys', subcategory).toPromise();
  }

}


