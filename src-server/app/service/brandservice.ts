import {Brand} from "../entity/brand";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class BrandService {

  constructor(private http: HttpClient) {  }

  async getAllListNameId(): Promise<Array<Brand>> {

    const brands = await this.http.get<Array<Brand>>('http://localhost:8080/brands/list').toPromise();
    if(brands == undefined){
      return [];
    }
    return brands;
  }

  async add(brand: Brand): Promise<[]|undefined>{
    //console.log("Brand Adding-"+JSON.stringify(brand));
    //brand.number="47457";
    return this.http.post<[]>('http://localhost:8080/brands', brand).toPromise();
  }

}


