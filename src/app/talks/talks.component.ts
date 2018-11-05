import { Component, OnInit } from '@angular/core';
import { Talk } from '../models/talk.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent implements OnInit {
  private _talks = new Array<Talk>();
  talk: FormGroup;
  file: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.talk = this.fb.group({
      length: [null, [Validators.required]],
      title: [null, [Validators.required, Validators.minLength(2)]]
    });
  }

  // TODO IS THIS NEEDED?
  get talks() {
    return this._talks;
  }

  openAddTalk() {
    // this.talk.reset();
    // $('.ui.modal.addTalk').modal('show');
  }

  addTalk() {
  if (this.talk.valid) {
      const talk = new Talk(this.talk.value.title, this.talk.value.length);
      this._talks.push(talk);
      this.talk.reset();
    }
  }
  // readTxt() {
  //   console.log('Hi');
  // }

  fileChanged(e) {
    this.file = e.target.files[0];
  }

  readTxt() {
    // TODO RD: https://stackoverflow.com/questions/4416425/how-to-split-string-with-some-separator-but-without-removing-that-separator-in-j
    const fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   console.log(fileReader.result);
    // };
    fileReader.onload = (event) => {
      const file = event.target.result;
      const allLines = file.split(/\r\n|\n/);
      // Reading line by line
      allLines.forEach((line) => {
        // const talk = new Talk(line, 50);
        // this._talks.push(talk);
        // const titleNumber = line.split(/(?=[0-9]')/);
        // const titleNumber = line.split(/[0-9](.+)/, 2);
        const talkArray = line.split(/(?=[0-9])(.+)|lightning/, 2);
        console.log(talkArray);
        let talk;
        if (talkArray[1] === undefined) {
          talk = new Talk(talkArray[0], 5);
        } else {
          talk = new Talk(talkArray[0], parseInt(talkArray[1], 10));
        }
        this._talks.push(talk);
      });
    };
    fileReader.readAsText(this.file);
  }
}
