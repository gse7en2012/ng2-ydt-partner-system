import { Component, OnInit, NgZone,AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';

import { ShareServiceService } from '../service/share-service.service';
import { CookieService } from 'ngx-cookie';

declare var plupload: any;
declare var Qiniu: any;
declare var QiniuJsSDK: any;
declare var weui: any;

@Component({
  selector: 'app-auth-bank',
  templateUrl: './auth-bank.component.html',
  styleUrls: ['./auth-bank.component.css']
})
export class AuthBankComponent implements OnInit,AfterViewInit {

  public bankCardIsUpload: boolean = false;
  public idCardIsUpload: boolean = false;
  public bankCardUri: string;
  public idCardUri: string;
  public username: string;
  public pass: string;
  public bankNo: string;
  public hideTips:boolean=false;

  public refuseReason: string='资料审核失败，请重新填写！';

  public btnText: string = '提交审核';
  public validCode: string;
  public readOnly: boolean;
  public bankPlaceHolder: string = '在此输入银行卡号';

  constructor(private zone: NgZone, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private shareService: ShareServiceService, private cookieService: CookieService) { }

  private getUploadOpts(type) {
    const _self = this;
    return {
      runtimes: 'html5,flash,html4',      // 上传模式，依次退化
      browse_button: type === 'bank' ? 'bank-card-upload' : 'id-card-upload',         // 上传选择的点选按钮，必需
      // uptoken_url: '/gmapi/qiniu_upload_token',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
      uptoken: 'POQvaC2kzeErHALP6TVgVrWAB3_WLQG--ti5Wfmz:SxHtMD5CRdVVmtr88BtjuWNELc0=:eyJtaW1lTGltaXQiOiJpbWFnZS9qcGVnO2ltYWdlL3BuZyIsInNjb3BlIjoieWR0LXBhcnRuZXIiLCJkZWFkbGluZSI6MTQ5NjcyMDA5OX0=',
      get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
      domain: 'http://oqdyk3j4f.bkt.clouddn.com/',     // bucket域名，下载资源时用到，必需
      max_file_size: '500mb',             // 最大文件体积限制
      max_retries: 3,                     // 上传失败最大重试次数
      dragdrop: true,                     // 开启可拖曳上传
      drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      chunk_size: '4mb',                  // 分块上传时，每块的体积
      auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      init: {
        'FilesAdded': function (up, files) {
          plupload.each(files, function (file) {
            // 文件添加进队列后，处理相关的事情
          });
        },
        'BeforeUpload': function (up, file) {
          // 每个文件上传前，处理相关的事情
        },
        'UploadProgress': function (up, file) {
          // 每个文件上传时，处理相关的事情
        },
        'FileUploaded': function (up, file, info) {
          const domain = up.getOption('domain');
          const res = JSON.parse(info);
          _self.zone.run(() => {
            if (type === 'bank') {
              _self.bankCardIsUpload = true;
              _self.bankCardUri = domain + res.key;
            }
            if (type === 'id') {
              _self.idCardIsUpload = true;
              _self.idCardUri = domain + res.key;
            }
          })


        },
        'Error': function (up, err, errTip) {
          //上传出错时，处理相关的事情
        },
        'UploadComplete': function () {
          //队列文件处理完毕后，处理相关的事情
        },
        'Key': function (up, file) {
          // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
          // 该配置必须要在 unique_names: false , save_key: false 时才生效
          var key = type + '_' + (new Date()).valueOf() + "." + file.name.split('.')[1];
          // do something with key here
          return key
        }
      }
    }
  }



  ngOnInit() {
   
  }

  ngAfterViewInit(){
 const uploadBankCard = Qiniu.uploader(this.getUploadOpts('bank'));
    const uploadIdCard = (new QiniuJsSDK()).uploader(this.getUploadOpts('id'));



    const tmpUserInfo = this.cookieService.getObject('ydt_partner_tmp_usr') || this.shareService.getUserInfo()
    const isUserInfoEmpty = Object.keys(tmpUserInfo).length == 0;
    if (!isUserInfoEmpty) {

      this.username = tmpUserInfo.user;
      this.pass = tmpUserInfo.pass;
      this.validCode = tmpUserInfo.valid;
      this.readOnly = (Number(tmpUserInfo.valid) === 0 || Number(tmpUserInfo.valid) === 3 || Number(tmpUserInfo.valid) === 4);
      if (this.readOnly) this.bankPlaceHolder = '不可修改';

      if (tmpUserInfo.result) {
        this.bankCardUri = tmpUserInfo.result.bankCardPic;
        this.idCardUri = tmpUserInfo.result.idCardPic;
        this.bankNo = tmpUserInfo.result.bankCardNo;
        this.refuseReason = tmpUserInfo.result.refuseReason;
      }

    }

    if (Number(tmpUserInfo.valid) === 3) weui.alert('您的提款资料正在审核中，不能修改！');
    if (Number(tmpUserInfo.valid) === 4) weui.alert('您的提款资料审核通过，点击确认登陆系统！', () => {
      //this.router.navigate(['/query'])
    });
    if (Number(tmpUserInfo.valid) === 5) weui.alert('您的提款资料审核失败，请修改后重新提交！');
  }

  deleteBankCard() {

    this.bankCardIsUpload = false;
  }

  deleteIdCard() {
    this.idCardIsUpload = false;
  }

  skipSubmit() {
    const _self = this;
    weui.confirm('代理人发起提款申请前，需先完成提款资料认证，若跳过此步，可在“设置”里重新提交。', {
      buttons: [{
        label: '返回编辑',
        type: 'default',
        onClick: function () {
          this.router.navigate(['/query'])
        }
      }, {
        label: '提交审核',
        type: 'primary',
        onClick: function () {
          _self.submitInfo();
        }
      }]
    });
  }

  gotoIndex() {
    weui.alert('代理人发起提款申请前，需先完成提款资料认证，若跳过此步，可在“设置”里重新提交。', () => {
      this.router.navigate(['/query'])
    })
  }

  submitInfo() {

    if (this.readOnly) return;
    if (!this.bankNo || !this.bankCardUri || !this.idCardUri) {
      return weui.toast('请把资料填写完整！');
    }
    const data = {
      username: this.username,
      idCardPic: this.idCardUri,
      bankCardPic: this.bankCardUri,
      bankCardNo: this.bankNo,
      password: null
    }

    if (!this.userService.checkIsLogin()) {
      data.username = this.username;
      data.password = this.pass;
    }

    this.userService.submitAuthAccount(data).then((result) => {
      weui.alert('资料提交成功，审核通过后即可登录进入到合作伙伴系统', () => {
        this.router.navigate(['/login'])
      })
    }).catch((e) => {

      weui.alert(e);
    })
  }

  hideReason() {
    this.hideTips = true;
  }


}
