import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from '../../services/crud.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  })
export class ListComponent implements OnInit {
  bucketListForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.maxLength(150),
      Validators.required,
    ]),
  });

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.maxLength(150),
      Validators.required,
    ]),
  });

  error: any = {
    show: false,
    msg: '',
  };

  disable: Boolean = false;

  showStartUp: Boolean = false;

  reset: Boolean = false;

  token: String;

  bucketList: Array<any> = [];

  bucketItem: Array<any> = [];

  constructor(private _crudService: CrudService, private _router: Router) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.getAllBucketList();
  }

  resetFunction() {
    location.reload();
  }

  getAllBucketList() {
    this._crudService.getWithHeaders('/bucketlists', this.token).subscribe(
      (res) => {
        this.bucketList = res.doc;
        if (res.size < 1) {
          this.showStartUp = true;
        }
      },
      err => console.log(err),
    );
  }

  submitSearch() {
    if (!this.searchForm.valid) {
      this.error.show = true;
      this.error.msg = 'Field cannot be empty';
      setTimeout(() => {
        this.disable = false;
        this.error.show = false;
        this.error.msg = '';
      }, 3000);
    } else {
      console.log(this.searchForm.value.name);
      this._crudService
        .getWithHeaders(
          `/bucketlists?name=${this.searchForm.value.name}`,
          this.token,
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.bucketList = res.doc;
            this.reset = true;
          },
          err => console.log(err),
        );
    }
  }

  submitList() {
    if (!this.bucketListForm.valid) {
      this.error.show = true;
      this.error.msg = 'Field cannot be empty';
      setTimeout(() => {
        this.disable = false;
        this.error.show = false;
        this.error.msg = '';
      }, 3000);
    } else {
      this._crudService
        .postWithHeaders('/bucketlists', this.bucketListForm.value, this.token)
        .subscribe(
          (res) => {
            Swal.fire({
              title: 'Successfully Created',
              text: 'You can now add items to your bucketlist',
              type: 'success',
              timer: 2000,
            });
            this.getAllBucketList();
          },
          (err) => {
            this.error.show = true;
            this.error.msg = err.error.error.message;
            setTimeout(() => {
              this.disable = false;
              this.error.show = false;
              this.error.msg = '';
            }, 5000);
          },
        );
    }
  }

  moveTo(id) {
    this._router.navigate([`/list/${id}`]);
  }

  deleteItem(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete Bucketlist item',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this._crudService
          .deleteWithHeaders(`/bucketlists/${id}`, this.token)
          .subscribe(
            (res) => {
              this.getAllBucketList();
              Swal.fire({
                title: 'Deleted!',
                text: 'Bucketlist has been deleted.',
                type: 'success',
                timer: 2000,
              });
            },
            (err) => {
              console.log(err);
            },
          );
      }
    });
  }

  edit(id) {
    Swal.fire({
      title: 'Edit Bucketlist Title',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Edit',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        console.log(value);
        this._crudService
          .putWithHeaders(`/bucketlists/${id}`, { name: value }, this.token)
          .subscribe(
            (res) => {
              if (res === null) {
                setTimeout(() => {
                  this.getAllBucketList();
                }, 500);
              }
            },
            (err) => {
              console.log(err);
              Swal.showValidationMessage(`Request failed: ${err}`);
            },
          );
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }
}
