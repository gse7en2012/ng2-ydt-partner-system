import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params, } from '@angular/router';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css'],
  providers: [UserService],
})
export class MyDataComponent implements OnInit {

  public dateIn;
  public pageIndex = 1;
  public date =new Date().getFullYear()+''+(new Date().getMonth()+1>9?new Date().getMonth()+1:'0'+(new Date().getMonth()+1));
  public dateOut=new Date().getFullYear()+'/'+(new Date().getMonth()+1>9?new Date().getMonth()+1:'0'+(new Date().getMonth()+1));
  public queryType = 1;
  public dataDetails: any = {
    newValidCount: 0, results: [], totalValidCount: 0
  };


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.cpaQuery(this.date, this.pageIndex).then((data) => {
      this.dataDetails = data;
    })
  }

  changeQueryType(type) {
    this.queryType = type;
    const fnName = type == 1 ? 'cpaQuery' : 'subRevenuesQuery'
    this.userService[fnName](this.date, this.pageIndex).then((data) => {
      this.dataDetails = data;
      console.log(this.dataDetails)
    })
  }

  exportExcel() {
    location.href = `/ydt/api/partner/exportSubCpa?month=${this.date}`;
  }

  dateInChange() {
    this.date=this.dateIn.split('-').join('');
    this.dateOut=this.dateIn.split('-').join('/')
    this.userService.cpaQuery(this.date, this.pageIndex).then((data) => {
      this.dataDetails = data;
    })
  }
}
