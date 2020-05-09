import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail }  from '@ionic/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
tab:boolean=false;
  constructor() { }

  ngOnInit() { 
  }
  onFilter(event:CustomEvent<SegmentChangeEventDetail>){
    if(event.detail.value==="all"){
      this.tab=true;
    }
    if(event.detail.value==="dash"){
      this.tab=false;
    }

  }

}
