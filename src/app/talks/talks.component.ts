import { Component, OnInit } from '@angular/core';
import { Talk } from '../models/talk.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent implements OnInit {
  private _talks: Talk[];
  talk: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.talk = this.fb.group({
      title: [null, [Validators.required]],
      length: [null, [Validators.required, Validators.minLength(2)]]
    });
  }

  // TODO IS THIS NEEDED?
  get talks() {
    return this._talks;
  }

  openAddTalk() {
    this.talk.reset();
    $('.ui.modal.addTalk').modal('show');
  }

  addTalk() {
    console.log('add');
  }
}
