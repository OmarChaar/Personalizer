import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {

  public message: any;
  public title: any;
  public isDanger = false;

  constructor(
    public dialogRef: MatDialogRef<PromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if(this.data?.message) {
      this.message = this.data.message;
    }
    if(this.data?.title) {
      this.title = this.data.title;
    }
    if(this.data?.isDanger) {
      this.isDanger = this.data.isDanger;
    }
  }

}
