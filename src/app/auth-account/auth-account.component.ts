import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';

import { ShareServiceService } from '../service/share-service.service';
import { CookieService } from 'ngx-cookie';

declare var weui: any;

@Component({
  selector: 'app-auth-account',
  templateUrl: './auth-account.component.html',
  styleUrls: ['./auth-account.component.css']
})
export class AuthAccountComponent implements OnInit {

  public phone: string;
  public name: string;
  public idcard: string;
  public channel: string;
  public pass: string;
  public username: string;//from url query
  public isChecking: boolean;
  public refuseReason: string='资料审核失败，请重新填写！';
  public validCode: number;
  public readOnly: boolean;
  public hideTips:boolean=false;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private shareService: ShareServiceService, private cookieService: CookieService) { }

  ngOnInit() {

    const tmpUserInfo = this.cookieService.getObject('ydt_partner_tmp_usr') || this.shareService.getUserInfo()

    const isUserInfoEmpty = Object.keys(tmpUserInfo).length == 0;
    if (!isUserInfoEmpty) {
      this.username = tmpUserInfo.user;
      this.pass = tmpUserInfo.pass;
      this.validCode = tmpUserInfo.valid; 
      //999是一开始的申请状态
      if (typeof tmpUserInfo.valid === 'undefined') this.validCode = 999;

      this.readOnly = (this.validCode !== 2 && this.validCode !== 999);
      if (tmpUserInfo.result) {
        this.phone = tmpUserInfo.result.phone;
        this.idcard = tmpUserInfo.result.idCardNo;
        this.channel = tmpUserInfo.result.channelAdviser;
        this.name = tmpUserInfo.result.realName;
        this.refuseReason = tmpUserInfo.result.refuseReason||'资料审核失败，请重新填写！';
      }

    }

    //0第一步审核中 1第一步审核通过 2第一步审核失败 3第二步审核中 4第二步审核通过 5第二步审核失败
    if (Number(tmpUserInfo.valid) === 0) weui.alert('您的个人资料正在审核中，不能修改！');
    if (Number(tmpUserInfo.valid) === 1||Number(tmpUserInfo.valid)===3||Number(tmpUserInfo.valid)===5) {
      // weui.alert('您的个人资料审核通过，请及时补充提款资料！');
      this.router.navigate(['/auth/bank']);
    }
    if (Number(tmpUserInfo.valid)=== 2) weui.alert('您的个人资料审核失败，请修改后重新提交！');
    if (Number(tmpUserInfo.valid) === 4) {
      this.router.navigate(['/query']);
    }
  }

  sumbitInfo() {
    if (this.validCode === 1) {
      return this.router.navigate(['/auth/bank']);
    }
    if (!this.phone || !this.name || !this.idcard) {
      return weui.toast('请把资料填写完整！');
    }
    const data = {
      username: this.username,
      phone: this.phone,
      realName: this.name,
      idCardNo: this.idcard,
      channelAdviser: this.channel,
      password: null
    }


    if (!this.userService.checkIsLogin()) {
      data.username = this.username;
      data.password = this.pass;
    }

    this.userService.submitAuthAccount(data).then((r) => {
      this.router.navigate(['/auth/bank'])
    }).catch((e) => {
      weui.alert(e);
    })
  }


  hideReason() {
    this.hideTips = true;
  }

}
