import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import { PigReport } from '../pig-report';
import { PigService } from '../pig.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit{
  
  private map: L.Map | L.LayerGroup<any> | undefined;
  reports: PigReport[] = [];
  
  constructor(private pigService: PigService) {}

  ngAfterViewInit(): void {
    this.map = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3lsZWRlbGl5YW5uaWRlcyIsImEiOiJjbGIwYnRrbHQwZjc4M3dtcmEzd29lZHNsIn0.CreOGrt6frmR0l3_o3Q2WA', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

  }

  ngOnInit(): void {
    this.getReports();

  }

  getReports():void {
    this.pigService.getReports().subscribe(reports => this.reports = reports);
    console.log(this.reports);
  }
}
