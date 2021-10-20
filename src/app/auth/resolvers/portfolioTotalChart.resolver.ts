import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TotalPortafolio } from 'src/app/models/total-portafolio';
import { PortafolioService } from '../../services/portafolio.service'

@Injectable()
export class PortafolioTotalChartResolver implements Resolve<Array<TotalPortafolio>> {
    constructor(
        private portafolioService: PortafolioService
    ) {
        console.log('Resolver creado.')
    }

    resolve(_route: ActivatedRouteSnapshot): Observable<Array<TotalPortafolio>> {
        return this.portafolioService.getPortfolioTotalChart();
    }
}