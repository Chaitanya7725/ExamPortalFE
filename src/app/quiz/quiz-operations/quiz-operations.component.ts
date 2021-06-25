import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/question';
import { Quiz } from 'src/app/quiz';
import { QuizService } from '../../quiz.service';

@Component({
  selector: 'app-quiz-operations',
  templateUrl: './quiz-operations.component.html',
  styleUrls: ['./quiz-operations.component.css']
})
export class QuizOperationsComponent implements OnInit {
  quiz:Quiz=new Quiz();
  question:Question=new Question();
  message:any;
  questionToUpdate={
    id:0,question:"",mark:0,quiz:{id:0},option1:"",option2:"",option3:"",option4:"",correctOption:"",imageName:""
  };
  quizIdV:any;

  selectedFile!: File;
  retrievedImage: any;
  retrievedImages: string[] =[];
  retrievedImagesWithName= Array<{ id: number; imageName: string;picByte:string }>();

  base64Data: any;
  retrieveResonse: any;
  imageMessage: string="";
  imageName: any;

  constructor(
    private service:QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    ) {}
  status:String="";
  output!: JSON;
  obj: any ={
    'id':0
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>this.quizIdV=params.id);
    this.obj['id']=this.quizIdV;
    this.passId()
    if(this.quizIdV!=undefined){
      this.getQuestionByQuizId();
    }
    this.getAllImages();
  }

  public passId(){
    this.question.quiz=this.obj;
  }

  public addQuiz(){
    if(this.quiz!=null){
      let resp=this.service.addQuiz(this.quiz);
      resp.subscribe((data:any)=>{this.message=data})
      this.status="Quiz added";
      this.router.navigate(['/quiz']);
    }
  }

  public deleteQuiz(id:number){
    let resp=this.service.deleteQuiz(id);
    resp.subscribe((data)=>this.message=data);
  }

  addQuestion(){
    let resp=this.service.addQuestion(this.question);
    resp.subscribe((data:any)=>{this.message=data})
    this.status="Question added";
    this.router.navigate(['addQuestion/'+this.quizIdV]);
  }

  getSelectedDropdown(event:any){
    this.question.correctOption=event.target.value;
  }

  public deleteQuestion(id:number){
    let resp=this.service.deleteQuestion(id,this.quizIdV);
    resp.subscribe((data)=>this.message=data);
  }

  getQuestionList() {
    this.service.getQuestionList().subscribe((data)=>{this.message=data});
  }

  getQuestionByQuizId(){
    this.service.getQuestionByQuizId(this.quizIdV).subscribe((data)=>{this.message=data});
  }

  public populateQuestion(question:any){
    this.questionToUpdate=question;
  }
  public editQuestion(question:any){
    this.populateQuestion(question);
    let resp=this.service.editQuestion(this.questionToUpdate);
    resp.subscribe((data)=>this.message=data);
    // this.router.navigate(['/quiz']);
  }

  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.service.uploadImage(uploadImageData).subscribe(
      (response)=>{
        this.imageMessage=String(response);
      }
    );
  }

  getImage() {
    this.service.getImage(this.imageName)
      .subscribe(
        (response: any) => {
          this.retrieveResonse = response;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
    );
  }

  getAllImages(){
    var type='data:image/jpeg;base64,'
    this.service.getAllImages().subscribe(
      (response:any)=>{
        response.forEach((element: any) => {
          this.retrieveResonse = element;
          this.retrievedImagesWithName.push({
            id:element.id,
            imageName:element.name,
            picByte:'data:image/jpeg;base64,'+element.picByte
          });
        });
      }
    );
  }

  updateOption(event:any){
    this.question.imageName=event.target.value;
  }
}
