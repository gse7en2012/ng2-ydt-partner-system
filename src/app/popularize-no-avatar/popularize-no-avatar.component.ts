import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../user.service';

declare var Clipboard: any;
declare var weui: any;


@Component({
  selector: 'app-popularize-no-avatar',
  templateUrl: './popularize-no-avatar.component.html',
  styleUrls: ['./popularize-no-avatar.component.css'],
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
export class PopularizeNoAvatarComponent implements OnInit, AfterViewInit {

  public shareLink;

  public qrCodeUri;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().then((info) => {
      this.shareLink = `http://ydt.imaibo.cn/ydt/node/api/share_m_partner_noa?suid=${info['userId']}`;


      this.userService.getShortUrl(this.shareLink).then((url) => {
        this.shareLink = url;
      }).catch(e=>{
        
      })

      const uri = encodeURIComponent(this.shareLink);

      this.qrCodeUri = `http://pan.baidu.com/share/qrcode?w=400&h=400&url=${uri}`
    })
  }

  ngAfterViewInit() {
    const cp = new Clipboard('.copy-btn', {
      text: () => {
        return this.shareLink;
      }
    });
    cp.on('success', () => {
      weui.toast('复制成功！');
    });
    cp.on('error', () => {
      weui.toast('该浏览器不支持复制，请手动复制：' + this.shareLink);
    })
  }

}