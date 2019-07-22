import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from '../../services/crud.service';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  })
export class ListItemComponent implements OnInit {
  bucketItemForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.maxLength(150),
      Validators.required,
    ]),
  });

  error: any = {
    show: false,
    msg: '',
  };

  token: String;

  disable: Boolean = false;

  bucket_id: String;

  bucketItem: Object;

  date: Date;

  done: Boolean;

  title: String;
  itemLength: Number;

  constructor(
    private _crudService: CrudService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.bucket_id = this._route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.getBucketItem();
  }

  getBucketItem() {
    this._crudService
      .getWithHeaders(`/bucketlists/${this.bucket_id}`, this.token)
      .subscribe(
        (res) => {
          this.bucketItem = res.doc.items;
          this.itemLength = res.doc.items.length;
          this.title = res.doc.name;
          this.date = res.doc.createdAt;
        },
        err => console.log(err),
      );
  }

  submitList() {
    if (!this.bucketItemForm.valid) {
      this.error.show = true;
      this.error.msg = 'Field cannot be empty';
      setTimeout(() => {
        this.disable = false;
        this.error.show = false;
        this.error.msg = '';
      }, 3000);
    } else {
      this._crudService
        .postWithHeaders(
          `/bucketlists/${this.bucket_id}/items`,
          this.bucketItemForm.value,
          this.token,
        )
        .subscribe(
          (res) => {
            this.getBucketItem();
            Swal.fire({
              title: 'Added to list',
              text: 'A great journey awaits you',
              type: 'success',
              timer: 2000,
            });
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

  deleteItem(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this item',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this._crudService
          .deleteWithHeaders(
            `/bucketlists/${this.bucket_id}/items/${id}`,
            this.token,
          )
          .subscribe(
            (res) => {
              this.getBucketItem();
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
      preConfirm: (name) => {
        this._crudService
          .putWithHeaders(
            `/bucketlists/${this.bucket_id}/items/${id}`,
            { name },
            this.token,
          )
          .subscribe(
            (res) => {
              if (res) {
                setTimeout(() => {
                  this.getBucketItem();
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
