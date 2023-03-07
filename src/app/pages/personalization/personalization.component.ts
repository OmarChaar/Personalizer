import { ClearAccount } from './../../state-management/account';
import { Component, OnInit } from '@angular/core';
import { Question, Section } from 'src/app/classes/class';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { SessionStorageService } from 'src/app/services/sessionStorage/session-storage.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export enum QuestionType {
  multi = 'multi',
  truthy = 'truthy'
}

@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.css']
})

export class PersonalizationComponent implements OnInit {

  account$ = this.store.select(state => state.account.account);

  public sections: any[] = [];

  public verifying = false;

  public nodeJS_host = 'http://localhost:3000';

  public total = 0;

  constructor(
    private store: Store,
    private sessionStorageService: SessionStorageService,
    private location: Location
  ) {

    if(this.sessionStorageService.getSessionStorage('sections')) {
      this.sections = this.sessionStorageService.getSessionStorage('sections');
    }
    else {
      this.account$.subscribe((account) => {
        console.log("addoc", account);
        this.sections = account;
      })

    }

    // this.http.get(`${this.nodeJS_host}/getData`).subscribe((data: any) => {

    //   for(let i=0; i<data.length; i++) {
    //     let tempQuestion: any[] = [];
    //     const question = data[i].questions;

    //     for(let ii=0; ii<question.length; ii++) {
    //       console.log("question[ii].options", question[ii].options);
    //       tempQuestion.push(new Question(
    //         question[ii].id,
    //         question[ii].sectionID,
    //         question[ii].displayLabel,
    //         question[ii].options,
    //         question[ii].type == 0 ? QuestionType.numbered : QuestionType.truthy,
    //         question[ii].required,
    //         question[ii].enabled,
    //         question[ii].parentOf,
    //         question[ii].childOf,
    //       ))
    //     }

    //     this.sections.push(new Section(
    //       data[i].id,
    //       data[i].label,
    //       tempQuestion
    //     ))
    //   }

    //   console.log(this.sections);
    // });
  }

  ngOnInit(): void {
  }

  selectOption(event: any, question: any) {
    // console.log("selectOption", question);
    let option: any;

    question.choice = event.value;

    if(question.type == QuestionType.multi) {
      option = question.options[event.value-1];

      question.price = option.price;

      question.link = option.link,
      question.error = false;
      question.name = option.name;

      this.calculate();
    }
    question.error = false;

    if(question?.parentOf) {
      let child = this.findChild(question.parentOf);
      if(child) {
        child.enabled = true;
      }
    }

    if(question?.childOf) {
      if(question.choice.toUpperCase() == 'S') {

      }
      else if(question.choice.toUpperCase() == 'N') {

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

  calculate() {
    let total = 0;
    for(let i=0; i<this.sections.length; i++) {
      let currentSectionQuestions = this.sections[i].questions;

      for(let ii=0; ii<currentSectionQuestions.length; ii++) {
        if(currentSectionQuestions[ii].price) {
          total += Number(currentSectionQuestions[ii].price);
        }
      }
    }

    this.total = total;
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

  goBack() {
    this.store.dispatch(new ClearAccount());
    this.sessionStorageService.clearStorage();
    this.location.back();
  }

}
