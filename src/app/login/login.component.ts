import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../user.service';
import { Router, CanActivate } from '@angular/router';
import { ShareServiceService } from '../service/share-service.service';
import { CookieService } from 'ngx-cookie';

declare var weui: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public phone:string;
  public pass:string;

  constructor(private router: Router, private userService: UserService, private zone: NgZone, private shareService: ShareServiceService, private cookieService: CookieService) {

  }
  
  

  ngOnInit() {
  }


  loginAction() {
    this.cookieService.remove('ydt_partner_tmp_usr');
    this.userService.loginAction(this.phone, this.pass).then((data) => {
      this.shareService.setUserInfo(data);
      this.shareService.setUserInfo({ user: this.phone, pass: this.pass })
      this.cookieService.putObject('ydt_partner_tmp_usr', this.shareService.getUserInfo());
      if (typeof data.valid === 'undefined') {
        return weui.alert('您的账号未开启代理人权限，如需继续使用请先提交认证资料，升级为代理人', {
          buttons: [{
            label: '提交认证资料',
            onClick: () => {
              this.zone.run(() => { this.router.navigate(['/auth/account']) })
            }
          }]
        })
      }else if (data.valid === 4) {
        this.router.navigate(['/query']);
      }else{
         this.router.navigate(['/auth/account']);
      }


      //this.router.navigate(['/query']);
    }).catch((e) => {
      weui.alert(e);
    });
  }

}
