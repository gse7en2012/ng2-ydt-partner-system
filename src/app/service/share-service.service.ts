import { Injectable } from '@angular/core';

@Injectable()
export class ShareServiceService {

  private tempUserInfo:any={};

  constructor() { }

  getUserInfo(){
    return this.tempUserInfo;
  }

  setUserInfo(opts){
    this.tempUserInfo=Object.assign(this.tempUserInfo,opts);
  }

}
