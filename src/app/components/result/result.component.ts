import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Result } from 'src/app/models/result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnDestroy {
  resultObj: Result;
  subscriptions!: Subscription;
  constructor(private _service: AppService, private readonly _router: Router) {
    this.resultObj = this._service.result.value;
    if (
      this.resultObj.finalResult.planet_names.length < 1 ||
      this.resultObj.finalResult.vehicle_names.length < 1 ||
      !this.resultObj.res
    ) {
      alert('Please Select the planets first');
      _router.navigate(['']);
    }
  }
  ngOnInit(): void {
    this.subscriptions = this._service.resetClickSource.subscribe(() => {
      this._router.navigate(['']);
    });
  }
  getMessage() {
    return this.resultObj.res.status === 'success'
      ? 'Congratulations on finding Falcone, King Shan is mighty pleased.'
      : 'King Shan is mighty angry and asks to retry.';
  }
  reset() {
    this._router.navigate(['']);
  }
  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
  }
}
