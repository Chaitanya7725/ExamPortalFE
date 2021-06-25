import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { BattleService } from '../battle.service';
import { Question } from '../question';
import { QuizService } from '../quiz.service';
import { QuizOperationsComponent } from '../quiz/quiz-operations/quiz-operations.component';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  numbers=[] as any;
  numbers1=[] as any;
  arr = [] as any;
  name='Chaitanya';
  answered=10;
  notanswered=15;
  marked=3;
  notvisited=14;
  @ViewChild('cd1', { static: false })
  private nameElementRef!: CountdownComponent;
  public show:boolean = false;
  public buttonName:any = 'Pause';
  quizIdV: any;
  populateQuestionData=[] as any;
  retrievedImage: any;
  p=  {
    id:0,
    question:"",
    mark:0,
    quiz:{},
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    correctOption:0
  };
  question:Question=new Question();
  optionSelected: any;
  currentQuestionId: number=0;
  options={
    cqid:0,
    os:0
  };
  battleImage: any;
  base64Data: any;

  constructor(private service:BattleService,
    private route: ActivatedRoute,
    private quiz:QuizService) {
      this.route.params.subscribe(params=>this.quizIdV=params.id);
      this.service.getQuestionsCount(this.quizIdV).subscribe(
        (params)=>{
          this.numbers=params;
          this.getQuestionById(parseInt(this.numbers[0]));
        });
    }
  
  ngOnInit(): void {}

  toggle() {
    this.show = !this.show;
    if(this.show) {
      this.buttonName = "Resume";
      this.nameElementRef.pause();
    }
    else{
      this.buttonName = "Pause";
      this.nameElementRef.begin();
    }
  }

  getCountofIds(id:number) {
    this.service.getQuestionsCount(id).subscribe(
      (params)=>{
        this.numbers=params
      });
  }

  getQuestionById(optionalParams:number){
    this.retrievedImage="";
    this.service.getQuestionById(optionalParams).subscribe(
      (params)=>{
        this.populateQuestionData=params;
        if(this.populateQuestionData.imageName!="" && this.populateQuestionData.imageName!=null && this.populateQuestionData.imageName!=undefined){
          this.quiz.getImage(this.populateQuestionData.imageName)
          .subscribe(
            (response: any) => {
              this.battleImage = response;
              this.base64Data = this.battleImage.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            }
          );
        }
      }
    );
  }

  index(i:number){
    this.currentQuestionId=i;
    this.getQuestionById(i);
  }

  saveAnswer(){
    this.options={
      cqid:this.numbers[this.currentQuestionId],
      os:Number.parseInt(this.optionSelected)
    };
    if(this.options.os!=null){
      this.service.saveAnswer(this.options).subscribe();
    }

    var nextIndex=this.numbers.indexOf(this.currentQuestionId);
    if(nextIndex<this.numbers.length){
      this.index(this.numbers[nextIndex+1]);
      this.optionSelected=false
    }
  }

  optionSel(event:any){
    this.optionSelected=event.target.value;
  }

}


