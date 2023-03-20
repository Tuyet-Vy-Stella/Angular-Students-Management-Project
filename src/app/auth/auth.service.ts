import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Request} from "../shared/request";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

interface IResponse {
  access_token : string,
  token_type : string,
  name : string
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient, private cookieService : CookieService, private route : Router) {
  }

  login(email: string, password: string) {
    const request = new Request();
    request.addBodyParams('username', email);
    request.addBodyParams('password', password);


    this.http.post<IResponse>('https://qlsv-mu.vercel.app/api/token', request.getBody(), {headers: request.headers})
      .subscribe(res  => {
        this.cookieService.set('token', res.access_token);
        this.route.navigate(['/']);
      });
  }
}
