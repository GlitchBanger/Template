import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  model: any;

  constructor() { }

  async loadModel() {
    this.model = await tf.loadLayersModel('../../assets/my-model/model.json');
  }

  async predict() {
    let prediction = this.model.predict(tf.tensor3d([5, 3, 1, 0, 0, 1, 1, 0], [1, 1, 8])) as tf.Tensor;
    console.log(prediction.dataSync()[0] > 0.5 ? "Migraine" : "Semi Migraine")
  }
}
