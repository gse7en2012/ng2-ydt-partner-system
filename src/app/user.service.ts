import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private baseUrl: string = '/ydt/api';
  private cookieName = 'PARTNERTOKEN';
  private cookieUserObjName = 'PARTNERINFO'
  private formatRes(data) {
    if (data.statusCode == 200) {
      return Promise.resolve(data.msg)
    }
    return Promise.reject(data.msg);
  }

  constructor(private cookieService: CookieService, private http: Http, private jsonp: Jsonp) {

  }

  public loginAction(username: string, pass: string): Promise<any> {

    const loginParams = `password=${pass}&username=${username}`;
    const headers = new Headers({
      'content-type': 'application/x-www-form-urlencoded'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.baseUrl}/partner/login`, loginParams, options).toPromise()
      .then((data) => {
        const res = data.json();
        if (res.statusCode == 200) {
          const cookieOpts = { expires: new Date(Number(new Date()) + 1000 * 60 * 60 * 24 * 3) };
          this.cookieService.putObject(this.cookieUserObjName, {
            head: res.head,
            nickname: res.nickName,
            userId: res.userId
          }, cookieOpts);
          return Promise.resolve(res);
        }
        return Promise.reject(res.msg);
      });
  }

  public checkIsLogin() {
    return !!this.cookieService.get(this.cookieName);
  }
  public checkAuthLogin() {
    return !!this.cookieService.get('ydt_partner_tmp_usr');
  }

  public getUserInfo() {
    return Promise.resolve(this.cookieService.getObject(this.cookieUserObjName));
  }

  public getUserValid() {
    return this.http.get(`${this.baseUrl}/partner/queryUserInfo`).toPromise()
      .then(data => {
        const res = data.json();
        if (res.statusCode == 200) {
          return Promise.resolve(res);
        }
        return Promise.reject(res.msg);
      });
  }

  public getShortUrl(url) {
    return this.jsonp.get(`http://suo.im/api.php?callback=JSONP_CALLBACK&format=jsonp&url=${url}`).toPromise().then(data => {
      const res = data.json();
      if (res.url) {
        return res.url;
      } else {
        return url
      }
    })
  } 

  public queryProxyAuth() {
    return this.http.get(`${this.baseUrl}/partner/queryData`)
      .toPromise()
      .then(data => {
        const res = data.json();
        if (res.statusCode == 200) {
          return Promise.resolve(res.hasTwoLevelProxy);
        }
        return Promise.reject(res.msg);
      });
  }

  public cpaQuery(month: string, pageIndex: number) {
    return this.http.get(`${this.baseUrl}/partner/querySubCpa?month=${month}&pageIndex=${pageIndex}`)
      .toPromise()
      .then(data => {
        const res = data.json();
        if (res.statusCode == 200) {
          return Promise.resolve(res);
        }
        return Promise.reject(res.msg);
      });
  }

  public subRevenuesQuery(month: string, pageIndex: number) {
    return this.http.get(`${this.baseUrl}/partner/querySubRevenues?month=${month}&pageIndex=${pageIndex}`)
      .toPromise()
      .then(data => {
        const res = data.json();
        if (res.statusCode == 200) {
          return Promise.resolve(res);
        }
        return Promise.reject(res.msg);
      });
  }

  public submitAuthAccount(data: any): any {

    let postDataArray: any = [];
    Object.keys(data).forEach((key) => {
      if (data[key]) postDataArray.push([key, data[key]].join('='))
    })
    const postData = postDataArray.join('&')

    const headers = new Headers({
      'content-type': 'application/x-www-form-urlencoded'
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.baseUrl}/partner/submitUserInfo`, postData, options).toPromise()
      .then((data) => {
        const res = data.json();
        if (res.statusCode == 200 || res.statusCode == 1018) {
          return Promise.resolve({ scode: res.statusCode })
        }
        if (res.statusCode == 1017) {
          return Promise.reject('请等待个人资料审核完成，再提交提款资料！');
        }

        return Promise.reject(res.msg);
      });
  }

}
