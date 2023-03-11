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
  public images: any[] = [];

  public verifying = false;

  public nodeJS_host = 'http://localhost:3000';

  public total = 0;

  constructor(
    private store: Store,
    private sessionStorageService: SessionStorageService,
    private location: Location
  ) {

    if(this.sessionStorageService.get('client')) {
      console.log("CCCLIENT", this.sessionStorageService.get('client'));
    }

    if(this.sessionStorageService.get('sections')) {
      this.sections = this.sessionStorageService.get('sections');
    }
    else {
      this.account$.subscribe((account) => {
        console.log("addoc", account);
        this.sections = account;
      })
    }

    if(this.sections) {
      console.log("SECTIONS", this.sections);
      for(let section of this.sections) {
        if(section?.images?.length > 0) {
          for(let image of section.images) {
            this.images.push(image);
          }
        }
      }

    }

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
