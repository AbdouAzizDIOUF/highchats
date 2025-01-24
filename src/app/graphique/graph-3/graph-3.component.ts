import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';


import { HighchartsChartModule } from 'highcharts-angular';
import {HIGHCHARTS_MODULES} from 'angular-highcharts';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-graph-1-3',
  standalone: true,
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ Exporting,OfflineExporting ] }
  ],
  imports: [HighchartsChartModule, NgIf],
  templateUrl: './graph-3.component.html',
  styleUrl: './graph-3.component.scss'
})
export class Graph3Component {
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
      type: 'bar' // Barres horizontales
    },
    title: {
      text: 'Emissions par tonne de déchet/matière',
      align: 'left',
      style: {
        color: '#000000',
        fontWeight: 'bold'
      }
    },
    xAxis: {
      categories: [
        'Biodéchets',
        'Cartons',
        'DDAE',
        'DEEE',
        'DNDAE',
        'Métaux ferreux',
        'Papiers',
        'Papiers kraft spécifique',
        'PET',
        'Piles & accumulateurs',
        'Solvants non halogénés (solvants pétroliers)'
      ],
      title: {
        text: null
      }
    },
    yAxis: {
      title: {
        text: 't CO2e/tonne'
      },
      min: -3,
      max: 4
    },
    tooltip: {
      shared: true,
      valueSuffix: ' t CO2e/tonne'
    },
    plotOptions: {
      series: {
        stacking: 'normal', // Empilage
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: 'Somme de Ratio Emissions évitées (t CO2e/tonne)',
        type: 'bar',
        data: [0.1, 0.3, 0.2, 0.1, 0.8, 2.5, 0.2, 1.5, 1.8, 1.2, 1.1],
        color: '#9ACD32' // Vert
      },
      {
        name: 'Somme de Ratio Emissions générées (t CO2e/tonne)',
        type: 'bar',
        data: [-0.5, -0.8, -0.3, -0.2, -0.6, -2.8, -0.4, -1.0, -1.2, -1.5, -3.0],
        color: '#1A1A82' // Bleu foncé
      }
    ],
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    credits: {
      enabled: false // Supprime le logo Highcharts
    },
  };

}
