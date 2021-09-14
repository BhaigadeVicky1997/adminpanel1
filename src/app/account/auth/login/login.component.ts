import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { StorageService } from 'src/app/service/storage.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;
  public form: any;
  constructor(private formBuilder: FormBuilder, private Toast: ToastrService,
    private router: Router,
    public commonService: CommonServiceService, public apiservice: CommonServiceService,
    public storageService: StorageService, private spinner: NgxSpinnerService) {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.email),
      pass: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {

    this.commonService.autoLogout(this.router.url);
  }
  ngAfterViewInit() {
    document.body.classList.add();
  }

  LoginApi() {
    var email = $('#email').val();
    var password = $('#password').val();
    if (email === '' || password === '') {
      this.Toast.error('Email And Password Is Required');
    }
    else {
      // $("#load").addClass("dis");

      var data = { "emailID": email, "password": password };
      //console.log(data);
      this.spinner.show();
      this.apiservice.loginApi(data).subscribe(res => {
        //console.log(res);
        if (res['token']) {
          this.storageService.updateItems({ 'token': res['token'] }, 'token').then(dbres => {
            if (dbres) {
              this.storageService.updateItems({ 'fullName': res['fullName'] }, 'fullName').then(dbres => {
                if (dbres) {
                  this.storageService.updateItems({ 'emailID': res['emailID'] }, 'emailID').then(dbres => {
                    if (dbres) {
                      //$("#load").removeClass("dis");                           

                      this.router.navigate(['/dashboard/view-dashboard']);
                      this.spinner.hide();
                      this.Toast.success('Successfully', 'Login');

                    }
                  });
                }
              });
            }
          });
        }

      }, err => {
        if (err == 'Unauthorized') {
          alert('Password Is Incorrect');
          this.spinner.hide();
          this.Toast.error('Please Check Your Password', 'Login Failed');
        }
        if (err == 'User not found') {
          this.Toast.error('User Not Found', 'Login Failed');
          this.spinner.hide();
        }
      });
    }
  }
}
