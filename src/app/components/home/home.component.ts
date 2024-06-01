import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(public router: Router, private navCtrl: NavController) { }

  ngOnInit() {}

  nivelFacil() {
    this.router.navigate(['facil']);
  }

  nivelMedio() {
    this.router.navigate(['medio']);
  }

  nivelDificil() {
    this.router.navigate(['dificil']);
  }

  navigateTo(section: string) {
    this.navCtrl.navigateForward(`/${section}`);
  }
}