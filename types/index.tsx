export type usersParams = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  photo: string;
  type: string;
};
// Sparepart
export type dataSparepartParams = {
  sparepart: string;
  produksi: string;
  stock: number;
  spesifikasi: string;
  merek: string;
  imageUrl: string[];
};

export type dataTableSparepartParams = {
  id: string;
  sparepart: string;
  produksi: string;
  stock: number;
  spesifikasi: string;
  merek: string;
  imageUrl: string[];
};

export type updateSparepartParams = {
  id: string;
  sparepart: string;
  produksi: string;
  stock: number;
  spesifikasi: string;
  merek: string;
  imageUrl: string;
};
// Rekanan
export type dataRekananParams = {
  id: string;
  nama: string;
  unit: number;
};
// urgent
export type dataUrgentParams = {
  id: string;
  qty: number;
  nourgent: string;
  sparepartId: string;
  ket: string;
};
// penawaran
export type dataPenawaranParams = {
  nopnw: string;
  sparepartId: string;
  qty: number;
  ket: string;
};
// tracking
export type dataTrackingParams = {
  sparepartId: string;
  rekananId: string;
  notracking: string;
};
// data Survey
export type dataSurveyParams = {
  qty: number;
  sparepartId: string;
  nosurvey: string;
  rekananId: string;
  ket: string;
  unit: string;
};
// Prmarketing
export type dataPrMarketingParams = {
  qty: number;
  noPR: string;
  sparepartId: string;
  rekananId: string;
  ket: string;
};
// garansi
export type dataGaransiParams = {
  qty: number;
  nogaransi: string;
  sparepartId: string;
  ket: string;
};

// Faisal
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
  penilaians: number[];
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

export type GetRelatedEventsByCategoryParams = {
  kostId: string;
  limit?: number;
  page: number | string;
};
