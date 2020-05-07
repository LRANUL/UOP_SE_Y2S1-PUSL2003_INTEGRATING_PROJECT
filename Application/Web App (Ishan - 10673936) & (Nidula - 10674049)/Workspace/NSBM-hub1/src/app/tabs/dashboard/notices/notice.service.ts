import { Injectable } from '@angular/core';
import { notice } from './notices.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private notice:notice[] = [
    {
      id:'1',
      title:'title_1',
      desc:'notice test1 notice test1 notice test1 notice test1 notice test1 notice ',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg',
      createDate: new Date('2019-01-01'),
      batch:18.2,
      fac:'SOC',
    },
    {
     id:'2',
     title:'title_2',
     desc:'notice test1',
     imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Dogs.jpg/1024px-Collage_of_Nine_Dogs.jpg',
     createDate: new Date('2019-01-01'),
     batch:18.2,
     fac:'SOC',
   },
   {
     id:'3',
     title:'title_3',
     desc:'notice test1',
     imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Dogs.jpg/1024px-Collage_of_Nine_Dogs.jpg',
     createDate: new Date('2019-01-01'),
     batch:18.2,
     fac:'SOC',
   }
  ]
 getAllNotices(){
   return [...this.notice];
 }
 
 getNotice(noticeId:string){
   return {
     ...this.notice.find(notice =>{
     return notice.id === noticeId;
       })
     };
 }
  constructor() { }
}
