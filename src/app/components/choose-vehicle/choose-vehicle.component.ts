import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Planet } from 'src/app/models/planet';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-choose-vehicle',
  templateUrl: './choose-vehicle.component.html',
  styleUrls: ['./choose-vehicle.component.scss'],
})
export class ChooseVehicleComponent implements OnInit {
  @Input() vehicles!: Vehicle[];
  @Input() selectedPlanet!: Planet;
  @Input() num!: number;

  @Output() selectionChange = new EventEmitter<{
    lastSelected: Vehicle;
    currentlySelected: Vehicle;
  }>();

  selectedVehicle: string = '';
  lastSelectedVehicle!: Vehicle;

  constructor() {}

  ngOnInit(): void {}

  selectVehicle(e: any) {
    if (this.lastSelectedVehicle) {
      this.lastSelectedVehicle.selected -= 1;
    }
    const selectedVehicle = this.vehicles.find((vehicle) => vehicle.name === e);
    if (selectedVehicle) {
      this.selectionChange.emit({
        lastSelected: this.lastSelectedVehicle,
        currentlySelected: selectedVehicle,
      });
      selectedVehicle.selected += 1;
      this.lastSelectedVehicle = selectedVehicle;
    }
  }
}
