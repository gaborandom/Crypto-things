import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivoRaw } from 'src/app/models/activo-raw';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  top100: Array<ActivoRaw>;
  constructor(@Inject(ActivatedRoute) private activateRoute: ActivatedRoute,) 
  { this.top100 = this.activateRoute.snapshot.data.top100 }

  ngOnInit(): void {
    console.log(this.top100)
  }

}
