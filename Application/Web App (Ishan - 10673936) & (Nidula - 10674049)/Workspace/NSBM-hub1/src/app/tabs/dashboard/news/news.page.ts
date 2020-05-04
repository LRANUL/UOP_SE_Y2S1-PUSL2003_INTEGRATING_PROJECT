import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { news } from './news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
loadedNews:news[]; 
  constructor(private newsServ:NewsService) { }

  ngOnInit() {
    this.loadedNews = this.newsServ.Allnews;
  }
 
}
