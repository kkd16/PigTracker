import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PigReport } from '../pig-report';
import { PigService } from '../pig.service';
import { DeleteComponent } from '../delete/delete.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PickupComponent } from '../pickup/pickup.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  report: PigReport | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pigService: PigService,
    private location: Location,
    public dialog: MatDialog
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

  delete(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '700px';
    dialogConfig.position = {
      'top': '150px',
      left: '250px'
    }
    dialogConfig.data = this.report;

    this.dialog.open(DeleteComponent, dialogConfig);
  }

  pickedUp():void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '700px';
    dialogConfig.position = {
      'top': '150px',
      left: '250px'
    }
    dialogConfig.data = this.report;

    this.dialog.open(PickupComponent, dialogConfig).afterClosed().subscribe( () => {
      this.getReport();
    });
  }

}
