import {Unittype} from "../entity/unittype";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UnittypeService {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Unittype>> {

    const unittypes = await this.http.get<Array<Unittype>>('http://localhost:8080/unittypes/list').toPromise();
    if(unittypes == undefined){
      return [];
    }
    return unittypes;
  }

}


