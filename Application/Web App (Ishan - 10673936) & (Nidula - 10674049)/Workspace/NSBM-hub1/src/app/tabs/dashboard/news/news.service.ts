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
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/3/33/Al_Jazeera_English_Doha_Newsroom_1.jpg',
      createDate:'2018-03-03',
      createdId:'1'
      },
      { id:'2',
      title:'title2',
      content:'hii',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/3/33/Al_Jazeera_English_Doha_Newsroom_1.jpg',
      createDate:'2018-03-03',
      createdId:'2'
      },
      { id:'3',
      title:'title3',
      content:'hiii',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/3/33/Al_Jazeera_English_Doha_Newsroom_1.jpg',
      createDate:'2018-03-03',
      createdId:'1'
      }
  ]
  constructor() { }

  get Allnews(){
    return [...this.news];
  }
}
