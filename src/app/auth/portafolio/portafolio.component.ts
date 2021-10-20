import { Component, Inject, OnInit } from '@angular/core';
import { ActivoRaw } from 'src/app/models/activo-raw';
import { PortafolioService } from '../../services/portafolio.service'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'node_modules/chart.js';
import { TotalPortafolio } from 'src/app/models/total-portafolio';
import { PortafolioTotalChartResolver } from '../resolvers/portfolioTotalChart.resolver';
import { ActivosResponse } from 'src/app/models/activos-response';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {
  activosUser: any;
  activosInfo: any;
  top100: Array<ActivoRaw>;
  activos: Array<ActivosResponse>;
  portafolioTotalChartResolver: PortafolioTotalChartResolver;
  activo: string;
  cantidad: number;
  divisa: string;
  form: FormGroup;
  myChart: Chart<"line", any[], any>;
  valorTotal: number;

  constructor(
    @Inject(ActivatedRoute) private activateRoute: ActivatedRoute,
    portafolioTotalChartResolver: PortafolioTotalChartResolver,
    private portafolioService: PortafolioService, private formBuilder: FormBuilder) {
    this.portafolioTotalChartResolver = portafolioTotalChartResolver;
    this.top100 = this.activateRoute.snapshot.data.top100
    this.activosInfo = {};
    this.getActivos();
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      top100: ['', Validators.required],
      operacion: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
    this.divisa = '$'
    this.buildChart();
    this.getActivosInfo();

  }

  async buildChart() {

    let fechas = new Array();
    let precios = new Array();



    this.activateRoute.snapshot.data.portfolioTotalChart.forEach((element) => {
      fechas.push(this.convertTimestampToDate(element.fecha))
      precios.push(element.precio)
    });

    this.valorTotal = precios[precios.length-1];
    console.log(fechas, precios)

    Chart.register(...registerables);
    Chart.defaults.color = "#ffffff";
    this.myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [{
          label: `Valor en ${this.divisa}`,
          data: precios,
          backgroundColor:
            'rgba(255, 255, 255, 255)',
          borderColor:
            'rgba(255, 255, 255, 255)',
          borderWidth: 1,

        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  resolvePortafolioTotalChart() {
    this.portafolioTotalChartResolver.resolve(this.activateRoute.snapshot).subscribe((val: any) => {


      let fechas = new Array();
      let precios = new Array();



      val.forEach((element) => {
        fechas.push(this.convertTimestampToDate(element.fecha))
        precios.push(element.precio)
      });

      this.valorTotal = precios[precios.length-1];

      Chart.register(...registerables);
      Chart.defaults.color = "#ffffff";
      this.myChart = new Chart("myChart", {
        type: 'line',
        data: {
          labels: fechas,
          datasets: [{
            label: `Valor en ${this.divisa}`,
            data: precios,
            backgroundColor:
              'rgba(255, 255, 255, 255)',
            borderColor:
              'rgba(255, 255, 255, 255)',
            borderWidth: 1,

          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });


      console.log(val)
    });
  }

  onSubmit(formValue) {
    console.log(formValue.top100)
    console.log(formValue.operacion)
    console.log(formValue.cantidad)
    this.activo = formValue.top100
    this.cantidad = +formValue.cantidad
    if (formValue.operacion === 'add') {
      this.addActivo()
    } else if (formValue.operacion === 'substract') {
      this.substractActivo()
    }
  }
  //activo: string, cantidad: string
  addActivo() {
    this.portafolioService.addActivo(this.activo, this.cantidad).subscribe(
      res => {
        console.log(res);
        this.myChart.destroy()
        this.getActivos()
        this.getActivosInfo()
        this.resolvePortafolioTotalChart()
      }
    );
    this.portafolioService.getActivos().subscribe(
      res => {
        console.log(res);
      }
    );
  }

  substractActivo() {
    this.portafolioService.substractActivo(this.activo, this.cantidad).subscribe(
      res => {
        console.log(res);
        this.myChart.destroy()
        this.getActivos()
        this.getActivosInfo()
        this.resolvePortafolioTotalChart()
        
      }
    );
  }

  convertTimestampToDate(UNIX_Timestamp) {
    var a = new Date(UNIX_Timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
  }

  getActivosInfo(){
    this.portafolioService.getActivosInfo().subscribe(
      res => {
        console.log('Total Info: ', res);
        this.activosInfo = res;
      });
  }


  getActivos() {
    this.portafolioService.getActivos().subscribe(
      res => {
        console.log('Activos:',res);
        this.activos = res;
      }
    );
  }

}
