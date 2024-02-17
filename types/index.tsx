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
export type kostParamsHomes = {
  id: string;
  kost: string;
  category: string;
  room: string;
  description: string;
  location: string;
  imageUrl: string[];
  price: string;
  url: string;
  createdAt: Date;
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

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
