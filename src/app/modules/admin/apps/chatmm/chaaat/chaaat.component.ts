import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-chaaat',
  templateUrl: './chaaat.component.html',
  styleUrls: ['./chaaat.component.scss']
})
export class ChaaatComponent implements OnInit {

  username = 'username';
  message='';
  messages=[]

  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('0c393b681dfba8a636d6', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('messages', data => {
      this.messages.push(data);
    });
  }

  submit(): void{

    this.http.post('http://localhost:61860/api/chat',{ username:this.username , message:this.message}).subscribe(()=> this.message='');

  }

}