import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppserverService {
  server = 'http://192.168.0.117:20214'
  serverx = 'http://192.168.8.49:20214'
  constructor() { }
}
