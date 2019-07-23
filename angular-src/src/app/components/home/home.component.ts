import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CrudService } from '../../services/crud.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  })
export class HomeComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.maxLength(150),
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [Validators.required]),
  });

  error: any = {
    show: false,
    msg: '',
  };

  disable: Boolean = false;

  constructor(private _crudService: CrudService, private _router: Router) {}

  ngOnInit() {}

  userLogin() {
    if (this.loginForm.valid) {
      this._crudService.post(this.loginForm.value, 'auth/signin').subscribe(
        (res) => {
          console.log(res);
          if (res.loginSuccess) {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'You are now logged in',
              showConfirmButton: false,
              timer: 2500,
            });
            localStorage.setItem('token', res.token);
            setTimeout(() => {
              this._router.navigate(['/list']);
            }, 3000);
          } else {
          }
        },
        (err) => {
          console.log(err);
          this.error.show = true;
          this.error.msg = err.error.message;
          setTimeout(() => {
            this.disable = false;
            this.error.show = false;
            this.error.msg = '';
          }, 3000);
        },
      );
    } else {
      this.error.show = true;
      this.error.msg = 'Please fill in all details correctly';
      setTimeout(() => {
        this.disable = false;
        this.error.show = false;
        this.error.msg = '';
      }, 3000);
    }
  }
}
