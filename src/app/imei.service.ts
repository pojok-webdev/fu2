import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ImeiService {

  constructor(
    private permission: AndroidPermissions, 
    private uid: Uid,
    private data: DataService
  ) { }
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
      return;
    }
    return this.uid.IMEI
  }
  saveID(obj){
    this.data.saveMobile({imei:obj.imei,id:obj.user},result=>{
      alert(result)
    })
  }
}
