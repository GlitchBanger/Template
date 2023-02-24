import { Injectable } from '@angular/core';
import { Field } from './field';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {



  currentField: (Field | null) = null;

  field1: Field = {
    question: 'How many times did you get Migraine attacks?',
    placeholder: 'Eg. 3',
    isSelect: false,
    selectList: null,
    hasExtra: true,
    extra: 'centered',
    name: 'attacks'
  }

  field2: Field = {
    question: 'How long do the attacks last?',
    placeholder: 'Eg. 1',
    hasExtra: true,
    extra: 'centered',
    isSelect: false,
    selectList: null,
    name: 'duration'
  }

  field3: Field = {
    question: 'Which of these symptom\'s are you facing along side migraine?',
    placeholder: 'Eg. pain',
    extra: '',
    isSelect: true,
    selectList: ['something', 'something else'],
    hasExtra: false,
    name: 'symptoms'
  }

  constructor() { }

  getField(): (Field | null) {
    if (this.currentField === null) {
      this.currentField = this.field1;
      return this.currentField;
    }

    if (this.currentField.name === "attacks") {
      this.currentField = this.field2;
      return this.currentField;
    }

    if (this.currentField.name === "duration") {
      this.currentField = this.field3;
      return this.currentField;
    }

    return null;
  }
}
