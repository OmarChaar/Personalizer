import { Component, OnInit } from '@angular/core';
import { Question, Section } from 'src/app/classes/class';
import { HttpClient } from '@angular/common/http';

export enum QuestionType {
  numbered = 0,
  truthy = 1
}

@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.css']
})
export class PersonalizationComponent implements OnInit {

  public choicesMain = [
    { label: '1', value: '1',  },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' }
  ];

  public choicesSub = [
    { label: 'SIM', value: 'S', },
    { label: 'NÃO', value: 'N' },
  ]

  public questions: any[] = [];
  public obj: any = {};

   public sections: any[] = [];

  public verifying = false;

  constructor(
    private http: HttpClient
  ) {

    this.http.get('http://localhost:3000/getData').subscribe((data: any) => {
      console.log(data);

    });

    // delete once retrieved from DB
    for(let x=0; x<3; x++) {
      let tempQuestion: any[] = []
      for(let i=0; i<10; i++) {
        tempQuestion.push(new Question(
          `question-${x+1}-${i+1}`,
          `question-${x+1}`,
          `Option ${i+1}`,
          (i%2 == 0 ? this.choicesMain : this.choicesSub),
          (i%2 == 0 ? QuestionType.numbered : QuestionType.truthy),
          true,
          (i%2 == 0 ? true : false),
          (i%2 == 0 ? `question-${x+1}-${i+2}` : undefined),
        ))
      }

      for(let i=10; i<12; i++) {
        tempQuestion.push(new Question(
          `question-${x+1}-${i+1}`,
          `question-${x+1}`,
          `Option ${i+1}`,
          this.choicesMain,
          QuestionType.numbered,
          true,
          true
        ))
      }

      this.sections.push(new Section(
        `section${x+1}`,
        `Section ${x+1}`,
        tempQuestion
      ))
    }
  }

  ngOnInit(): void {
  }

  selectOption(event: any, question: any) {

    // get price fron DB
    question.option = event.value;
    question.price = '5000';
    question.link = 'https://www.google.com/',
    question.error = false;
    question.name = 'Name Da Opcão';


    if(question?.parentOf) {
      let child = this.findChild(question.parentOf);
      if(child) {
        child.enabled = true;
      }
    }
  }

  findChild(id: any) {
    for(let i=0; i<this.sections.length; i++) {
      let currentSectionQuestions = this.sections[i].questions;

      for(let ii=0; ii<currentSectionQuestions.length; ii++) {
        if(currentSectionQuestions[ii].id == id) {
          return currentSectionQuestions[ii];
        }
      }
    }
    return undefined;
  }


  verify() {
    this.verifying = true;

    for(let i=0; i<this.sections.length; i++) {
      for(let ii=0; ii<this.sections[i].questions.length; ii++) {
        let question = this.sections[i].questions[ii];
        if(question.error == true && question.enabled == true) {
          document.getElementById(question.id)?.scrollIntoView({behavior: 'smooth'});
          return false;
        }
      }
    }
    return true;
  }

  save() {
    if(this.verify() == true) {

    }
    else {

    }
  }

}
