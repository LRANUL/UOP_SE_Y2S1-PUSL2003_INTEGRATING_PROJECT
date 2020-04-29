import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-contact',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Wifi Acess for Guest</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
      Username: NGuest
      <br>
      Password: NGuest321
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Done</button>
    </div>
  `
})

export class Modalinfo {

  constructor(public activeModal: NgbActiveModal) {}
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  openwifi() {
    const modalRef = this.modalService.open(Modalinfo);
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit(): void {
  }
}
