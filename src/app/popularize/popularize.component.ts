import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-popularize',
  templateUrl: './popularize.component.html',
  styleUrls: ['./popularize.component.css'],
  animations: [trigger('routerTransition', [
    state('void', style({ position: 'fixed', width: '100%', height: '100%', left: 0, top: 0, background: '#07263b' })),
    // state('inactive',style({})),
    state('*', style({ position: 'fixed', width: '100%', height: '100%', left: 0, top: 0, background: '#07263b' })),
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
export class PopularizeComponent implements OnInit {

  public shareLink;

  public qrCodeUri;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().then((info)=>{
        this.shareLink=`http://ydt.imaibo.cn/ydt/node/api/share_m?suid=${info['userId']}`;
        const uri=encodeURIComponent(this.shareLink);
        console.log(uri);
        this.qrCodeUri=`http://pan.baidu.com/share/qrcode?w=200&h=200&url=${uri}`
    })
  }

}
