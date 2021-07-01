import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
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
  quizDetails:any;
  quizDetailsStatus:any;
  time:number=0;
  question:Question=new Question();
  optionSelected: number=0;
  questionId: number=0;
  battleImage: any;
  base64Data: any;
  nextIndex: any;
  isCalled: boolean=false;
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
  
  passCurrentQuestionId(i:number){
    this.questionId=i;
    // if((this.numbers.length-1)== this.numbers.indexOf(i) ){
    //   this.isDisabled =true;
    // }else{
    //   this.isDisabled=false;
    // }
    this.getQuestionById(i);
  }

  getQuestionById(optionalParams:number){
    this.retrievedImage="";
    this.clearAfterClickingIndex();
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
    this.getQuizDetails();
  }

  saveAnswer(){
    this.options.cqid=this.questionId;
    if(this.populateQuestionData.selectedOption>0 && this.isCalled){
      console.log("If");
      if(this.isCalled){
        console.log("If If "+this.isCalled);
        this.options.os=this.optionSelected;
      }else{
        console.log("If else "+this.isCalled);
        this.options.os=this.populateQuestionData.selectedOption;
      }
    }else{
      console.log("Else");
      if(this.isCalled){
        console.log("Else if "+this.isCalled);
        this.options.os=this.optionSelected;
      }else{
        console.log("Else else "+this.isCalled);
        this.options.os=this.populateQuestionData.selectedOption;
      }
    }
    // this.options.os=this.optionSelected || this.populateQuestionData.selectedOption;
    this.options.quizId=this.quizIdV;
    // if(this.options.os !=NaN && this.populateQuestionData.selectedOption!=this.options.os){
    if(this.options.os!=NaN && this.options.os!=undefined){
      console.log("SelectedOption "+this.populateQuestionData.selectedOption);
      console.log("calling api "+JSON.stringify(this.options));
      this.service.saveAnswer(this.options).subscribe();
    }

    var currentIndex=this.numbers.indexOf(this.questionId);
    if((this.numbers.length-1)==currentIndex){
      this.nextIndex=0;
    }else if(currentIndex<this.numbers.length){
      this.nextIndex=currentIndex+1;
    }
    console.log(this.nextIndex);
    this.passCurrentQuestionId(this.numbers[this.nextIndex]);
    this.clear();
    this.isCalled=false;
    // console.log("--------------------------------------------")
  }

  optionSel(event:any){
    this.isCalled=true;
    this.optionSelected=event.target.value;
  }
  clearAfterClickingIndex(){
    this.clearResponse=false;
  }
  clear(){
    this.clearResponse=false;
    this.isCalled=true;
    this.optionSelected=0;
    this.populateQuestionData.selectedOption=5;
  }

  handleEvent(event:any){
    if(event.left==0){
      setInterval(() => {},1000)
      this.router.navigate(['/dashboard']);
    }
  }

  getQuizDetails(){
    this.quiz.getQuizById(this.quizIdV).subscribe(
      params=> {
        this.quizDetailsStatus=params;
        this.quizDetailsStatus=JSON.parse(this.quizDetailsStatus);
        this.quizDetails.answered=this.quizDetailsStatus.answered;
        this.quizDetails.notAnswered=this.quizDetailsStatus.notAnswered;

        console.log("2 details "+JSON.stringify(this.quizDetailsStatus));
    });
  }

  // setLeftTime(){
  //   this.config={ leftTime: (this.quizDetails.time)*60 };
  // }

}


