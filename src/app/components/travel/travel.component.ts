import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Planet } from 'src/app/models/planet';
import { Vehicle } from 'src/app/models/vehicle';
import { Selection } from 'src/app/selection';

declare var $: any;

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
})
export class TravelComponent implements OnInit {
  constructor() {}

  @Input() planets!: Planet[];
  @Input() vehicles!: Vehicle[];

  @Output() planetChange = new EventEmitter<string>();
  @Output() changes = new EventEmitter<Selection>();

  @Input() num!: number;

  currentlySelected!: Planet;
  currentlySelectedVehicle: Vehicle | undefined;

  timeTaken: number = 0;
  showRadios: boolean = false;

  togglePlanet(e: string | number) {
    this.showRadios = false;
    this.timeTaken = 0;

    this.changes.emit(undefined);

    if (this.currentlySelectedVehicle)
      this.currentlySelectedVehicle.selected -= 1;

    this.currentlySelectedVehicle = undefined;
    setTimeout(() => {
      this.showRadios = !!this.currentlySelected;
    });

    if (this.currentlySelected) {
      const curr = this.planets.find(
        (planet) => planet.name == this.currentlySelected.name
      );
      if (curr) {
        curr.selected = !curr.selected;
      }
    }
    const index = this.planets.find((planet) => planet.name == e);
    if (index) {
      index.selected = !index.selected;
      this.currentlySelected = index;
    }
  }

  vehicleChange(event: { lastSelected: Vehicle; currentlySelected: Vehicle }) {
    this.timeTaken =
      this.currentlySelected.distance / event.currentlySelected.speed;
    this.currentlySelectedVehicle = event.currentlySelected;

    if (this.currentlySelected && event.currentlySelected) {
      this.changes.emit({
        selectedPlanet: this.currentlySelected,
        selectedVehicle: event.currentlySelected,
      });
    }
  }

  ngOnInit(): void {}
}
