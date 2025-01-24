import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IGraph1} from '../model/graph-1.model';

@Injectable({
  providedIn: 'root'
})
export class Graph1DataService{
  private dataUrl = 'assets/data/chart-data.json'; // Chemin vers le fichier JSON

  constructor(private http: HttpClient) {}

  getChartData(): Observable<IGraph1[]> {
    return this.http.get<IGraph1[]>(this.dataUrl);
  }
}
