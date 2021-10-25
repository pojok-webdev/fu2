import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PopoverController } from '@ionic/angular';
import { PopupkdticketsearchComponent } from '../popupkdticketsearch/popupkdticketsearch.component';
import { PopupaddfuComponent } from '../popupaddfu/popupaddfu.component';
import { AboutComponent } from '../about/about.component';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Uid } from '@ionic-native/uid/ngx';

@Component({
  selector: 'app-searchticket',
  templateUrl: './searchticket.component.html',
  styleUrls: ['./searchticket.component.scss'],
})
export class SearchticketComponent implements OnInit {
  canAddFu = false
  ticket = {
    id:0,
    kdticket:'',
    clientname:''
  }
  fus = []
  user = {
    id:0,username:'',imei:''
  }
  imei
  constructor(
    private data:DataService,
    private popoverController:PopoverController,
    private permission: AndroidPermissions,
    private uid: Uid
  ) {
    setTimeout(_=>{
      this.getmyImei()
      .then(imei=>{
        this.imei = imei
        this.data.getUserByImei({imei:imei},user=>{
          this.user = user
        })
      })
      .catch(err=>{
        console.log('Err get imei',err)
      })
  
    },1000)
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

  async showMenu(){
    const popover = await this.popoverController.create({
      component:PopupkdticketsearchComponent
    })
    await popover.present()
    await popover.onDidDismiss().then(result=>{
      //console.log('Resut',result)
      this.data.getTicketByKdticket({kdticket:result.data.data.kdticket},result=>{
        console.log('Result',result)
        if(result.length>0){
          this.canAddFu = true
          this.ticket = result[0]
          this.getFus(result[0])
          }else{
            console.log('empty result')
          this.canAddFu = false
          this.ticket = {
            id:0,
            kdticket:'',
            clientname:''
          }
          this.fus = []
        }
      })
    })
  }
  async showAdd(){
    const popover = await this.popoverController.create({
      component:PopupaddfuComponent,
      componentProps:{
        id:this.ticket.id,
        kdticket:this.ticket.kdticket,
        clientname:this.ticket.clientname,
        username:this.user.username
      }
    })
    await popover.present()
    await popover.onDidDismiss().then(result=>{
      if(result.data.result ==="ok"){
        this.data.saveFu(result.data.data,res=>{
          console.log('Save Res',res)
          this.getFus(this.ticket)
//          alert(JSON.stringify(res))
        })
      }
    })
  }
  getFus(obj){
    this.data.getFusByKdticket(obj,fus=>{
      console.log('Fus',fus)
      this.fus = fus
    })
  }
  async showAbout(){
    const popover = await this.popoverController.create({
      component:AboutComponent
    })
    await popover.present()
  }
}
