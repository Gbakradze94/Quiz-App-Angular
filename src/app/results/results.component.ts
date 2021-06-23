import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() quizResults: any;
  @Output() returnHome = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onReturnHome(): void {
    this.returnHome.emit();
  }
}
