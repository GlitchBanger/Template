import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  model: any;

  constructor() { }

  async loadModel() {
    this.model = await tf.loadLayersModel('../assets/my-model/model.json');
  }

  async predict(input: number[]): Promise<number> {
    let prediction = this.model.predict(tf.tensor3d(input, [1, 1, 8])) as tf.Tensor;
    return prediction.dataSync()[0];
  }
}
