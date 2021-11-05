import { Planet } from './models/planet';
import { Vehicle } from './models/vehicle';

export interface Selection {
  selectedPlanet: Planet;
  selectedVehicle: Vehicle;
}
