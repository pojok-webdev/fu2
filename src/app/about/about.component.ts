import { Component, OnInit } from '@angular/core';
import { Uid } from '@ionic-native/uid/ngx'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'
import { Platform } from '@ionic/angular';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
imei
users
user
  constructor(
    private uid:Uid,
    private permission:AndroidPermissions,
    private data: DataService
  ) {
    this.getmyImei()
    .then(res=>{
      this.imei = res
    })
    .catch(err=>{
      alert('Err '+err)
    })
    this.data.getUsers(users=>{
      this.users = users
    })
   }

  ngOnInit() {}
  async getmyImei() {
    const { hasPermission } = await this.permission.checkPermission(
      this.permission.PERMISSION.READ_PHONE_STATE
    );
   
    if (!hasPermission) {
      const result = await this.permission.requestPermission(
        this.permission.PERMISSION.READ_PHONE_STATE
      );
   
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }
   
      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
   
     return this.uid.IMEI
   }
   saveID(){
     this.data.saveMobile({imei:this.imei,id:this.user},result=>{
       alert(result)
     })
   }
  }
