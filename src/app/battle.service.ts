import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  API: string = "http://localhost:8080/question";
  constructor(private http:HttpClient) { }

  public getQuestionsCount(id:number): Observable<any>{
    return this.http.get(this.API+"/count/"+id);  
  }

  public getQuestionById(id: number) {
    return this.http.get(this.API+"/"+id);
  }

  public saveAnswer(options: { cqid: any; os: any; }) {
    return this.http.post(this.API+"/answer",options,{responseType:'text' as 'json'});
  }
}
