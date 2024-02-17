export type usersParams = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  photo: string;
  type: string;
};

export type kostParams = {
  kost: string;
  category: string;
  room: string;
  description: string;
  location: string;
  imageUrl: string[];
  price: string;
  url: string;
};

export type kriteriaParams = {
  kriteria: string;
  bobot: number;
};

export type addSubkriteriaParams = {
  subkriteria: string;
  bobot: number;
  kriteriaId: string;
};
export type subkriteriaParams = {
  id: string;
  subkriteria: string;
  bobot: number;
  kriteriaId: string;
  kriterias: [
    {
      kriteria: string;
      bobot: string;
    }
  ];
};
