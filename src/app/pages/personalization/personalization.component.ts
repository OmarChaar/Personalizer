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

  public sections: any[] = [];

  public verifying = false;

  public nodeJS_host = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {

    this.http.get(`${this.nodeJS_host}/getData`).subscribe((data: any) => {
      console.log(data);
      for(let i=0; i<data.length; i++) {
        let tempQuestion: any[] = [];
        const question = data[i].questions;
        for(let ii=0; ii<question.length; ii++) {
          console.log(question[ii])
          tempQuestion.push(new Question(
            question[ii].id,
            question[ii].sectionID,
            question[ii].label,
            question[ii].options,
            question[ii].type == 0 ? QuestionType.numbered : QuestionType.truthy,
            question[ii].required,
            question[ii].enabled
          ))
        }

        this.sections.push(new Section(
          data[i].id,
          data[i].label,
          tempQuestion
        ))
      }
    });
  }

  ngOnInit(): void {
  }

  selectOption(event: any, question: any) {
    const option = question.options[event.value-1];

    question.choice = event.value;
    question.price = option.price;
    question.link = option.link,
    question.error = false;
    question.name = option.name;


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
