import { Component, Input, OnInit } from '@angular/core';
import { SslCheck, SslCheckState } from '../../../../../server/src/types';
import { SslHelper } from 'src/app/shared/helper';

@Component({
  selector: 'app-ssl-list',
  templateUrl: './ssl-list.component.html',
  styleUrls: ['./ssl-list.component.css'],
})
export class SslListComponent implements OnInit {
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
