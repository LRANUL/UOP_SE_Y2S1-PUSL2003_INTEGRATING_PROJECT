import { Injectable } from '@angular/core';
import { notice } from './notices.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  
   private _userNotices =  new BehaviorSubject<notice[]>([])

   get userBookings(){
     return this._userNotices.asObservable();
   }

   addUserNotices(
     noticeTitle:string,
     noticeImg:string,
     desc:string
     ){
      const newNotice = new notice(
        Math.random().toString(),
        noticeTitle,
        desc,
        noticeImg,
        new Date(),
        18.2,
        "SOC",
        this.authServe.userId
        );
      return this.userBookings.pipe(take(1),delay(1500), tap(Unotice =>{
        this._userNotices.next(Unotice.concat(newNotice));
      }))      

   }

   deleteUserNotices(notieId:string){
      return this.userBookings.pipe(take(1),delay(1500), tap(Unotice =>{
      this._userNotices.next(Unotice.filter(delNotice =>delNotice.id !== notieId));
    })) 
   }

  constructor(private authServe:AuthService) { }

  private _notice = new BehaviorSubject<notice[]>([
    {
      id:'1',
      title:'title_1',
      desc:'notice test1 notice test1 notice test1 notice test1 notice test1 notice ',
      imageUrl:'"https://download.hipwallpaper.com/desktop/1920/1080/10/31/RqU6W0.jpg"',
      createDate: new Date('2019-01-01'),
      batch:18.2,
      fac:'SOC',
      userId:'xyz'
    },
    {
     id:'2',
     title:'title_2',
     desc:'notice test1',
     imageUrl:'"https://download.hipwallpaper.com/desktop/1920/1080/10/31/RqU6W0.jpg"',
     createDate: new Date('2019-01-01'),
     batch:18.2,
     fac:'SOC',
     userId:'hii'
   },
   {
     id:'3',
     title:'title_3',
     desc:'notice test1',
     imageUrl:'"https://download.hipwallpaper.com/desktop/1920/1080/10/31/RqU6W0.jpg"',
     createDate: new Date('2019-01-01'),
     batch:18.2,
     fac:'SOC',
     userId:'hii'
   }
  ]) 
 get AllNotices(){
   return this._notice.asObservable();
 }
 
 getNotice(noticeId:string){
   return this.AllNotices.pipe(take(1),map(noticee =>{
    return {...noticee.find(notice =>{return notice.id === noticeId;})};
   }))
   
 }

 addNotice(title:string,desc:string,createDate:Date){
    const newNotice = new notice(
      Math.random().toString(),
      title,
      desc,
      "../../",
      createDate,
      18.2,
      "SOC",
      this.authServe.userId
      ); 
      return this.AllNotices.pipe(take(1),delay(1000),tap(noticee=>{
        this._notice.next(noticee.concat(newNotice));
         
      }));
      
 }
  

 editNotice(id:string,title:string,desc:string){
    return this.AllNotices.pipe(take(1),
    delay(1000),
    tap(allNoticee =>{
      const editedNoticeIndex = allNoticee.findIndex(N=>N.id===id);
      const editedNotices = [...allNoticee];
      const oldNotice = editedNotices[editedNoticeIndex];
      editedNotices[editedNoticeIndex] = new notice(
        oldNotice.id,
        title,
        desc,
        oldNotice.imageUrl,
        new Date(),
        oldNotice.batch,
        oldNotice.fac,
        oldNotice.userId
        );
        this._notice.next(editedNotices)
    }));
 }

}
