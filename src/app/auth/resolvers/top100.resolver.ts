import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivoRaw } from 'src/app/models/activo-raw';
import { PortafolioService } from '../../services/portafolio.service'

@Injectable()
export class Top100Resolver implements Resolve<ActivoRaw> {
    constructor(
        private portafolioService: PortafolioService
    ) {
        console.log('Resolver creado.')
    }

    resolve(): Observable<ActivoRaw> {
        return this.portafolioService.getTop100();
    }
}