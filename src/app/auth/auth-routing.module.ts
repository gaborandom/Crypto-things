import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { PortafolioComponent } from './portafolio/portafolio.component'
import { Top100Resolver } from './resolvers/top100.resolver';
import { PortafolioTotalChartResolver } from './resolvers/portfolioTotalChart.resolver';
import { ChartComponent } from './chart/chart.component';
const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'charts', component: ChartComponent, 
        resolve: {
            top100: Top100Resolver,
        }
    },
    {
        path: 'portafolio',
        component: PortafolioComponent,
        resolve: {
            top100: Top100Resolver,
            portfolioTotalChart: PortafolioTotalChartResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }