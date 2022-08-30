import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() error : string
  @Output() close = new EventEmitter<void>()


  closeErrorTab(){
    this.close.emit()
  }
}
