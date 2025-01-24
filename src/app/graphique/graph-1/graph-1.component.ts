import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';


import { HighchartsChartModule } from 'highcharts-angular';
import {HIGHCHARTS_MODULES} from 'angular-highcharts';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-graph-1-one',
  standalone: true,
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ Exporting,OfflineExporting ] }
  ],
  imports: [HighchartsChartModule, NgIf],
  templateUrl: './graph-1.component.html',
  styleUrl: './graph-1.component.scss'
})
export class Graph1Component {
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
      categories: ['DD', 'DND'], // Catégories
      title: {
        text: "la description du graphique"
      },
      width: 600, // la taille des barres
    },
    yAxis: {
      title: {
        text: 'Valeurs',
      },
      tickInterval: 50
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
        },
        dataLabels: {
          enabled: true, // Affiche les valeurs directement
          align: 'center', // Centre les labels par rapport au marqueur
          verticalAlign: 'bottom', // Positionne au-dessus du marqueur
          y: -10, // Décalage pour l'afficher légèrement au-dessus
          format: '{y}', // Affiche uniquement la valeur
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#000000'
          }
        }
      }
    },
    series: [
      {
        name: 'Somme de Emissions évitées',
        type: 'column',
        data: [-20, 50],
        color: '#9ACD32'
      },
      {
        name: 'Somme de Emissions générées',
        type: 'column',
        data: [30, 200],
        color: '#1A1A82'
      },
      {
        name: 'Somme de Tonnage',
        type: 'scatter',
        data: [30, 300],
        color: '#87CEFA',
        dataLabels: {
          enabled: true, // Directement au-dessus des points
          format: '{y}', // Affiche la valeur du point
          y: -15, // Décale le texte au-dessus
          style: {
            fontWeight: 'bold',
            fontSize: '12px',
            color: '#000000'
          }
        }
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
