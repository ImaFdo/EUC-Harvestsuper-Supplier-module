import {Suppliertype} from "../entity/suppliertype";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Emptype} from "../entity/emptype";

@Injectable({
  providedIn: 'root'
})

export class SuppliertypeService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Suppliertype>> {

    const suppliertypes = await this.http.get<Array<Suppliertype>>('http://localhost:8080/suppliertypes/list').toPromise();
    if (suppliertypes == undefined) {
      return [];
    }
    return suppliertypes;
  }

  }









































