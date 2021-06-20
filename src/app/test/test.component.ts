import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { BattleService } from '../battle.service';
import { BattleComponent } from '../battle/battle.component';
import { QuizService } from '../quiz.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  numbers=[] as any;
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

  constructor(private service:BattleService,
    private route: ActivatedRoute,
    private no:BattleComponent) {
    this.route.params.subscribe(params=>this.quizIdV=params.id);
    this.getCountofIds(this.quizIdV);
  }

  getCountofIds(id:number) {
    this.service.getQuestionsCount(id).subscribe(
      (params)=>{
        // this.numbers=params;
        this.no.numbers1=params;

      }
    );
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
  
  ngOnInit(): void {
    // this.route.params.subscribe(params=>this.quizIdV=params.id);
  }

}
