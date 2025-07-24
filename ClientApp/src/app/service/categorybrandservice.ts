import {Categorybrand} from "../entity/categorybrand";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CategorybrandService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Categorybrand>> {

    const categorybrands = await this.http.get<Array<Categorybrand>>('http://localhost:8080/categorybrands/list').toPromise();
    if(categorybrands == undefined){
      return [];
    }
    return categorybrands;
  }


}


