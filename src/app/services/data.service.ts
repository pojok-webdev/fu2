import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { HTTP } from '@ionic-native/http/ngx'
import { AppserverService } from '../appserver.service';
export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '9:32 AM',
      id: 0,
      read: false
    },
    {
      fromName: '201510001',
      subject: 'Asri Motor Group',
      date: '6:12 AM',
      id: 1,
      read: false
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      read: false
    },
    {
      fromName: 'Bill Thomas',
      subject: 'The situation',
      date: 'Yesterday',
      id: 3,
      read: false
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      read: false
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      read: false
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      read: false
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      read: false
    }
  ];
  obj: Observable<any>
  constructor(
    private http: HttpClient, 
    private nhttp: HTTP,
    private appserver:AppserverService
    ) {
    this.obj = http.get(this.appserver.server+'/gettickets')
    this.obj.subscribe(
      success=>{
        console.log('Success',success)
        this.messages = success
      },
      error=>{
        console.log('Error',error)
      }
    )
  }
  public getTickets(callback){
    this.obj = this.http.get(this.appserver.server+'/gettickets')
    this.obj.subscribe(
      success=>{
        console.log('Success',success)
        callback(success)
      },
      error=>{
        console.log('Error',error)
      }
    )
  }
  public getTicketByKdticket(obj,callback){
    this.obj = this.http.get(this.appserver.server+'/getticketbykdticket/'+obj.kdticket)
    this.obj.subscribe(
      success=>{
        callback(success)
      },
      error=>{
        console.log('Error',error)
        callback(error)
      }
    )
  }
  public getFusByKdticket(obj,callback){
    this.obj = this.http.get(this.appserver.server+'/getfusbykdticket/'+obj.kdticket)
    this.obj.subscribe(
      res=>{
        callback(res)
      },
      err=>{
        callback(err)
      }
    )
  }
  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }
  public getticket(obj,callback){
    this.nhttp.get(this.appserver.server+'/getticketbykdticket/'+obj.kdticket,{},{})
    .then(res=>{
      callback(res)
    })
    .catch(err=>{
      alert(JSON.stringify(err))
      callback(err)
    })
  }
  public getfus(obj,callback){
    this.nhttp.get(this.appserver.server+'/getfusbykdticket/'+obj.kdticket,{},{})
    .then(res=>{
      callback(res)
    })
    .catch(err=>{
      alert(err.status)
      alert(err.error)
      alert(err.headers)
      callback(err)
    })
  }
  public saveFu(obj,callback){
    this.obj = this.http.post<any>(this.appserver.server+'/savefu',obj)
    this.obj.subscribe(
      res=>{
        callback(res)
      },
      err=>{
        callback(err)
      }
    )
  }
  public saveMobile(obj,callback){
    this.obj = this.http.post<any>(this.appserver.server+'/savemobile',obj)
    this.obj.subscribe(
      res=>{
        callback(res)
      },
      err=>{
        callback(err)
      }
    )
  }
  public getUsers(callback){
    this.obj = this.http.get(this.appserver.server+'/getusers')
    this.obj.subscribe(
      res=>{
        callback(res)
      },
      err=>{
        callback(err)
      }
    )
  }
}
