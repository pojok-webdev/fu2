import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popupkdticketsearch',
  templateUrl: './popupkdticketsearch.component.html',
  styleUrls: ['./popupkdticketsearch.component.scss'],
})
export class PopupkdticketsearchComponent implements OnInit {
  kdticket = ""

  constructor(private popover: PopoverController) { }
  ngOnInit() {}
  close(){
    this.popover.dismiss({data:{kdticket:this.kdticket},role:'test'})
  }
  fillTicket(x){
    this.kdticket = x
  }
  selectall(){
    
  }
}
