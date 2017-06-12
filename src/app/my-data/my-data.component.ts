import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params, } from '@angular/router';

declare var weui: any;

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css'],
  providers: [UserService],
})
export class MyDataComponent implements OnInit {

  public dateIn;
  public pageIndex = 1;
  public date = new Date().getFullYear() + '' + (new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1));
  public dateOut = new Date().getFullYear() + '/' + (new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1));
  public queryType = 1;
  public dataDetails: any = {
    newValidCount: 0, results: [], totalValidCount: 0
  };

  public dateStartTime = new Date().getFullYear() + '/' + (new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1));

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
    this.date = this.dateStartTime.split('/').join('')
    this.userService.cpaQuery(this.date, this.pageIndex).then((data) => {
      this.dataDetails = data;
    })
  }

  dateStartPickerClick() {
    const _modelThis = this;
    weui.datePicker({
      defaultValue: [(new Date()).getFullYear(), (new Date()).getMonth() + 1],
      onConfirm: function (result) {
        _modelThis.dateStartTime = result.map((item) => {
          if (item.value < 10) return '0' + item.value;
          return item.value
        }).splice(0, 2).join('/');


        _modelThis.dateInChange();
      },
      id: 'dateStartPicker'
    });
  }

}
