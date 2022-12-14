import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import Profile from '../models/Profile';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private getProfileUrl = `${environment.baseUrl}/user/viewUser`;
  private updateUsernameUrl = `${environment.baseUrl}/user/updateusername`;
  private updateDescriptionUrl = `${environment.baseUrl}/user/updatedescription`
  private udateDOBUrl = `${environment.baseUrl}/user/changeBirthday`
  private followUrl =`${environment.baseUrl}/followers/follow`;
  private anotherPersonsProfileUrl = `${environment.baseUrl}/user/peek`;
  private updateProfilePicUrl = `${environment.baseUrl}/user/changeProfilePicture`;

  constructor(private http: HttpClient ) { }

  getProfile(): Observable<Profile> {

    return this.http.get<Profile>(`${this.getProfileUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  updateUsername(newUsername: string) {
    console.log("in profile service.ts: ", newUsername)

    let params = new HttpParams().set('newUsername', newUsername);

    return this.http.put<string>(`${this.updateUsernameUrl}`, params, {headers: environment.paramHeaders, withCredentials: environment.withCredentials} );
  }

  updateDescription(newDescription: string) {

    let params = new HttpParams().set('newDescription', newDescription);

    return this.http.put<string>(`${this.updateDescriptionUrl}`, params, {headers: environment.paramHeaders, 
    withCredentials: environment.withCredentials} );
  }

  updateDOB(newBirthDay: string, newBirthMonth: string, newBirthYear: string) {

    let params = new HttpParams()
      .set('newBirthDay', newBirthDay)
      .set('newBirthMonth', newBirthMonth)
      .set( 'newBirthYear', newBirthYear);

    return this.http.put<string>(`${this.udateDOBUrl}`, params, {headers: environment.paramHeaders, 
      withCredentials: environment.withCredentials} );
  }

  followPerson(username: string){

    let obj = {
      "userName": username
    }

    return this.http.post<User>(`${this.followUrl}`, JSON.stringify(obj), {headers: environment.headers, 
      withCredentials: environment.withCredentials} );

  }

  getAnotherPersonsProfile(username: string): Observable<Profile> {

    return this.http.get<Profile>(`${this.anotherPersonsProfileUrl}/${username}`, {headers: environment.paramHeaders, withCredentials: environment.withCredentials});
  }

  updateProfilePic(profilePic:string) {

    let params = new HttpParams().set('newProfilePicture', profilePic);

    return this.http.put<string>(`${this.updateProfilePicUrl}`, params, {headers: environment.paramHeaders, 
    withCredentials: environment.withCredentials})
  }

}
