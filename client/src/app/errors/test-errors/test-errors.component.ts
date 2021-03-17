import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = "https://localhost:5001/api/";
  validationErrors: string[] = []

  token = JSON.parse(localStorage.getItem('user'))["token"]
 
  headersDict = {
    "Authorization": "Bearer " + this.token,
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.token)

  }
  getError(endpoint){
    const url = this.baseUrl + endpoint;
    const requestHeaders = {
      headers: new HttpHeaders(this.headersDict)
    }
    this.http.get(url, requestHeaders).subscribe(r=>{
      console.log(r);
    }, err => {
      console.log(err);
    })
  }
  get404Error(){
    this.getError("buggy/not-found");
  }
  get500Error(){
    this.getError("buggy/server-error");
  }
  get400Error(){
    this.getError("buggy/bad-request");
  }
  get401Error(){
    this.getError("buggy/auth");
  }
  get400ValidationError(){
    const url = this.baseUrl + "account/register";
    const requestHeaders = {  
      headers: new HttpHeaders(this.headersDict)
    }
    this.http.post(url, requestHeaders,{}).subscribe(r=>{
      console.log(r);
    }, err => {
      console.log(err);
      this.validationErrors = err;
    })
  }
}
