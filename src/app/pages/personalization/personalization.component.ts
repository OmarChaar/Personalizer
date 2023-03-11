import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ConstantsService } from './../../services/constants/constants.service';
import { ClearAccount } from './../../state-management/account';
import { Component, OnInit } from '@angular/core';
import { Question, Section } from 'src/app/classes/class';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { SessionStorageService } from 'src/app/services/sessionStorage/session-storage.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs';
import { PromptComponent } from 'src/app/components/prompt/prompt.component';
import { MatDialog } from '@angular/material/dialog';

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
  client$ = this.store.select(state => state.client.client);

  public sections: any[] = [];
  public images: any[] = [];

  public hasErrors = false;

  public total = 0;

  constructor(
    private store: Store,
    private sessionStorageService: SessionStorageService,
    private location: Location,
    private firebaseService: FirebaseService,
    private constantsService: ConstantsService,
    public dialog: MatDialog,
  ) {

    this.constantsService.startLoader();
    this.account$.pipe(first()).toPromise().then((account) => {
      this.sections = account;
      if(this.sections) {
        this.client$.pipe(first()).toPromise().then(client => {

          for(let section of this.sections) {
            for(let question of section.questions) {

              if(client?.choices?.[question.id] != undefined) {
                this.selectOption(client.choices[question.id], question);
              }
            }

            if(section?.images?.length > 0) {
              for(let image of section.images) {
                this.images.push(image);
              }
            }
          }

        })
        this.constantsService.stopLoader();
      }
    })
  }

  ngOnInit(): void {
  }

  userChoices: any = {};

  selectOption(value: any, question: any) {

    let option: any;

    question.choice = value;

    if(question.type == QuestionType.multi) {
      option = question.options[value-1];

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

    if(question?.type == QuestionType.truthy) {
      if(question?.choice == true) {
        // console.log("TRUE");
      }
      else {
        // console.log("FALSE");
      }
    }

    this.userChoices[question.id] = question.choice;

    // console.log("userCHouces", this.userChoices);
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
    for(let i=0; i<this.sections.length; i++) {
      for(let ii=0; ii<this.sections[i].questions.length; ii++) {
        let question = this.sections[i].questions[ii];
        console.log("QUE", question);
        if(question.enabled == true && question.required == true) {
          if(question.choice == undefined) {
            document.getElementById(question.id)?.scrollIntoView({behavior: 'smooth'});
            return false;
          }

        }
      }
    }
    return true;
  }

  save() {
    if(this.verify() == true) {
      this.constantsService.startLoader();
      this.sessionStorageService.set('userChoices', this.userChoices);
      this.client$.pipe(first()).toPromise().then(async (res: any) => {
        let client = res;
        client.choices = this.userChoices;
        await this.firebaseService.save(client);
        this.constantsService.stopLoader();

        const dialogRef = this.dialog.open(PromptComponent, {
          data: {
            message: 'Are you sure you want to delete this image?',
            title: 'Deleting Image'
          }
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          if(result != true) {
            console.log("JESUS");
          }
        });
      })
    }
    else {
      this.hasErrors = true
    }
  }

  goBack() {
    this.store.dispatch(new ClearAccount());
    this.sessionStorageService.clearStorage();
    this.location.back();
  }

}
