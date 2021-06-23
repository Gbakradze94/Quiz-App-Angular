import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @Input() name: string;
  @Input() selectedBoxName = '';
  @Output() selectedBoxEE = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  // public methods
  handleClick(): void {
    this.selectedBoxEE.emit(this.name);
  }
}
