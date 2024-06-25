import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterUsers, Users } from 'src/lib/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiEnv = environment;

  constructor(
    private http: HttpClient,
  ) { }

  getUSers(filters:FilterUsers): Observable<any>{
    return this.http.get<Users>(`${this.apiEnv.usersApi}`, { params: filters as any, });
  }

  getFollowersUsers(user:any): Observable<any>{
    return this.http.get<Users>(`${this.apiEnv.userFollowers}${user}/followers`);
  }
}
