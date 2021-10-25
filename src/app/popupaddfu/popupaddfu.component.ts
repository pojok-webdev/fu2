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
    conclusion:'',
    username:''
  }
  constructor(private popover: PopoverController,private data: NavParams) {
    this.ticket_id = this.data.get('id')
    this.fu.ticket_id = this.data.get('id')
    this.fu.username = this.data.get('username')
  }

  ngOnInit() {}
  saveFu(){
    //alert(JSON.stringify(this.fu))
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
    console.log('INPUT',field,value)
    this.fu[field] = value
  }
  check(x){
    let arr = (x.detail.value).toString().split('T')
    let dt = arr[0]
    let tm = arr[1]
    console.log('dt',dt)
    console.log('tm',tm)
    console.log('x detail',x.detail.value)
    console.log('fu',JSON.stringify(arr[0]))
    this.fu.followupDate = dt
  }
}
