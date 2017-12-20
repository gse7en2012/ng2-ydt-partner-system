import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { UserService } from '../user.service';


@Component({
  selector: 'app-data-query',
  templateUrl: './data-query.component.html',
  styleUrls: ['./data-query.component.css'],
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
  providers: [UserService],
  host: { '[@routerTransition]': '' }
})
export class DataQueryComponent implements OnInit {

  dataDeatils: any;
  isHasProxy;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.queryProxyAuth().then((auth) => {
      this.isHasProxy = auth;
    })
  }

  public goToMyData() {
    this.router.navigate(['/query/mine']);
  }

  public goToProxyData(){
    if(!this.isHasProxy) return false;
  }

}
