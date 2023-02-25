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
  prediction = 0;

  constructor(private predictor: PredictionService, private fields: FieldsService) { }

  async ngOnInit() {
    try {
      this.loading = true;
      await this.predictor.loadModel();
      this.prediction = await this.predictor.predict(this.fields.entries);
      if (this.prediction) this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  }

}
