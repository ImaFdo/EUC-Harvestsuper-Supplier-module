import {Itemstatus} from "../entity/itemstatus";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Empstatus} from "../entity/empstatus";

@Injectable({
  providedIn: 'root'
})

export class ItemstatusService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Itemstatus>> {

    const itemstatuses = await this.http.get<Array<Itemstatus>>('http://localhost:8080/itemstatuses/list').toPromise();
    if (itemstatuses == undefined) {
      return [];
    }
    return itemstatuses;
  }

  }


