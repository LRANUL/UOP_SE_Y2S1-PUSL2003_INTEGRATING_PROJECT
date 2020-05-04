import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail }  from '@ionic/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() { 
  }
  onFilter(event:CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }

}
