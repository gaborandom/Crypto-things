import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../services/auth.service';
import { PortafolioService } from '../services/portafolio.service';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { Top100Resolver } from './resolvers/top100.resolver'
import { ReactiveFormsModule } from '@angular/forms';
import { PortafolioTotalChartResolver } from './resolvers/portfolioTotalChart.resolver';
import { MenuComponent } from './menu/menu.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, PortafolioComponent, MenuComponent, ChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    ReactiveFormsModule

  ],
  providers: [
    AuthService,
    PortafolioService,
    Top100Resolver,
    PortafolioTotalChartResolver,
    ReactiveFormsModule
  ],
  exports: [MenuComponent],
})
export class AuthModule { }
