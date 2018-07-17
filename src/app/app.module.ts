import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { NouisliderModule } from 'ng2-nouislider';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { DataForChartService } from './services';

export const routes: Routes = [
  {
      path: '',
      component: AppComponent,
      children: [
          {
              path: '',
              component: HomeComponent
          },
      ]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ColumnChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    Ng2GoogleChartsModule,
    NouisliderModule,
  ],
  exports: [RouterModule],
  providers: [DataForChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
