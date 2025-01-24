import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';


import { HighchartsChartModule } from 'highcharts-angular';
import {HIGHCHARTS_MODULES} from 'angular-highcharts';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-graph-1-2',
  standalone: true,
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ Exporting,OfflineExporting ] }
  ],
  imports: [HighchartsChartModule, NgIf],
  templateUrl: './graph-2.component.html',
  styleUrl: './graph-2.component.scss'
})
export class Graph2Component {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    accessibility: {enabled: false},
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF']
        }
      }
    },
    chart: {
      type: 'column' // Type de graphique : barres verticales
    },
    title: {
      text: 'Emissions générées et évitées par catégorie de flux',
      align: 'left',
      style: {
        color: '#1A3A82',
        fontWeight: 'bold'
      }
    },
    xAxis: {
      categories: ['DD', 'DM','DND'], // Catégories
      title: {
        text: "ddrhrdtr"
      }
    },
    yAxis: {
      title: {
        text: 'Valeurs'
      }
    },
    tooltip: {
      shared: true,
      valueSuffix: ' unités'
    },
    plotOptions: {
      column: {
        stacking: 'normal', // Empilage des barres
        dataLabels: {
          enabled: true
        }
      },
      scatter: {
        marker: {
          radius: 6, // Taille des points
          symbol: 'circle'
        }
      }
    },
    series: [
      {
        name: 'Somme de Emissions évitées',
        type: 'column',
        data: [-20, 20, 50],
        color: '#9ACD32'
      },
      {
        name: 'Somme de Emissions générées',
        type: 'column',
        data: [30, 70, 200],
        color: '#1A1A82'
      },
      {
        name: 'Somme de Tonnage',
        type: 'scatter',
        data: [30, 90, 400],
        color: '#87CEFA'
      }
    ],
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    credits: {
      enabled: false
    },
  };

}
