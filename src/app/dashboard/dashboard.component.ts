import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import { LocationService } from '../location.service';
import { PigLocation } from '../pig-location';
import { PigReport } from '../pig-report';
import { PigService } from '../pig.service';
import { LocationPipe } from '../location.pipe';


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
  styleUrls: ['./dashboard.component.css'],
  providers: [ LocationPipe ]
})
export class DashboardComponent implements OnInit, AfterViewInit{
  
  // This has to be of type any, otherwise the compiler will freak out.
  private map: any;
  reports: PigReport[] = [];
  locations: PigLocation[] = [];
  public sortBy: number = 0;
  
  constructor(private pigService: PigService, private locationService: LocationService, private locationPipe: LocationPipe) {}

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

    this.getReports();
  }

  ngOnInit(): void {
    this.getLocations();
  }

  getReports():void {
    this.pigService.getReports().subscribe(reports => this.reports = reports);
  }

  getLocations():void {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
      this.populate();
    });
  }

  populate(): void {
    this.locations.forEach((element: PigLocation) => {
      if (element.data.count >= 1) {
        const popup: string = `<b>${this.locationPipe.transform(element.key)}</b><br/>${element.data.count} Pig(s) Reported.`;
        L.marker([element.data.latitude, element.data.longitude]).addTo(this.map).bindPopup(popup).openPopup();
      }
    })

  }
}
