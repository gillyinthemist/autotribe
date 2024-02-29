export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Vehicle = {
  id: string;
  owner_id: string;
  vrm: string;
  make: string;
  model: string;
  colour: string;
  images: string[];
  description: string;
  current: boolean;
};
