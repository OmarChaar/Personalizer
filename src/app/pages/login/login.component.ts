import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { SessionStorageService } from 'src/app/services/sessionStorage/session-storage.service';
import { ConstantsService } from 'src/app/services/constants/constants.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cpfForm = new FormControl('', [Validators.required]);
  aptForm = new FormControl('', [Validators.required]);

  hide = true;
  hasErrors = false;

  cpf_cnpj: any;;
  apartment: any;

  public sections: any[] = [];

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private store: Store,
    private sessionStorageService: SessionStorageService,
    private constantsService: ConstantsService
  ) { }

  ngOnInit(): void {
  }

  async login() {
    if (!this.cpf_cnpj || this.apartment.trim() === '') {
      this.cpfForm.markAllAsTouched();
      this.aptForm.markAllAsTouched();
    }
    else {
      this.constantsService.startLoader();
      const client: any = await this.firebaseService.login(this.cpf_cnpj, this.apartment);
      if(client) {
        this.constantsService.stopLoader();
        this.router.navigate(['personalization']);
      }
      else {
        this.hasErrors = true;
        this.constantsService.stopLoader();
      }
    }

  }

  cpfChange(event: any) {
    var numeric = event.target.value.replace(/[^0-9]+/g, '');
    var cpfLength = numeric.length;

    var partOne = numeric.slice(0, 3) + ".";
    var partTwo = numeric.slice(3, 6) + ".";
    var partThree = numeric.slice(6, 9) + "-";

    var cpfInput = '';//$w('#cpf');

    if (cpfLength < 4) {
        cpfInput = numeric;
    } else if (cpfLength >= 4 && cpfLength < 7) {
        var formatCPF = partOne +
		numeric.slice(3);
        cpfInput = formatCPF;
    } else if (cpfLength >= 7 && cpfLength < 10) {
        var formatCPF = partOne +
		partTwo +
		numeric.slice(6);
        cpfInput = formatCPF;
    } else if (cpfLength >= 10 && cpfLength < 12) {
        var formatCPF = partOne +
		partTwo +
		partThree +
		numeric.slice(9);
        cpfInput = formatCPF;
    } else if (cpfLength >= 12) {
        var formatCPF = partOne +
		partTwo +
		partThree +
		numeric.slice(9, 11);
        cpfInput = formatCPF;
    }

    this.cpf_cnpj = cpfInput;
  }

  cnpjChange(event: any) {
    var numeric = event.target.value.replace(/[^0-9]+/g, '');
    var cpfLength = numeric.length;

    var partOne = numeric.slice(0, 2) + ".";
    var partTwo = numeric.slice(2, 5) + ".";
    var partThree = numeric.slice(5, 8) + "/";
    var partFour = numeric.slice(8, 12) + "-"

    var cnpjInput = '';//document.getElementById('#cnpj');

    if (cpfLength < 3) {
      cnpjInput = numeric;
    }
    else if (cpfLength >= 3 && cpfLength < 6) {
      var formatCPF = partOne + numeric.slice(2);
      cnpjInput = formatCPF;
    }
    else if (cpfLength >= 6 && cpfLength < 9) {
      var formatCPF = partOne + partTwo + numeric.slice(5);
      cnpjInput = formatCPF;
    }
    else if (cpfLength >= 9 && cpfLength < 13) {
      var formatCPF = partOne + partTwo + partThree + numeric.slice(8);
      cnpjInput = formatCPF;
    }
    else if (cpfLength >= 13) {
      var formatCPF = partOne + partTwo + partThree + partFour + numeric.slice(12, 14);
      cnpjInput = formatCPF;
    }

    this.cpf_cnpj = cnpjInput;
  }

}
