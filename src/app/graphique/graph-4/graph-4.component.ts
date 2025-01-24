import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';


import { HighchartsChartModule } from 'highcharts-angular';
import {HIGHCHARTS_MODULES} from 'angular-highcharts';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-graph-1-4',
  standalone: true,
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ Exporting,OfflineExporting ] }
  ],
  imports: [HighchartsChartModule, NgIf],
  templateUrl: './graph-4.component.html',
  styleUrl: './graph-4.component.scss'
})
export class Graph4Component {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'xy' // Permet d'avoir deux axes Y
    },
    title: {
      text: 'Emissions de la collecte par rotation par flux de déchets',
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
        'Solvants non halogénés'
      ],
      crosshair: true,
      labels: {
        rotation: -45 // Incline les labels pour mieux les lire
      }
    },
    yAxis: [
      {
        title: {
          text: 'Somme de Rotations'
        },
        opposite: false // Axe principal (gauche)
      },
      {
        title: {
          text: 'Emissions générées (t CO2e/rotation)'
        },
        opposite: true // Axe secondaire (droite)
      }
    ],
    tooltip: {
      shared: true // Tooltip partagé entre les séries
    },
    series: [
      {
        name: 'Somme de Rotations',
        type: 'column',
        data: [5, 30, 1, 2, 10, 15, 8, 6, 4, 3, 2],
        color: '#87CEFA', // Bleu clair
        tooltip: {
          valueSuffix: ''
        }
      },
      {
        name: 'Somme de Ratio Emissions générées collecte (t CO2e/rotation)',
        type: 'scatter',
        yAxis: 1, // Utilise l'axe secondaire
        data: [0.01, 0.07, 0.02, 0.03, 0.06, 0.05, 0.02, 0.01, 0.01, 0.01, 0.01],
        color: '#1A1A82', // Bleu foncé
        tooltip: {
          valueSuffix: ' t CO2e/rotation'
        },
        marker: {
          radius: 5,
          symbol: 'circle'
        }
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
    exporting: {
      enabled: true, // Active l'exportation
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF']
        }
      }
    }

  };

}
