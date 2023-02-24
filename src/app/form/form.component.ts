import { Component } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import * as tf from '@tensorflow/tfjs';
import { Field } from '../field';
import { FieldsService } from '../fields.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  no_of_attacks = "";
  duration = "";
  others = "";

  listed_symptom: (string[] | null) = [];

  our_symptoms: string[] = [];

  model = "";

  error = "";

  field: (Field | null) = null;

  question = "";

  placeholder = "";

  x_icon = faX;

  constructor(private service: FieldsService) { }

  ngOnInit(): void {
    this.field = this.service.getField();
    if (this.field !== null) {
      this.placeholder = this.field.placeholder;
      this.question = this.field.question;
    }
  }

  onOtherChange(): void {
    if (this.field === null) return;

    if (['attacks', 'duration'].includes(this.field.name)) {
      if (isNaN(+this.model)) {
        this.error = "Needs to be a number";
        return;
      }
      this.error = "";
      return;
    }
  }

  insertSymptom(symptom: string): void {
    this.our_symptoms.push(symptom);
    if (this.listed_symptom !== null) this.listed_symptom = this.listed_symptom?.filter(s => s !== symptom);
    this.others = "";
  }

  deleteSymptom(symptom: string): void {
    this.our_symptoms = this.our_symptoms.filter(e => e !== symptom);
    this.listed_symptom?.push(symptom);
  }

  onNext() {
    if (this.model === "") return;
    this.model = "";
    this.field = this.service.getField();
    if (this.field?.isSelect) {
      this.listed_symptom = this.field.selectList;
    }
  }
}
