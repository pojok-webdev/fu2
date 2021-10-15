import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popupaddfu',
  templateUrl: './popupaddfu.component.html',
  styleUrls: ['./popupaddfu.component.scss'],
})
export class PopupaddfuComponent implements OnInit {
  ticket_id 
  constructor(private popover: PopoverController,private data: NavParams) {
    this.ticket_id = this.data.get('ticket_id')
  }

  ngOnInit() {}
  saveFu(){
    this.popover.dismiss({
      result:'ok'
    })
  }
  closePopup(){
    this.popover.dismiss({
      result:'closed'
    })
  }
}
