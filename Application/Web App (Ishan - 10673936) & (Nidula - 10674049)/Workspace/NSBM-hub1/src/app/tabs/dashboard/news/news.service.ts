import { Injectable } from '@angular/core';
import { news } from './news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private news:news[]=[ 
    { id:'1',
      title:'1',
      content:'hi',
      imageUrl:'"https://download.hipwallpaper.com/desktop/1920/1080/10/31/RqU6W0.jpg"',
      createDate:'2018-03-03',
      createdId:'1'
      },
      { id:'2',
      title:'title2',
      content:'hii',
      imageUrl:'"https://download.hipwallpaper.com/desktop/1920/1080/10/31/RqU6W0.jpg"',
      createDate:'2018-03-03',
      createdId:'2'
      },
      { id:'3',
      title:'title3',
      content:'hiii',
      imageUrl:'"https://download.hipwallpaper.com/desktop/1920/1080/10/31/RqU6W0.jpg"',
      createDate:'2018-03-03',
      createdId:'1'
      }
  ]
  constructor() { }

  get Allnews(){
    return [...this.news];
  }
}
