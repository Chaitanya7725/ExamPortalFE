import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { BattleService } from '../battle.service';
import { Question } from '../question';
import { QuizService } from '../quiz.service';

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
  answered=0;
  notAnswered=0;
  marked=0;
  notVisited=0;
  @ViewChild('cd1', { static: false }) private nameElementRef!: CountdownComponent;
  config: any;
  public show:boolean = false;
  public buttonName:any = 'Pause';
  quizIdV: any;
  populateQuestionData=[] as any;
  retrievedImage: any;
  clearResponse:any;
  isDisabled: boolean;
  options={
    cqid:0,
    os:0,
    quizId:0
  };
  // p=  {
  //   id:0,
  //   question:"",
  //   mark:0,
  //   quiz:{},
  //   option1:"",
  //   option2:"",
  //   option3:"",
  //   option4:"",
  //   correctOption:0
  // };
  quizDetails:any;
  time:number=0;
  question:Question=new Question();
  optionSelected: number=0;
  questionId: number=0;
  battleImage: any;
  base64Data: any;
  nextIndex: any;
  constructor(private service:BattleService,
    private route: ActivatedRoute,
    private quiz:QuizService,
    private router: Router) {
      this.route.params.subscribe(params=>this.quizIdV=params.id);  
      this.isDisabled=false;
      this.service.getQuestionsCount(this.quizIdV).subscribe(
        (params)=>{
          this.numbers=params;
          this.passCurrentQuestionId(parseInt(this.numbers[0]));
      });
    }
  
  ngOnInit(): void {
    this.quiz.getQuizById(this.quizIdV).subscribe(
      params=> {
        this.quizDetails=params;
        this.quizDetails=JSON.parse(this.quizDetails);
        this.config={ leftTime:(this.quizDetails.time)*60};
    });
  }
  // ngAfterContentInit(){
  //   console.log("ngAfterContentInit")
  //   this.setLeftTime();
  // }

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
    this.clear();
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

  passCurrentQuestionId(i:number){
    this.questionId=i;
    // if((this.numbers.length-1)== this.numbers.indexOf(i) ){
    //   this.isDisabled =true;
    // }else{
    //   this.isDisabled=false;
    // }
    this.getQuestionById(i);
  }

  saveAnswer(){
    this.options.cqid=this.questionId;
    if(this.optionSelected==0){
      this.options.os=0;
    } else if(this.optionSelected>0){
      this.options.os=this.optionSelected;
    } else{
      this.options.os=this.populateQuestionData.selectedOption;
    }
    // this.options.os=this.optionSelected || this.populateQuestionData.selectedOption;
    this.options.quizId=this.quizIdV;
    console.log(this.populateQuestionData.selectedOption+" "+this.optionSelected);
    // if(this.options.os !=NaN && this.populateQuestionData.selectedOption!=this.options.os){
    if(this.options.os!=NaN && this.options.os!=undefined){
      console.log("calling api ");
      this.service.saveAnswer(this.options).subscribe();
    }

    var currentIndex=this.numbers.indexOf(this.questionId);
    if((this.numbers.length-1)==currentIndex){
      this.nextIndex=0;
    }else if(currentIndex<this.numbers.length){
      this.nextIndex=currentIndex+1;
    }
    this.passCurrentQuestionId(this.numbers[this.nextIndex]);
    this.clear();
  }

  optionSel(event:any){
    // console.log(event.target.value);
    this.optionSelected=event.target.value;
  }
  clear(){
    this.clearResponse=false;
    this.options.os=0;
    this.populateQuestionData.selectedOption="";
  }

  handleEvent(event:any){
    if(event.left==0){
      setInterval(() => {},1000)
      this.router.navigate(['/dashboard']);
    }
  }

  // getQuizDetails(){
  //   this.quiz.getQuizById(this.quizIdV).subscribe(
  //     params=> {
  //       this.quizDetails=params;
  //       this.quizDetails=JSON.parse(this.quizDetails);
  //   });
  // }

  // setLeftTime(){
  //   this.config={ leftTime: (this.quizDetails.time)*60 };
  // }

}


