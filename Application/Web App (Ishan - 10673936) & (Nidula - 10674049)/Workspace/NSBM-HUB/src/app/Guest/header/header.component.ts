import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'modal-contact',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Contact us</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
      Email: inquiries@nsbm.lk
      <br>
      Phone: +94 11 544 5000
      <br>
      Address: Mahenwaththa,
               Pitipana, Homagama,
               Sri Lanka
      <br>
      Hotline: +94 71 244 5000
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Done</button>
    </div>
  `
})

export class ModalContact {
  constructor(public activeModal: NgbActiveModal) {}
}


@Component({
  selector: 'modal-social',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Visit us at :</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div>
      <ul class="list-group list-group-horizontal">
      <li class="list-group-item">
        <a class="nav-link waves-effect waves-light" href="https://twitter.com/nsbm_srilanka?lang=en" target="_blank">
          <i class="fab fa-twitter icon fa-lg"></i>
        </a>
      </li>
      <li class="list-group-item">
        <a class="nav-link waves-effect waves-light" href="https://www.facebook.com/nsbm.lk/" target="_blank" >
        <i class="fab fa-facebook icon fa-lg"></i>
        </a>
      </li>
      <li class="list-group-item">
      <a class="nav-link waves-effect waves-light" href="https://www.instagram.com/nsbmgreenuniversity/?hl=en" target="_blank">
      <i class=" fab fa-instagram icon fa-lg"></i>
      </a>
      </li>
      <li class="list-group-item">
        <a class="nav-link waves-effect waves-light" href="https://www.linkedin.com/company/nsbm-green-university-town" target="_blank">
        <i class="fab fa-linkedin-in fa-lg"></i>
        </a>
      </li>
      </ul>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Done</button>
    </div>
  `
})

export class Modalsocial {

  constructor(public activeModal: NgbActiveModal) {}
}



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() val:boolean;

  constructor(private modalService: NgbModal) {}

  openContactsModal() {
    const modalRef = this.modalService.open(ModalContact);
    modalRef.componentInstance.name = 'World';
  }

  opensocial() {
    const modalRef = this.modalService.open(Modalsocial);
    modalRef.componentInstance.name = 'World';
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    this.val=true;
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    this.val=false;
  }


  ngOnInit(): void {
  }
}
