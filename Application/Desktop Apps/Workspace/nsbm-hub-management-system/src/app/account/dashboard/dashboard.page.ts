import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {

    this.publishedNotices_Lecturers_To_PO;

    
  }

  // Retrieving published notices (Lecturers To Program Office (PO)) and assigning them
  publishedNotices_Lecturers_To_PO;
  retrievePublishedNotices_Lecturers_To_PO = () => 
    this.dashboardService.retrievePublishedNotices_Lecturers_To_PO().subscribe(response => (this.publishedNotices_Lecturers_To_PO = response));



}
