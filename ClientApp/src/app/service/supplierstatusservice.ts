import {Supplierstatus} from "../entity/supplierstatus";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Empstatus} from "../entity/empstatus";

@Injectable({
  providedIn: 'root'
})

export class SupplierstatusService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Supplierstatus>> {

    const supplierstatuses = await this.http.get<Array<Supplierstatus>>('http://localhost:8080/supplierstatuses/list').toPromise();
    if (supplierstatuses == undefined) {
      return [];
    }
    return supplierstatuses;
  }

  }









































