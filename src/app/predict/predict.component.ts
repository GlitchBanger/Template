import { Component } from '@angular/core';
import { FieldsService } from '../fields.service';
import { PredictionService } from '../prediction.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent {

  prediction = 0;

  constructor(private predictor: PredictionService, private fields: FieldsService) { }

  async ngOnInit() {
    await this.predictor.loadModel();
    this.prediction = await this.predictor.predict(this.fields.entries);
  }

}
