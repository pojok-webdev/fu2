import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popupaddfu',
  templateUrl: './popupaddfu.component.html',
  styleUrls: ['./popupaddfu.component.scss'],
})
export class PopupaddfuComponent implements OnInit {
  ticket_id 
  fu = {
    ticket_id:0,
    followupDate:'',
    picname:'',
    picphone:'',
    result:'',
    description:'',
    conclusion:''
  }
  constructor(private popover: PopoverController,private data: NavParams) {
    this.ticket_id = this.data.get('id')
    this.fu.ticket_id = this.data.get('id')
  }

  ngOnInit() {}
  saveFu(){
    this.popover.dismiss({
      result:"ok",
      data:this.fu
    })
  }
  closePopup(){
    this.popover.dismiss({
      result:"closed"
    })
  }
  setinput(field,value){
    this.fu[field] = value
  }
}
