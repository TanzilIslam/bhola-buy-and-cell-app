export type DiameterRange = {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
};

export type EstimatedDiameter = {
  kilometers: DiameterRange;
  meters: DiameterRange;
  miles: DiameterRange;
  feet: DiameterRange;
};

export type CloseApproachData = {
  close_approach_date: string;
  close_approach_date_full?: string;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  orbiting_body: string;
};

export type NeoObject = {
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  is_sentry_object: boolean;
  close_approach_data: CloseApproachData[];
  orbital_data?: Record<string, string | number>;
};

export type NeoFeedResponse = {
  element_count: number;
  near_earth_objects: Record<string, NeoObject[]>;
};

export type NeoBrowseResponse = {
  page: {
    size: number;
    total_elements: number;
    total_pages: number;
    number: number;
  };
  near_earth_objects: NeoObject[];
};
