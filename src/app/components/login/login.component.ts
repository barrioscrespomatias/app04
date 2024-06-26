import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireService } from '../../services/angular-fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  public isLogged: boolean = false;
  selectedRole!: string;

  constructor(public angularFireService: AngularFireService) {
    this.checkLoggedIn();
  }

  async checkLoggedIn() {
    this.isLogged = await this.angularFireService.isLoggedIn();
  }

  SignIn() {
    this.angularFireService.SignIn(this.email?.value, this.password?.value);
    setTimeout(() => {
      this.form.controls['email'].setValue('');
      this.form.controls['password'].setValue('');
      this.selectedRole = ''; 
    }, 700);
  }

  GoogleAuth() {
    this.angularFireService.GoogleAuth();
  }

  SignUp() {
    this.angularFireService.SignUp(this.email?.value, this.password?.value);
  }

  AccesoRapido(mail: string, password: string) {
    this.email?.setValue(mail);
    this.password?.setValue(password);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.pattern(
          '^[a-zA-Z0-9\\s!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>/?]+$'
        ),
        Validators.minLength(4),
        Validators.required,
      ]),
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onRoleChange(event: any) {
    const selectedRole = event.detail.value;
    let email = '';
    let password = '';

    switch (selectedRole) {
      case 'admin':
        email = 'admin@admin.com';
        password = '111111';
        break;
      case 'invitado':
        email = 'invitado@invitado.com';
        password = '222222';
        break;
      case 'usuario':
        email = 'usuario@usuario.com';
        password = '333333';
        break;
      default:
        break;
    }

    this.form.patchValue({ email, password });
  }
}