import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppserverService {
  server = 'https://database.padinet.com:20214'
  constructor() { }
}
