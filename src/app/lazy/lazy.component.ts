import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { DataService }  from './../services/data.service'
@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
})
export class LazyComponent implements OnInit {
@ViewChild(IonInfiniteScroll) infiniteScroll:IonInfiniteScroll
data 
messages
constructor(private ticket: DataService) {
  this.ticket.getTickets(tickets=>{
      this.messages = tickets
  })
  console.log('Data',this.data)
}
  loadData(event){
    setTimeout(()=>{
      console.log('done',event)
      event.target.complete()
      if(this.data.length ===1000){
        event.target.disabled = true
      }
    },500)

  }
  toggleInfiniteScroll(){
    console.log('toggled')
    //this.infiniteScroll.disabled = !this.infiniteScroll.disabled

  }
  ngOnInit() {}
  getTickets(){
    this.ticket.getTickets(tickets=>{
      this.messages = tickets
    })
  }
}
