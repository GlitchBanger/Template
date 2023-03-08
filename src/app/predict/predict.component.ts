import { Component } from '@angular/core';
import { FieldsService } from '../fields.service';
import { PredictionService } from '../prediction.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent {

  loading = false;
  error = false;
  prediction = "";

  constructor(private predictor: PredictionService, private fields: FieldsService) { }

  async ngOnInit() {
    try {
      this.loading = true;
      await this.predictor.loadModel();
      let prediction = await this.predictor.predict(this.fields.entries);
      this.prediction = `${prediction < 0.5 ? `Probable Migraine with probability ${1 - prediction}` : `Migraine With aura with probability ${prediction}`}`;
      if (this.prediction) this.loading = false;
    } catch (e) {
      this.loading = false;
      this.error = true;
    }
  }

}