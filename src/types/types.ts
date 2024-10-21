// src/types.ts
export interface PerkiraanBoQ {
    name: string;
    link: string;
    _id: string;
  }
  
  export interface RuasDetails {
    _id: string;
    arnet_tujuan: string;
    ruas: string;
    lokasi_asal: string;
    lokasi_tujuan: string;
    nama_kabel: string;
    jenis_fo: string;
    jenis_kabel: string;
    tipe_main_protect: string;
    distance: number;
    keterangan: string;
    tahun_operasi: number;
    __v: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ArnetDetails {
    _id: string;
    arnet_name: string;
    district_name: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NiqeData {
    _id: string;
    ruas_id: string;
    prioritas: number;
    panjang: number;
    perkiraan_BoQ: PerkiraanBoQ[];
    jumlah_core: number;
    idle_baik: number;
    idle_rusak: number;
    core_operasi: number;
    justifikasi: string;
    vendor: string;
    services: string;
    perkiraan_revenue: number;
    tanggal_pengerjaan: string; // Consider using Date if needed
    latestProgress: string;
    ruasDetails: RuasDetails;
    arnetDetails: ArnetDetails;
  }
  