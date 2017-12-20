import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../user.service';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  animations: [trigger('routerTransition', [
    state('void', style({ position: 'absolute', width: '100%', 'minHeight': '100%', left: 0, top: 0, background: '#07263b' })),
    state('*', style({ position: 'absolute', width: '100%', 'minHeight': '100%', left: 0, top: 0, background: '#07263b' })),
    transition(':enter', [  // before 2.1: transition('void => *', [
      style({ transform: 'translateX(100%)' }),
      animate('0.25s linear', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [  // before 2.1: transition('* => void', [
      style({ transform: 'translateX(0%)' }),
      animate('0.25s linear', style({ transform: 'translateX(-100%)' }))
    ])
  ])],
  host: { '[@routerTransition]': '' }
})
export class SettingComponent implements OnInit {

  public avatar: string;
  public nickname: string;
  public valid: string;
  public validTips: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserInfo().then((info) => {
      console.log(info);
      this.avatar = info['head'];
      this.nickname = info['nickname'];
    })

    this.userService.getUserValid().then((validInfo) => {
      this.valid = validInfo.valid;
      if (this.valid == '1') this.validTips = '完善资料';
      if (this.valid == '3') this.validTips = '审核中';
      if (this.valid == '4') this.validTips = '已认证';
      if (this.valid == '5') this.validTips = '认证失败';
    })

  }

  uploadInfo() {
    //0第一步审核中 1第一步审核通过 2第一步审核失败 3第二步审核中 4第二步审核通过 5第二步审核失败
    //if (this.valid == '1'||this.valid == '5') {
      this.router.navigate(['/auth/bank']);
    //}
  }

}
