export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  birthdate: string;
}

export interface CarSummary {
  id: number;
  model: string;
  trim: string;
  year: number;
  fuel: string;
  price: number;
  tagline: string;
  heroImage: string;
}

export interface CarColor {
  name: string;
  hex: string;
  image: string;
}

export interface CarSpecs {
  horsepower: number;
  zeroToSixty: number;
  topSpeed: number;
  transmission: string;
}

export interface CarDetail {
  id: number;
  model: string;
  trim: string;
  year: number;
  body: string;
  fuel: string;
  price: number;
  tagline: string;
  description: string;
  heroImage: string;
  colors: CarColor[];
  locked: boolean;
  specs: CarSpecs | null;
}
