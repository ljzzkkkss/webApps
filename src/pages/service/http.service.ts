import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';



@Injectable()
export class HttpService {
  private URL = 'https://route.showapi.com/852-2?showapi_appid=31497&type=4002&showapi_sign=3a1825d235914f81868a7686ff4b28da';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http : Http){};

  fromatnum(num : number) : string{
    return ('00' + num).substr(num.toString().length);
  }

  post(data : string) : Observable<any> {
    let now = new Date;
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let time = year + this.fromatnum(month) + this.fromatnum(date) + this.fromatnum(hour) + this.fromatnum(minute) + this.fromatnum(second);
    return this.http.post(this.URL + '&showapi_timestamp=' + time + '&page=' + data,'', {headers: this.headers})
      .map(res => res.json());
  }

}
