import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CrudService } from '../../services/crud.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [
      Validators.maxLength(150),
      Validators.required,
    ]),
    lastname: new FormControl(null, [
      Validators.maxLength(150),
      Validators.required,
    ]),
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

  userSignUp() {
    if (this.registerForm.valid) {
      this._crudService.post(this.registerForm.value, 'auth/signup').subscribe(
        (res) => {
          if (res.success) {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Please login now!!!',
              showConfirmButton: false,
              timer: 2500,
            });
            setTimeout(() => {
              this._router.navigate(['/']);
            }, 3000);
          } else {
          }
        },
        (err) => {
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
