import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PopoverController } from '@ionic/angular';
import { PopupkdticketsearchComponent } from '../popupkdticketsearch/popupkdticketsearch.component';
import { PopupaddfuComponent } from '../popupaddfu/popupaddfu.component';

@Component({
  selector: 'app-searchticket',
  templateUrl: './searchticket.component.html',
  styleUrls: ['./searchticket.component.scss'],
})
export class SearchticketComponent implements OnInit {
  ticket = {
    id:0,
    kdticket:'',
    clientname:''
  }
  fus = []
  constructor(private data:DataService,private popoverController:PopoverController) {
  }
  ngOnInit() {}
  
  async showMenu(){
    const popover = await this.popoverController.create({
      component:PopupkdticketsearchComponent
    })
    await popover.present()
    await popover.onDidDismiss().then(result=>{
      console.log('Resut',result)
      this.data.getTicketByKdticket({kdticket:result.data.data.kdticket},result=>{
        console.log('Result',result)
        this.ticket = result[0]
        this.getFus(result[0])
      })
    })
  }
  async showAdd(){
    const popover = await this.popoverController.create({
      component:PopupaddfuComponent,
      componentProps:{
        id:this.ticket.id,
        kdticket:this.ticket.kdticket,
        clientname:this.ticket.clientname
      }
    })
    await popover.present()
    await popover.onDidDismiss().then(result=>{
      this.data.saveFu(result,res=>{
        console.log('Save Res',res)
        alert(JSON.stringify(res))
      })
    })
  }
  getFus(obj){
    this.data.getFusByKdticket(obj,fus=>{
      console.log('Fus',fus)
      this.fus = fus
    })
  }
}
