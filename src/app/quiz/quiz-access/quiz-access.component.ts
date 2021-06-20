import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../../quiz';
import { QuizService } from '../../quiz.service';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-quiz-access',
  templateUrl: './quiz-access.component.html',
  styleUrls: ['./quiz-access.component.css']
})
export class QuizAccessComponent implements OnInit {
  checkOutForm!: FormGroup;
  itemsArray!:FormArray;
  message: any;
  quiz:Quiz= new Quiz();
  quizToUpdate={
    id:0,
    name:"",
    time:0,
    description:"",
    threshold:0
  };
  constructor(
    private service:QuizService,
    private router: Router,
    private formBuilder:FormBuilder
    ) { 
      // this.checkOutForm=new FormGroup({
      //   exampleInputName1:new FormControl(),
      //   exampleInputTime1:new FormControl(),
      //   exampleInputNumber1:new FormControl()
      // })

      // this.checkOutForm=formBuilder.group({
      //   exampleInputName1:['',Validators.required],
      //   exampleInputTime1:['',Validators.required],
      //   exampleInputNumber1:['',Validators.required],
        // items:this.formBuilder.array([
        //   itemId1:['1'],
        //   itemName:['2'],
        //   itemDesc:['3'],
        //   itemDone:['1'],
        // ])
      // })
    }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.service.getQuizList().subscribe((data)=>{this.message=data});
  }

  public deleteQuiz(id:number){
    let resp=this.service.deleteQuiz(id);
    resp.subscribe((data)=>this.message=data);
  }

  public populateQuiz(quiz:any){
    this.quizToUpdate=quiz;
  }
  public editQuiz(quiz:any){
    this.populateQuiz(quiz);
    let resp=this.service.editQuiz(this.quizToUpdate);
    resp.subscribe((data)=>this.message=data);
    // this.router.navigate(['/quiz']);
  }

}
