import { Component, Input, OnInit } from '@angular/core';
import { SslHelper } from 'src/app/shared/helper';
import { SslCheck, SslCheckState } from '../../../../../server/src/types';

@Component({
  selector: 'app-ssl-table',
  templateUrl: './ssl-table.component.html',
  styleUrls: ['./ssl-table.component.css'],
})
export class SslTableComponent implements OnInit {
  @Input('data') data: SslCheck[] | null = [];
  @Input('connected') connected: boolean | null = false;
  @Input('minimized') minimized: boolean | null = false;

  SslCheckState = SslCheckState;

  constructor() {}

  getDate = SslHelper.getDate;
  getValidForList = SslHelper.getValidForList;
  moreThanTwo = SslHelper.moreThanTwo;

  ngOnInit(): void {}
}
