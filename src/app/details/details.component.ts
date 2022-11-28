import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PigReport } from '../pig-report';
import { PigService } from '../pig.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  report: PigReport | undefined;

  constructor(
    private route: ActivatedRoute,
    private pigService: PigService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getReport();
  }

  getReport():void {
    const key = this.route.snapshot.paramMap.get('key');
    this.pigService.getReport(key).subscribe(report => this.report = report);
  }

  goBack(): void {
    this.location.back();
  }
}
