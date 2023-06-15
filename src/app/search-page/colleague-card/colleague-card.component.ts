import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-colleague-card',
  templateUrl: './colleague-card.component.html',
  styleUrls: ['./colleague-card.component.css']
})
export class ColleagueCardComponent implements OnInit {


  constructor() { }

  @Input() colleague: any;
  ngOnInit(): void {
  }

}
