import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss'],
})
export class MemoryCardComponent  implements OnInit {
 @Input() imagePathFront: string = '';
  @Input() imagePathBack: string = '';
  @Input() cardNumber: number = 0;
  @Input() isMatched: boolean = false;
  @Input() isFlipped: boolean = false;
  @Output() cardClicked: EventEmitter<{ cardNumber: number, isFlipped: boolean }> = new EventEmitter<{ cardNumber: number, isFlipped: boolean }>();

  constructor() { }

  ngOnInit() {}

  flipCard() {
    if (!this.isMatched) {
      // Envia el estado actual de isFlipped de esta tarjeta
      this.cardClicked.emit({ cardNumber: this.cardNumber, isFlipped: !this.isFlipped });
    }
  }

}
