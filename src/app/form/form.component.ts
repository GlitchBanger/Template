import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  no_of_attacks = "";
  duration = "";
  others = "";
  
  all_symptoms = [
    "Unilateral Location",
    "Pulsating",
    "Severe Pain",
    "Moderate Pain",
    "Restricted Activity",
    "Nausea",
    "Vomiting",
    "Photophobia",
    "Phonophobia"
  ]

  listed_symptom: string[] = [];

  our_symptoms: string[] = [];

  ngOnInit(): void {
    this.listed_symptom = this.all_symptoms;
  }

  onOtherChange(): void {
    if (this.others !== "") {
      console.log(this.others);
      let regexreader = new RegExp(`${this.others.toLowerCase()}`)
      this.listed_symptom = this.all_symptoms.filter(s => regexreader.test(s.toLowerCase()));
      return;
    }

    this.listed_symptom = this.all_symptoms;
  }

  insertSymptom(symptom: string): void {
    this.our_symptoms.push(symptom);
  }
}
