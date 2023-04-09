import { Component } from '@angular/core';
import { StorageService, Data } from '../storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  data: Data[] = [];

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.storage.getdata().subscribe(data => {
      this.data = data;
      this.data.forEach(d => {
        d.symptoms = d.symptoms.sort((a, b) => a.length - b.length)
      });
    });
  }
}
