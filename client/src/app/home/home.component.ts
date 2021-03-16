import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  registerMode: boolean = false;
  users: any;


  constructor() { }

  ngOnInit(): void {
  }

  registerToggle(){
    this.registerMode = true;
  }


  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

}
