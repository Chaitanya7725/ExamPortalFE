import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  API="http://localhost:8080";
  APIQuestion="http://localhost:8080/question";

  public addQuiz(quiz: any) {
    return this.http.post(this.API+"/add",quiz,{responseType:'text' as 'json'});
  }

  public getQuizList(): Observable<any>{
    return this.http.get(this.API+"/getlist");  
  }

  public deleteQuiz(id: number) {
    return this.http.delete(this.API+"/"+id);
  }

  public getQuizById(id: number) {
    return this.http.get(this.API+"/"+id,{responseType:'text' as 'json'});
  }

  editQuiz(quizToUpdate: { id: number; name: string; time: number; description: string; threshold: number; }) {
    return this.http.put(this.API+"/update",quizToUpdate,{responseType:'text' as 'json'});
  }

  addQuestion(question: any) {
    return this.http.post(this.APIQuestion+"/add",question,{responseType:'text' as 'json'});
  }

  public getQuestionList(): Observable<any>{
    return this.http.get(this.APIQuestion+"/getlist");  
  }

  getQuestionByQuizId(quizIdV:number) {
    return this.http.get(this.APIQuestion+"/getlistById/"+quizIdV); 
  }

  public deleteQuestion(id: number,quizId:number) {
    return this.http.delete(this.APIQuestion+"/"+id+"/"+quizId);
  }

  public getQuestionById(id: number) {
    return this.http.get(this.APIQuestion+"/"+id,{responseType:'text' as 'json'});
  }

  editQuestion(questionToUpdate: { id: number; question: string; mark: number; }) {
    return this.http.put(this.APIQuestion+"/update",questionToUpdate,{responseType:'text' as 'json'});
  }

}
