import {Itemstatus} from "../entity/itemstatus";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ItemstatusService {

  constructor(private http: HttpClient) {  }

  async getAllListNameId(): Promise<Array<Itemstatus>> {

    const itemstatuss = await this.http.get<Array<Itemstatus>>('http://localhost:8080/itemstatuss/list').toPromise();
    if(itemstatuss == undefined){
      return [];
    }
    return itemstatuss;
  }

  async add(itemstatus: Itemstatus): Promise<[]|undefined>{
    //console.log("Itemstatus Adding-"+JSON.stringify(itemstatus));
    //itemstatus.number="47457";
    return this.http.post<[]>('http://localhost:8080/itemstatuss', itemstatus).toPromise();
  }

}


