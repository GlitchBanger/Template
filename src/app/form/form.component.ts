import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faX, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import * as tf from '@tensorflow/tfjs';
import { Field } from '../field';
import { FieldsService } from '../fields.service';
import { PredictionService } from '../prediction.service';
import { StorageService } from '../storage.service';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  no_of_attacks = "";
  duration = "";
  others = "";
  assisted = "";
  loading = false;
  prediction = "";


  // symptom = true;
  // err = false;

  all_symptoms = [
    "Unilateral location",
    "Pulsating",
    "Moderate/severe pain",
    "Restriction of physical activities",
    "Nausea/vomitting",
    "Photophobia/Phonophobia"
  ]

  listed_symptoms = this.all_symptoms;

  our_symptoms: string[] = [];

  main_symptoms: string[] = [];

  associated: string[] = [];

  entries: number[] = [];

  error = "";

  x_icon = faX;

  back_icon = faArrowLeft;

  buttonclass = "";

  constructor(
    private router: Router,
    private predictor: PredictionService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
  }

  onOtherChange() {
    this.listed_symptoms = this.all_symptoms.filter(search => conatinsstring(search, this.others) && (!this.our_symptoms.includes(search)))
  }

  onSymptomClick(symptom: string) {
    this.our_symptoms.push(symptom);
    // this.symptom = false;
    this.listed_symptoms = this.all_symptoms.filter(symptom => !this.our_symptoms.includes(symptom));
    this.others = "";
    let associated = [
      "Nausea/vomitting",
      "Photophobia/Phonophobia"
    ];

    if (associated.includes(symptom)) this.associated.push(symptom);
    else this.main_symptoms.push(symptom);

    this.associated.sort((a, b) => a.length - b.length);
  }

  onEnter() {
    if (this.listed_symptoms.length == 1) {
      this.onSymptomClick(this.listed_symptoms[0]);
    }
  }

  onDeleteSymptom(symptom: string) {
    this.our_symptoms = this.our_symptoms.filter(s => s != symptom);
    this.associated = this.associated.filter(s => s != symptom);
    this.main_symptoms = this.main_symptoms.filter(s => s != symptom);
    // if (this.our_symptoms.length === 0) this.symptom = true;
    this.listed_symptoms = this.all_symptoms.filter(s => !this.our_symptoms.includes(s));
  }

  onPredict() {
    console.log("works");
    console.log(+this.no_of_attacks);
    console.log(this.no_of_attacks);
    console.log(+this.duration);
    console.log(this.duration);

    if (this.no_of_attacks === "" || this.duration === "") {
      this.error = "No empty number fields allowed";
      return;
    }

    if (isNaN(+this.no_of_attacks)) {
      // this.err = true;
      this.error = "No. of attacks is a number";
      console.log(this.error);
      console.log("did this");
      return;
    }

    if (isNaN(+this.duration)) {
      // this.err = true;
      this.error = "Duration needs to be a number";
      console.log("and this");
      console.log(this.error);
      return;
    }

    console.log("they didn't work did they?")
    // this.err = false;
    this.error = "";

    this.entries.push(+this.no_of_attacks);
    this.entries.push(+this.duration);
    this.all_symptoms.forEach(symptoms => this.entries.push(this.our_symptoms.includes(symptoms) ? 1 : 0));

    console.log(this.entries);

    this.loading = true;
    this.storage.storedata(
      +this.no_of_attacks,
      +this.duration,
      this.our_symptoms
    ).subscribe(rs => {
      console.log(rs);
      this.prediction = `${rs < 0.5 ? `Probable Migraine with probability ${`${100 * (1 - rs)}`.slice(0, 5)}` : `Migraine With aura with probability ${`${100 * rs}`.slice(0, 5)}`} %`;
      if (this.prediction) this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    })

  }

  onOk() {
    this.no_of_attacks = "";
    this.duration = "";
    this.prediction = "";
    this.our_symptoms = [];
    this.associated = [];
    this.main_symptoms = [];
    this.listed_symptoms = this.all_symptoms;
  }

  onBack() {
    this.router.navigate(['']);
  }

}

function conatinsstring(search: string, original: string): boolean {
  let smallsearch = search.toLowerCase();
  let smalloriginal = original.toLowerCase();
  return smallsearch.includes(smalloriginal);
}
