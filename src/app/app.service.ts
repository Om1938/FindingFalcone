import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Planet } from './models/planet';
import { Result } from './models/result';
import { Vehicle } from './models/vehicle';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  URL = environment.server;
  headers = new HttpHeaders();
  resetClickSource = new Subject();
  constructor(private _http: HttpClient) {}

  result = new BehaviorSubject<Result>({
    finalResult: { planet_names: [], vehicle_names: [], time_taken: 0 },
    res: {},
  });

  getPlanets(): Observable<Planet[]> {
    return this._http.get<Planet[]>(`${this.URL}planets`);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this._http.get<Vehicle[]>(`${this.URL}vehicles`);
  }

  findFalcon(finalResult: { planet_names: string[]; vehicle_names: string[] }) {
    return this.getToken().pipe(
      mergeMap((token: { token: string }) => {
        const body = { token: token.token, ...finalResult };
        return this._http.post(`${this.URL}find`, body);
      })
    );
  }

  getToken() {
    return this._http.post<{ token: string }>(`${this.URL}token`, null);
  }
  resetSearch() {
    this.resetClickSource.next(true);
  }
}
