export type PlanetsType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  films: string[],
  created: string,
  edited: string,
  url: string,
};

export type PlanetsSearched = {
  count: number,
  next: string,
  previous: string,
  results: PlanetsType[],
};
