import { Component, Input, OnInit } from '@angular/core';
import { SslCheck, SslCheckState } from '../../../../../server/src/types';
import { SslHelper } from 'src/app/shared/helper';

@Component({
  selector: 'app-ssl-grid',
  templateUrl: './ssl-grid.component.html',
  styleUrls: ['./ssl-grid.component.css'],
})
export class SslGridComponent implements OnInit {
  @Input('data') data: SslCheck[] = [];
  @Input('connected') connected = false;
  @Input('minimized') minimized = false;

  SslCheckState = SslCheckState;

  constructor() {}

  getDate = SslHelper.getDate;
  getValidForList = SslHelper.getValidForList;
  moreThanTwo = SslHelper.moreThanTwo;

  ngOnInit(): void {}
}
