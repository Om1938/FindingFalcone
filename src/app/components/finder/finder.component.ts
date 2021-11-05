import { IfStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Planet } from 'src/app/models/planet';
import { Vehicle } from 'src/app/models/vehicle';
import { Selection } from 'src/app/selection';
declare var $: any;
@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent implements OnInit {
  constructor(
    private readonly service: AppService,
    private readonly router: Router
  ) {}

  planets: Planet[] = [];
  vehicles: Vehicle[] = [];
  Travels = [0, 1, 2, 3];

  selections: {
    index: number;
    selection: Selection;
  }[] = [];

  ngOnInit(): void {
    this.service.getPlanets().subscribe((res: Planet[]) => {
      this.planets = res.map((planet) => {
        planet.selected = false;
        return planet;
      });
    });
    this.service.getVehicles().subscribe((res: Vehicle[]) => {
      this.vehicles = res.map((vehicle) => {
        vehicle.selected = 0;
        return vehicle;
      });
    });
    this.service.resetClickSource.subscribe(() => {
      this.planets = this.planets.map((planet) => {
        planet.selected = false;
        return planet;
      });
      this.vehicles = this.vehicles.map((vehicle) => {
        vehicle.selected = 0;
        return vehicle;
      });
      this.selections = [];
      this.Travels = [];
      setTimeout(() => {
        this.Travels = [0, 1, 2, 3];
      });
    });
  }

  togglePlanet(e: string) {
    const index = this.planets.find((planet) => planet.name == e);
    if (index) {
      index.selected = !index.selected;
    }
  }

  updateSelections(event: Selection, index: number) {
    const id = this.selections.findIndex(
      (selection) => selection.index == index
    );
    if (id != -1) this.selections.splice(id, 1);
    if (event) this.selections.push({ index, selection: event });
  }

  getTotalTime() {
    return this.selections.reduce((acc, curr) => {
      acc +=
        curr.selection.selectedPlanet.distance /
        curr.selection.selectedVehicle.speed;
      return acc;
    }, 0);
  }

  find() {
    if (this.selections.length == 4) {
      const finalResult = this.selections.reduce(
        (acc, curr) => {
          acc.planet_names.push(curr.selection.selectedPlanet.name);
          acc.vehicle_names.push(curr.selection.selectedVehicle.name);
          acc.time_taken +=
            curr.selection.selectedPlanet.distance /
            curr.selection.selectedVehicle.speed;
          return acc;
        },
        {
          planet_names: [] as string[],
          vehicle_names: [] as string[],
          time_taken: 0,
        }
      );
      this.service.findFalcon(finalResult).subscribe((res: any) => {
        this.service.result.next({ finalResult, res });
        this.router.navigate(['result']);
      });
    }
  }
}
