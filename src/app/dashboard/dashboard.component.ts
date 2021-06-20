import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: any;

  constructor(private service:QuizService) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.service.getQuizList().subscribe((data)=>{this.message=data});
  }

}
