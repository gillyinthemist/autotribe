import { StringValidation } from 'zod';

export type User = {
  id: string;
  email: string;
  password: string;
};

export type VehicleDetails = {
  id: string;
  owner_id: string;
  vrm: string;
  make: string;
  model: string;
  colour: string;
  image: string;
  year: string;
  mot_days: string;
  tax_days: string;
  mot_date: string;
  tax_date: string;
  description: string;
  current: boolean;
};

export type VehicleCard = {
  id: string;
  year: string;
  make: string;
  model: string;
  image: string;
};

export type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_pic: string;
};

export type DiaryEntry = {
  id: string;
  vehicle_id: string;
  date_added: Date;
  date_completed: Date;
  entry: string;
  complete: boolean;
};
