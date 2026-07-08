/**
 * Types definition for DKW Garda Bangsa Papua Barat
 */

export interface Kader {
  id: string;
  name: string;
  nik: string;
  email: string;
  phone: string;
  dpc: string; // Kabupaten/Kota di Papua Barat
  address: string;
  gender: 'Laki-laki' | 'Perempuan';
  age: number;
  photoUrl?: string;
  status: 'Aktif' | 'Pending' | 'Ditolak';
  joinedDate: string;
  isVerified: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Internal' | 'Event' | 'Opini' | 'Rilis Pers';
  imageUrl: string;
  date: string;
  author: string;
  reads: number;
  likes: number;
}

export interface DpcStatus {
  id: string;
  name: string;
  chairman: string;
  membersCount: number;
  pendingCount: number;
  status: 'Aktif' | 'Pasif' | 'Konsolidasi';
  lastUpdate: string;
  activityLevel: number; // percentage 0-100
}

export interface OrganogramNode {
  id: string;
  role: string;
  name: string;
  title: string;
  photoUrl?: string;
  description?: string;
  subNodes?: OrganogramNode[];
}

export interface ProgramKerja {
  id: string;
  name: string;
  description: string;
  category: 'Ekonomi' | 'Sosial & Lingkungan' | 'Kaderisasi' | 'Teknologi & Media';
  imageUrl: string;
  status: 'Berjalan' | 'Selesai' | 'Perencanaan';
  highlights: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'Belum Dibaca' | 'Sudah Dibaca' | 'Dibalas';
}

export interface WebsiteSettings {
  id: string;
  logoUrl: string;
  primaryColor: string; // Hex color code
  secondaryColor: string; // Hex color code
  themeName: 'emerald' | 'sapphire' | 'amber' | 'rose' | 'slate' | 'gold';
  updatedAt: string;
  updatedBy: string;
  templateStyle?: 'modern' | 'minimal' | 'elegant' | 'patriotic' | 'tech';
  customTitle?: string;
}
