import { Component, OnInit } from '@angular/core';
import { Talk } from '../models/talk.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Track} from '../models/track.model';
let _ = require('lodash');

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent implements OnInit {
  private _talks = new Array<Talk>();
  talk: FormGroup;
  file: any;
  private _trackOne = new Track;
  private _trackTwo = new Track;

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

  get trackOne() {
    return this._trackOne;
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

  //     The conference has multiple tracks each of which has a morning and afternoon session.
  //     Each session contains multiple talks.
  //     Morning sessions begin at 9am and must finish by 12 noon, for lunch.
  //     Afternoon sessions begin at 1pm and must finish in time for the networking event.
  //     The networking event can start no earlier than 4:00 and no later than 5:00.
  //     No talk title has numbers in it.
  //     All talk lengths are either in minutes (not hours) or lightning (5 minutes).
  //     Presenters will be very punctual; there needs to be no gap between sessions.
  planTracks() {
    let talkList = _.clone(this._talks);
    // Adding talks in trackOne.morning
    let spareTime = this._trackOne.morning.maxTime;
    for (let i = 0; i < talkList.length; i++) {
      if (talkList[i].length <= spareTime) {
        this._trackOne.morning.addTalk(talkList[i]);
        spareTime = spareTime - talkList[i].length;
      }
    }
    _.remove(talkList, talk => this._trackOne.morning.talks.includes(talk));
    console.log(talkList);
    // SPACE FOR HEAD
    spareTime = this._trackTwo.morning.maxTime;
    for (let i = 0; i < talkList.length; i++) {
      if (talkList[i].length <= spareTime) {
        this._trackTwo.morning.addTalk(talkList[i]);
        spareTime = spareTime - talkList[i].length;
      }
    }
    _.remove(talkList, talk => this._trackTwo.morning.talks.includes(talk));
    console.log(talkList);
    // SPACE FOR HEAD
    spareTime = this._trackOne.afternoon.maxTime;
    for (let i = 0; i < talkList.length; i++) {
      if (talkList[i].length <= spareTime) {
        this._trackOne.afternoon.addTalk(talkList[i]);
        spareTime = spareTime - talkList[i].length;
      }
    }
    _.remove(talkList, talk => this._trackOne.afternoon.talks.includes(talk));
    console.log(talkList);
    // SPACE FOR HEAD
    spareTime = this._trackTwo.afternoon.maxTime;
    for (let i = 0; i < talkList.length; i++) {
      if (talkList[i].length <= spareTime) {
        this._trackTwo.afternoon.addTalk(talkList[i]);
        spareTime = spareTime - talkList[i].length;
      }
    }
    _.remove(talkList, talk => this._trackTwo.afternoon.talks.includes(talk));
    console.log(talkList);
    console.log(this._trackOne);
    console.log(this._trackTwo);
  }
}
