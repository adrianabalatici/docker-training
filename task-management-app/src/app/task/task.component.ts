import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const SERVER_URL = 'http://localhost:3000/task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  task: string = '';
  tasks: any[] = [];
  constructor(private http: HttpClient) { }

  getTasks() {
    const headers = new HttpHeaders({
      // 'Referrer-Policy': 'no-referrer-when-downgrade',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    // @ts-ignore
    this.http.get(SERVER_URL, {headers})
      .subscribe((tasks: any) => {
        this.tasks = tasks;
      });
  }

  postTask() {
    const headers = new HttpHeaders({
      // 'Referrer-Policy': 'no-referrer-when-downgrade',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    this.http.post(SERVER_URL, { title: this.task }, {headers})
      .subscribe(response => {
        console.log(response);
        this.getTasks();
      });
  }
}
