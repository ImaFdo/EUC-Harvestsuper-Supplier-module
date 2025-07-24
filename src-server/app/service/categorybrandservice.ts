import {Categorybrand} from "../entity/categorybrand";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CategorybrandService {

  constructor(private http: HttpClient) {  }

  async getAllListNameId(): Promise<Array<Categorybrand>> {

    const categorybrands = await this.http.get<Array<Categorybrand>>('http://localhost:8080/categorybrands/list').toPromise();
    if(categorybrands == undefined){
      return [];
    }
    return categorybrands;
  }

  async add(categorybrand: Categorybrand): Promise<[]|undefined>{
    //console.log("Categorybrand Adding-"+JSON.stringify(categorybrand));
    //categorybrand.number="47457";
    return this.http.post<[]>('http://localhost:8080/categorybrands', categorybrand).toPromise();
  }

}


