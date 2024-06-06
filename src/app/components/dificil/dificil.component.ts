import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Posicion } from 'src/app/interfaces/posicion';
import { AngularFireService } from 'src/app/services/angular-fire.service';
import { PosicionesService } from 'src/app/services/posiciones/posiciones.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dificil',
  templateUrl: './dificil.component.html',
  styleUrls: ['./dificil.component.scss'],
})
export class DificilComponent implements OnInit, OnDestroy {
  constructor(private angularFireService: AngularFireService, private posicionesService: PosicionesService, private toastNotification:ToastService, private navCtrl:NavController) { }

  currentEmail = '';
  formattedTime: string = '00:00:00';
  startTime: number = 0;
  elapsedTime: number = 0;
  timerInterval: any;
  timerStarted = false;

  cards = this.shuffleCards(this.generateCards());
  selectedCards: { cardNumber: number, imagePathBack: string }[] = [];

  async ngOnInit() {
    this.currentEmail = await this.angularFireService.GetEmailLogueado();
    const userLogueado = await this.angularFireService.GetUserLogueado();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  generateCards() {
    return [
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/anana.jpeg', cardNumber: 1, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/limon.jpeg', cardNumber: 2, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/frutilla.jpeg', cardNumber: 3, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/banana.jpeg', cardNumber: 4, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/naranja.jpeg', cardNumber: 5, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/pera.jpeg', cardNumber: 6, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/sandia.jpeg', cardNumber: 7, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/uvas.jpeg', cardNumber: 8, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/anana.jpeg', cardNumber: 9, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/limon.jpeg', cardNumber: 10, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/frutilla.jpeg', cardNumber: 11, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/banana.jpeg', cardNumber: 12, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/naranja.jpeg', cardNumber: 13, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/pera.jpeg', cardNumber: 14, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/sandia.jpeg', cardNumber: 15, isMatched: false, isFlipped: false },
      { imagePathFront: '../../../assets/images/logo-game.png', imagePathBack: '../../../assets/images/dificil/uvas.jpeg', cardNumber: 16, isMatched: false, isFlipped: false },
    ];
  }

  shuffleCards(cards: any[]) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  handleCardClicked(cardInfo: { cardNumber: number, isFlipped: boolean }) {
    if (!this.timerStarted) {
      this.startTimer();
      this.timerStarted = true;
    }

    const selectedCard = this.cards.find(card => card.cardNumber === cardInfo.cardNumber);
    if (selectedCard) {
      selectedCard.isFlipped = cardInfo.isFlipped;
      if (selectedCard.isFlipped) {
        this.selectedCards.push({ cardNumber: selectedCard.cardNumber, imagePathBack: selectedCard.imagePathBack });
      }
    }

    if (this.selectedCards.length === 2) {
      this.checkForMatch();
    }
  }

  checkForMatch() {
    const [firstCard, secondCard] = this.selectedCards;

    if (firstCard.imagePathBack === secondCard.imagePathBack) {
      this.cards.find(card => card.cardNumber === firstCard.cardNumber)!.isMatched = true;
      this.cards.find(card => card.cardNumber === secondCard.cardNumber)!.isMatched = true;
    } else {
      setTimeout(() => {
        this.cards.find(card => card.cardNumber === firstCard.cardNumber)!.isFlipped = false;
        this.cards.find(card => card.cardNumber === secondCard.cardNumber)!.isFlipped = false;
      }, 500);
    }

    this.selectedCards = [];

    this.checkForWin();
  }

  checkForWin() {
    if (this.cards.every(card => card.isMatched)) {
      clearInterval(this.timerInterval);
      this.cards.forEach(card => {
        card.isFlipped = true;
      });

      setTimeout(() => {
        this.toastNotification.ToastMessage("Has ganado!", "middle");

        const posicion: Posicion = {
          userId: this.currentEmail,
          tiempo: this.elapsedTime / 1000, // Convertir milisegundos a segundos
          fecha: new Date().toISOString(), // Obtener la fecha actual en formato ISO
          nivel: "dificil"
        };

        this.posicionesService.Crear(posicion);
        this.resetGame();
      }, 1000);
    }
  }

  startTimer() {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.formattedTime = this.getFormattedTime(this.elapsedTime);
    }, 10); // Actualizar cada 10ms para mostrar milisegundos
  }

  resetGame() {
    this.cards = this.shuffleCards(this.generateCards());
    this.selectedCards = [];
    this.elapsedTime = 0;
    this.timerStarted = false;
    clearInterval(this.timerInterval); // Asegurarse de detener el temporizador
    this.formattedTime = '00:00:00';
  }

  getFormattedTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;
    return `${this.padToTwo(minutes)}:${this.padToTwo(seconds)}:${this.padToThree(milliseconds)}`;
  }

  padToTwo(number: number) {
    return number <= 9 ? `0${number}` : number;
  }

  padToThree(number: number) {
    if (number <= 9) return `00${number}`;
    if (number <= 99) return `0${number}`;
    return number;
  }

  navigateTo(section: string) {
    this.navCtrl.navigateForward(`/${section}`);
  }
}
