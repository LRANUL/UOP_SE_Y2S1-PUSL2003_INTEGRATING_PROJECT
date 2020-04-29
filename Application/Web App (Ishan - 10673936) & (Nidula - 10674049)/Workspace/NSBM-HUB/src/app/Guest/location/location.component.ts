import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  long= 80.0409;
  lat= 6.8211;
  zo=15;
  constructor() { }

  ngOnInit(): void {
  }

}
