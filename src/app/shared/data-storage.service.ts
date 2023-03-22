import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn : 'root'})
export class DataStorageService {
  constructor(private http : HttpClient) {
  }

  fetchTeachersData(){
    this.http.get(`https://qlsv-mu.vercel.app/api/teacher-list`)
      .subscribe(res => console.log(res));
  }
}
