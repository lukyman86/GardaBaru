import { Kader, NewsArticle, DpcStatus, OrganogramNode, ProgramKerja, ContactMessage } from './types';

// Hotlink resources dari design system user
export const ASSETS = {
  LOGO: "/src/assets/images/garda_bangsa_logo_transparent_1783525240906.jpg",
  HERO_BG: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6y7ELF6UPDKP-ID2pb9bqS-BV2aFnjKeeaq-f0DBgVWejpxcrfyv8O9LI4Wubd3VEXmGIreO1ii7-vyn38RpmJEcNJHBCOYKVNaneanI2jEuLEdJnrc-LOUNjnDxGRpJU5wywpo92pKa7UNY5GTI5L611x_g45n2k9PdF9BrXHRIb-wTAtixv0n0Fa8n3Q47VvTdyYuRq2hhgQ_6PoG9zoF9ysQ68Tfgx29qyjnEjBVMNQe9o7i6DZvlOuYDloVkzhAwl4X3Yvw",
  CHAIRMAN_PHOTO: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPCNKPwHS9Qlm5Ri8xYpI_UYp5DN5-7H01pDQn0vNwt0ivsnsrWln6-t7pQPuSxdQpGQpIybZac7EWlo6yS0LxKC43wv8vKU0L_gqI6du8tMkZDFLITrwCWi0fKcWzXDtyWULi3BEVGQfXyKWR9QoJVvFBHvGXpleXlSQmRBm2nUQQmX5MAZZY7Eyc4NNqLj_g14sOvLynHSZLGF5dq6XLwtFeCkbFrWQ8Ts8fWS_FB1RQskefGCAjRHMeAg1nHiaBh6dvM9cT9w",
  CIRCULAR_LOGO: "https://lh3.googleusercontent.com/aida-public/AB6AXuBycuV8po0TYdltTHGHClxvbwdBu7ogSL8siHOawHG18LCI0vCHvujvWKySxUxIT7CTXvNA63ehtOSPypxV2rba9PxmTLiIPzOj2VBiNnZ8VIN2mq6b7gd7CsZ39FwOxElImC9Fezdta7ITSXoLYdY12X2-ZESQb_J7lOxqpntItipVnFLqqTIS4pg6L8alK_gJTfz_HCU7fEIjllCgFi8G30QSpKhqIiWSU-kDp-fJS_lEYJh9Qf38m-KIh8-5PIfoC9JHeQVrmQ",
  MAP_BG: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-LPtdkisd3ceINchHZmAZ1fFK7gwK4_Lmk2ippXgPhrhZqGW3oXtNxt1ra4sdXXAioWMoO52rkMsDljoU-zHOlmLowiHt9TVFErHGiX1TOJBQKIFqtc16Gi00gXxTWlIToAFk-GKppX5TyLrEj0TUoFxUBUAyoDvSdx8fY1UyZT1s77fdCPkZL_T6RggTo08wXT2d5HNPUYThY6geqhPcHiHUW27CW4maz6-tViwRLJhYDu5wnyZC1jyxr-S--Kprz2USX_S0-A",
  ADMIN_PHOTO: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzpk1Wa_T-SjEDZcfxftotnROixYg7dDMIysi-bKR70ehKFLbs0CAvDYJP6JaDxApyddgzhqcVbmpbd0wRK7cARlAZegdPjDD5YNoJqL-j5yM86v6P0tpBKxbARqemufb2_RbUEBMcTeDqAsy9qQGWnMcjzCUDY4O9TC7wHuPWbjNRqnA6YT3VeQtKGy9oDYU8FcKJuZbEmR5fUzLLqSWdzDYymMucVyrvTt8ETFc8VWA7OOlsfJvJfYSZW9gOpy6qOb7E9Jkfgw"
};

export const INITIAL_KADER: Kader[] = [
  {
    id: "KDR-001",
    name: "Marten Mandacan",
    nik: "9201021503950002",
    email: "marten.m@garda.or.id",
    phone: "081244558811",
    dpc: "Manokwari",
    address: "Jl. Merdeka No. 12, Sanggeng, Manokwari",
    gender: "Laki-laki",
    age: 28,
    status: "Aktif",
    joinedDate: "2025-01-15",
    isVerified: true
  },
  {
    id: "KDR-002",
    name: "Yohana Sesa",
    nik: "9202055107980001",
    email: "yohana.sesa@garda.or.id",
    phone: "082199887766",
    dpc: "Sorong",
    address: "Jl. Ahmad Yani No. 45, Klademak, Sorong",
    gender: "Perempuan",
    age: 26,
    status: "Aktif",
    joinedDate: "2025-02-10",
    isVerified: true
  },
  {
    id: "KDR-003",
    name: "Abraham Kambu",
    nik: "9203102211940003",
    email: "abraham.k@gmail.com",
    phone: "085244112233",
    dpc: "Fakfak",
    address: "Jl. Kadamber, Fakfak Utara, Fakfak",
    gender: "Laki-laki",
    age: 30,
    status: "Pending",
    joinedDate: "2026-06-20",
    isVerified: false
  },
  {
    id: "KDR-004",
    name: "Salomi Dowansiba",
    nik: "9204084412990002",
    email: "salomi.d@garda.or.id",
    phone: "081377884455",
    dpc: "Pegunungan Arfak",
    address: "Kp. Anggi, Distrik Anggi, Pegunungan Arfak",
    gender: "Perempuan",
    age: 25,
    status: "Aktif",
    joinedDate: "2025-04-05",
    isVerified: true
  },
  {
    id: "KDR-005",
    name: "Fachry Al-Hamid",
    nik: "9205011809960001",
    email: "fachry.alhamid@gmail.com",
    phone: "081122334455",
    dpc: "Kaimana",
    address: "Jl. Trikora, Krooy, Kaimana",
    gender: "Laki-laki",
    age: 29,
    status: "Aktif",
    joinedDate: "2025-03-12",
    isVerified: true
  },
  {
    id: "KDR-006",
    name: "Sarah Wenda",
    nik: "9206034204950004",
    email: "sarah.wenda@gmail.com",
    phone: "082355449900",
    dpc: "Teluk Bintuni",
    address: "Kompleks Perumahan Pemda, Bintuni",
    gender: "Perempuan",
    age: 31,
    status: "Pending",
    joinedDate: "2026-07-02",
    isVerified: false
  },
  {
    id: "KDR-007",
    name: "Albertus Rumbekwan",
    nik: "9207010408970005",
    email: "albert.rumb@garda.or.id",
    phone: "081266778899",
    dpc: "Teluk Wondama",
    address: "Jl. Rasiei, Wasior, Teluk Wondama",
    gender: "Laki-laki",
    age: 27,
    status: "Aktif",
    joinedDate: "2025-05-20",
    isVerified: true
  },
  {
    id: "KDR-008",
    name: "Maria Regina",
    nik: "9202026510960007",
    email: "maria.regina@gmail.com",
    phone: "082199881122",
    dpc: "Sorong Selatan",
    address: "Jl. Teminabuan, Sorong Selatan",
    gender: "Perempuan",
    age: 28,
    status: "Ditolak",
    joinedDate: "2026-05-15",
    isVerified: false
  },
  {
    id: "KDR-009",
    name: "Zeth Wonggor",
    nik: "9201011212930008",
    email: "zeth.wonggor@garda.or.id",
    phone: "081399881144",
    dpc: "Manokwari Selatan",
    address: "Jl. Trans Papua, Ransiki, Manokwari Selatan",
    gender: "Laki-laki",
    age: 32,
    status: "Aktif",
    joinedDate: "2025-02-28",
    isVerified: true
  },
  {
    id: "KDR-010",
    name: "Nirmala Sari",
    nik: "9203125406000003",
    email: "nirmala.sari@gmail.com",
    phone: "085377661100",
    dpc: "Fakfak",
    address: "Jl. Diponegoro, Fakfak Selatan",
    gender: "Perempuan",
    age: 24,
    status: "Pending",
    joinedDate: "2026-07-05",
    isVerified: false
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: "NWS-001",
    title: "Musyawarah Wilayah Garda Bangsa Papua Barat",
    excerpt: "Musyawarah Wilayah (Muswil) Garda Bangsa Provinsi Papua Barat resmi diselenggarakan di Manokwari, menghasilkan sinergi kepemimpinan baru untuk kemajuan pemuda.",
    content: `Dewan Koordinasi Wilayah (DKW) Garda Bangsa Provinsi Papua Barat secara resmi menggelar Musyawarah Wilayah (Muswil) perdana di Kota Manokwari. Acara yang bertajuk "Satu Barisan Pemuda Membangun Papua Barat" ini dihadiri oleh perwakilan DPC dari seluruh Kabupaten/Kota di Papua Barat, jajaran pengurus Dewan Koordinasi Nasional (DKN) Garda Bangsa, serta tokoh masyarakat adat Papua.

Dalam pidato pembukaannya, Ketua terpilih Fadhlurrahman Anshari, S.Pd, S.H menekankan pentingnya peran aktif pemuda Papua Barat dalam mengawal isu-isu strategis, pembangunan ekonomi kreatif, serta penguatan toleransi antar umat beragama. Beliau menyerukan seluruh kader untuk merapatkan barisan dan bergerak selaras dalam mewujudkan program kerja nyata yang berdampak langsung pada masyarakat akar rumput.

"Pemuda bukan sekadar penonton masa depan, kita adalah pelaku aktif pembentuk masa depan Papua Barat yang sejahtera, adil, dan mandiri," ucap Fadhlurrahman Anshari yang disambut tepuk tangan riuh peserta musyawarah.

Muswil ini menghasilkan sejumlah rekomendasi strategis, termasuk program akselerasi digital bagi pemuda pedesaan, inisiasi UMKM berbasis adat (Garda Preneur), dan komitmen untuk menjaga perdamaian serta stabilitas wilayah menjelang kontestasi politik lokal.`,
    category: "Internal",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuHyaauZ_0GMYTbsvLMLSaz7rStKHUX6YZAZPVosZjBHQvPtnLY1prLt3O2NbTL3aCF2fqj9zBuYa0IKA_eRPnKZnfEUcDHAUJNQ-dC--uYerjK2zaA2unz_ANIQjvoaHbQoVcOhKq23BI1-TMPH5_XH22z8FF3AOl85CQPzP2cCfJA8_42jzaw9Xoj0NTP7le4uESZE49nCyCyc4MUUBcWgF-DyetWaxRSQv-44GiBIEtaxhNjZEDH4Bjt2azfF9p7ojk75wR1A",
    date: "2026-06-15",
    author: "Hendra Pratama",
    reads: 425,
    likes: 128
  },
  {
    id: "NWS-002",
    title: "Program Beasiswa Kader Unggul Garda Bangsa Resmi Dibuka",
    excerpt: "Garda Bangsa Papua Barat meluncurkan program beasiswa khusus untuk kader potensial yang ingin melanjutkan studi tinggi di bidang kepemimpinan dan kebijakan publik.",
    content: `Garda Bangsa Papua Barat berkomitmen penuh pada pengembangan kualitas sumber daya manusia (SDM) lokal dengan meluncurkan "Beasiswa Kader Unggul Papua Barat". Program beasiswa ini ditujukan bagi anggota aktif Garda Bangsa yang menunjukkan dedikasi luar biasa dalam pengabdian masyarakat serta memiliki prestasi akademis memukau.

Menurut Bendahara Wilayah, Maria J. Wandik, pendanaan beasiswa ini bersumber dari kemitraan strategis dengan berbagai yayasan pendidikan nasional serta dukungan alokasi khusus internal partai. Beasiswa ini akan mencakup biaya kuliah penuh, tunjangan buku, serta bimbingan kepemimpinan intensif selama masa studi berjalan.

"Kami tidak ingin ada anak muda potensial di Papua Barat yang terhenti mimpinya hanya karena kendala finansial. Ini adalah investasi jangka panjang kami untuk melahirkan pemimpin-pemimpin masa depan Papua," jelas Maria J. Wandik saat konferensi pers.

Pendaftaran akan dibuka secara online melalui sistem basis data keanggotaan Garda Bangsa, dan proses seleksi ketat akan dilaksanakan oleh tim akademis independen untuk memastikan objektivitas penerima bantuan.`,
    category: "Event",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAg2Z8IbJgMXKCuXik7eIzwd8CrwdfMIJVA4n1SW4CIafGI3_y8bWF1e8MzVMNiEPXKLZapNp19g-Aq2KCFTysIHDc-PnuUBwI4uwo1cNKEr3XYomuuYUF-KNHzF9HeOkUs8l2Pb01chZ4hPgFgOC9cqPWSy7LQv8YRrfni9n3td1cQbktxS9yBsgrTEhBEUjI4XI0Gi2hEXfoda1hgoBnimGMQF819rUj0f2Xizg5SXyZBSZjwBaC0ZDGBJ8GY4RooebzOxAHVRA",
    date: "2026-06-22",
    author: "Drs. Ahmad Fauzi",
    reads: 312,
    likes: 98
  },
  {
    id: "NWS-003",
    title: "Gerakan Hijau: Aksi Penanaman Mangrove di Pesisir Pantai",
    excerpt: "Puluhan kader Garda Bangsa turun langsung menanam ribuan bibit mangrove guna menanggulangi erosi pantai dan melestarikan ekosistem pesisir Papua Barat.",
    content: `Dalam rangka memperingati Hari Lingkungan Hidup, Garda Bangsa Papua Barat menyelenggarakan aksi nyata "Green Papua Movement: Selamatkan Pesisir Kita" dengan melakukan penanaman 2.500 bibit mangrove di kawasan pesisir pantai Manokwari.

Aksi lingkungan ini diinisiasi secara kolaboratif bersama dinas lingkungan hidup setempat, komunitas adat pesisir, serta organisasi mahasiswa pencinta alam. Penanaman mangrove ini bertujuan utama untuk mengembalikan fungsi ekologis pantai yang mulai terancam oleh abrasi akibat pemanasan global dan pembangunan infrastruktur tanpa amdal yang memadai.

Sekretaris Wilayah, Drs. Ahmad Fauzi, menyatakan bahwa gerakan ini adalah perwujudan dari salah satu visi pilar organisasi Garda Bangsa, yaitu kelestarian ekosistem alam Papua. "Papua adalah paru-paru dunia. Menjaga kelestarian alamnya adalah amanat leluhur dan tugas mutlak generasi muda kita saat ini," tegas beliau.

Kegiatan serupa direncanakan akan terus digalakkan secara berkala di kabupaten-kabupaten pesisir lainnya, seperti Kaimana, Fakfak, dan Sorong Selatan dengan melibatkan masyarakat nelayan lokal secara aktif dalam merawat bibit yang telah ditanam.`,
    category: "Rilis Pers",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqlGdLOlbkQbAXcijPEC1yOIrT5G0d536upLze259_wrCDFvug1thYtf885F_EntOTeuAgGguQnpNOIYrvoNUTE-Z0723eyglvtHB837fua4RHGe_czfRYKo_qRIi8C4I91FyYQwB2Pv395CzNFH639mwPyiIhiU9mcSXy5hnKkPlF_mDvjAxxEBtREgFQCIhjVICA4Rfvdtb078ZsdK0EFBultCJ2TSam4aDsovRCNH-GoZQFW45Vs37lKlRpv33X_QEe0-U50Q",
    date: "2026-07-01",
    author: "Hendra Pratama",
    reads: 250,
    likes: 110
  },
  {
    id: "NWS-004",
    title: "Workshop Digital Marketing untuk Wirausaha Muda Papua",
    excerpt: "Garda Bangsa memfasilitasi puluhan pengusaha UMKM muda untuk belajar digital marketing guna menembus pasar nasional dan meningkatkan pendapatan ekonomi.",
    content: `Dalam upaya mempercepat pemulihan ekonomi kreatif pasca pandemi, Garda Bangsa Papua Barat melalui 'Garda Preneur' menyelenggarakan Workshop Intensif Digital Marketing bertajuk "UMKM Papua Go Digital!". Workshop ini diselenggarakan secara gratis bagi wirausaha muda asli Papua (OAP) di Sorong.

Para peserta workshop diberikan pemahaman mendalam mulai dari pembuatan konten visual produk yang menarik, teknik penulisan deskripsi kreatif (copywriting), hingga pemanfaatan iklan berbayar di media sosial dan marketplace terkemuka nasional.

"Melalui workshop ini, kami ingin membekali wirausaha muda Papua dengan alat tempur digital modern agar produk khas kita, seperti noken, kopi senafi, dan kerajinan kerang, bisa dikenal luas tidak hanya di Papua Barat melainkan di seluruh pelosok Indonesia bahkan dunia," kata Ketua DKW Fadhlurrahman Anshari.

Sebagai tindak lanjut dari kegiatan ini, para peserta akan didampingi secara khusus oleh tim mentor digital Garda Bangsa selama 3 bulan penuh guna memantau perkembangan trafik penjualan produk mereka secara real-time.`,
    category: "Event",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAui31fnuqgy9RPkE0umPJBKdyq27qmaSpisSL3hGncptUH3jRHGiGgru0mQRiLgB3KAAh8zopdno2u-aoqPw30AGsK3Y3Gfe2DxnST85UCL0u_mxacmtF2V3ec4RCgLU8s9C5PFnbhYkl4Qs8V6lPEeufSsAcAaZCtpjGLHR0s29KKvYtlr3v18vbJ6AvbMt9y7W5hI3DPJEqAmT2ausaqKAtqXrzYIabv1e3NiXVYlMp8Og-E8A0hRvBcNnYy7gdGPAvVl43FxA",
    date: "2026-07-04",
    author: "Maria J. Wandik",
    reads: 189,
    likes: 72
  },
  {
    id: "NWS-005",
    title: "Laporan Kinerja Bulanan: Konsolidasi Struktur DPC Dipercepat",
    excerpt: "Rapat koordinasi wilayah melaporkan percepatan pembentukan dan pemantapan kepengurusan DPC Garda Bangsa di 12 Kabupaten dan 1 Kota se-Papua Barat.",
    content: `DKW Garda Bangsa Papua Barat mengadakan Rapat Koordinasi Wilayah (Rakorwil) bulanan secara daring guna mengevaluasi kinerja masing-masing DPC di daerah. Agenda utama rapat ini adalah pelaporan progres pemutakhiran basis data kader melalui sistem registrasi digital serta konsolidasi kepengurusan tingkat ranting.

Laporan yang dipaparkan oleh Kepala Bidang Kaderisasi, Hendra Pratama, menunjukkan tren yang sangat positif. Sebanyak 9 dari 13 wilayah Kabupaten/Kota di Papua Barat telah merampungkan 100% struktur kepengurusannya hingga tingkat kecamatan (Distrik). Sisa wilayah lainnya ditargetkan selesai paling lambat akhir triwulan ini.

"Verifikasi data secara digital ini sangat penting untuk akuntabilitas organisasi. Kita ingin memastikan bahwa angka keanggotaan kita riil dan solid di lapangan, bukan sekadar nama di atas kertas," papar Hendra Pratama.

DKW juga memberikan apresiasi khusus bagi DPC Manokwari dan DPC Sorong yang meraih predikat keaktifan dan kecepatan konsolidasi terbaik pada periode penilaian bulan ini.`,
    category: "Internal",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuARXYXV6QPGUGd6EY0S6Co0d8ksnqJjka5WUI7gqVEJ45CEF-PSsHSmoeeAaW83EC7Yi6y7NQVgwDfdbfCBQrG3AHgz5HtyxSdAhtX0CrY1uXLbxo5eVx-PQwjCVL2Z2P9ErGgyZQ-Tvlxl3YoFE8lOpEyvZc6unTj74pTOhgyGp705FUb_FXqt34wTRQHakPa4WWjsuQ3iO0qFxk8ROwOr0LZLBvFtXUo9NOHk-yJJAYljgZMua0ge9uPY53YLkVOaWNqPzWzfmQ",
    date: "2026-07-07",
    author: "Hendra Pratama",
    reads: 145,
    likes: 64
  }
];

export const INITIAL_DPC: DpcStatus[] = [
  { id: "DPC-01", name: "Manokwari", chairman: "Oktovianus Dowansiba", membersCount: 1540, pendingCount: 42, status: "Aktif", lastUpdate: "2026-07-07", activityLevel: 95 },
  { id: "DPC-02", name: "Sorong", chairman: "M. Yusuf Rumatoroy", membersCount: 1820, pendingCount: 58, status: "Aktif", lastUpdate: "2026-07-06", activityLevel: 92 },
  { id: "DPC-03", name: "Fakfak", chairman: "Ismail Kabes", membersCount: 920, pendingCount: 14, status: "Aktif", lastUpdate: "2026-07-05", activityLevel: 80 },
  { id: "DPC-04", name: "Kaimana", chairman: "Petrus Werfete", membersCount: 780, pendingCount: 19, status: "Aktif", lastUpdate: "2026-07-01", activityLevel: 75 },
  { id: "DPC-05", name: "Teluk Bintuni", chairman: "Fransiskus M.", membersCount: 840, pendingCount: 22, status: "Aktif", lastUpdate: "2026-07-04", activityLevel: 82 },
  { id: "DPC-06", name: "Teluk Wondama", chairman: "Demas Rumbekwan", membersCount: 450, pendingCount: 8, status: "Aktif", lastUpdate: "2026-06-28", activityLevel: 68 },
  { id: "DPC-07", name: "Pegunungan Arfak", chairman: "Yulianus Mandacan", membersCount: 620, pendingCount: 31, status: "Konsolidasi", lastUpdate: "2026-07-03", activityLevel: 70 },
  { id: "DPC-08", name: "Sorong Selatan", chairman: "Ronald Thesia", membersCount: 510, pendingCount: 12, status: "Pasif", lastUpdate: "2026-06-15", activityLevel: 45 },
  { id: "DPC-09", name: "Manokwari Selatan", chairman: "Zackarias Wonggor", membersCount: 490, pendingCount: 15, status: "Aktif", lastUpdate: "2026-07-02", activityLevel: 72 },
  { id: "DPC-10", name: "Maybrat", chairman: "Yustus Way", membersCount: 380, pendingCount: 25, status: "Konsolidasi", lastUpdate: "2026-06-30", activityLevel: 55 },
  { id: "DPC-11", name: "Tambrauw", chairman: "Paulus Baru", membersCount: 310, pendingCount: 9, status: "Pasif", lastUpdate: "2026-06-10", activityLevel: 40 },
  { id: "DPC-12", name: "Raja Ampat", chairman: "Faisal Umlati", membersCount: 680, pendingCount: 17, status: "Aktif", lastUpdate: "2026-07-04", activityLevel: 78 }
];

export const HISTORICAL_TIMELINE = [
  {
    year: "2023",
    title: "Inisiasi & Konsolidasi Awal",
    description: "Deklarasi pembentukan tim caretaker Garda Bangsa di Provinsi Papua Barat pasca pemekaran wilayah administratif baru.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcvMbnV31ja7P41q7MHtzH1L8aGslZTO-Zr7JR6qhWlv85zf-E9joSeK-PJJaPGEqIbSc_NCQ9tEceI30UFhfmfBFY44GTi_pFwR7ygqqsGoZRD7YLQaKVlwuhVyDVhrrfefw0-oP72haVIe0No-4B-hoCMRRi-8yY02fTxDFaW7JcuebI_ZE7NLREhjwidKrvJU4uBbrXGWpfaXbLe_VSHpRtWfgR-tKoLmXEbAAe7vpGc-9KYpuXZaZ6fsvgPM86M7TJ8npJvA"
  },
  {
    year: "2024",
    title: "Pelantikan Caretaker & Pemetaan DPC",
    description: "Menerima mandat resmi dari DKN Garda Bangsa di Jakarta untuk melaksanakan pemetaan keanggotaan dan pembentukan pengurus di 12 Kabupaten dan 1 Kota.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNEM60L3VifidR9_2zIgWR3vAYe0lnWHSp7Kr6b2ayBDJfn-7vV17UOMuschOZywvt32bfqQ_RiKgipcT7E67EzpjZNVIawQaWBAJdo64MOLeIaB5foCmoPgS6bWgjSxwlcMcB-WRXdA5Guu-nE03GFDZV4zC-9_DrmA557MVTpJT6lTgcKxYeLMYlkzANDQUB4vWn8-NsGU1-sMGAMXWil51goIaebmCr6IhJe3p6kpr_BgZsvqeloXrVHTsgHVE1GbGE_PgOhg"
  },
  {
    year: "2025",
    title: "Peluncuran Sistem Digital & Muswil I",
    description: "Penyelenggaraan Muswil I yang melantik Fadhlurrahman Anshari sebagai Ketua Definitif, serta peresmian platform database kader terintegrasi se-Papua Barat.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuHyaauZ_0GMYTbsvLMLSaz7rStKHUX6YZAZPVosZjBHQvPtnLY1prLt3O2NbTL3aCF2fqj9zBuYa0IKA_eRPnKZnfEUcDHAUJNQ-dC--uYerjK2zaA2unz_ANIQjvoaHbQoVcOhKq23BI1-TMPH5_XH22z8FF3AOl85CQPzP2cCfJA8_42jzaw9Xoj0NTP7le4uESZE49nCyCyc4MUUBcWgF-DyetWaxRSQv-44GiBIEtaxhNjZEDH4Bjt2azfF9p7ojk75wR1A"
  }
];

export const PROGRAMS: ProgramKerja[] = [
  {
    id: "PRG-01",
    name: "Literasi Digital Pemuda Papua",
    description: "Program pelatihan kecakapan digital, keamanan siber, dan dasar-dasar coding gratis bagi pemuda di Papua Barat untuk memperkecil ketimpangan akses teknologi.",
    category: "Teknologi & Media",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ_bfM0lSmdiNghokl4rV3VanlcricIDahSHWREY0exL2JCeKCemIcLdCNh5CpHJgOMltWBlTMZTAVVbYpApvAuzafiW_uD8uu5wr6SSQ2fU_VhQOmEP5xSeR8m8CfGPH9YVnO3mNFJFbNylE4uI5f9homdIZ-Y7bJa1i77oRfXNIiGw9T_hmsu42CyXHROOlBqVK4lPWfiy4BKPwLBczjv0VbwBCU3-KXjMmLUvnwct6LJ5OENvxpFQ1PA7Q1NtBEjWGoVOK5sg",
    status: "Berjalan",
    highlights: ["1.200 alumni tersertifikasi", "Tersedia modul offline", "Mentor ahli dari industri teknologi"]
  },
  {
    id: "PRG-02",
    name: "Garda Preneur Initiative",
    description: "Pendanaan stimulus, mentoring bisnis, dan pembukaan akses pasar modern untuk wirausaha muda asli Papua (OAP) guna mendorong kemandirian ekonomi.",
    category: "Ekonomi",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBwZI8bKiOguLpQRZdhpDr97dyBJqXVN0PKFJHQ1HfJ6Hg2s7hZr0TbqNqwgSXb8mtDKyJ2dw7Cqa1VxtkxkP5RewhDFNOiDm7d11tiGsmGYdQDPgCaI3Xn7lKYg1DVypJlxt4UkZKFltO5JqH9zGyvwXJf5l-c8ye72J5tSfC5oIEXMmiJDxHF4O8zXDBuSEg_O7dJ9jKR1Veul9mfmQlf-is-VZWSu-u1PSbo1OA3rAp7WZrCm1fiJf2B914N9EU4Nh8WEmkqg",
    status: "Berjalan",
    highlights: ["Stimulus Rp 50 Juta per UMKM terpilih", "Kerjasama dengan retail lokal", "Kurasi kualitas kemasan standar ekspor"]
  },
  {
    id: "PRG-03",
    name: "Green Papua Movement",
    description: "Aksi nyata pelestarian alam Papua melalui restorasi kawasan pesisir (penanaman mangrove) dan edukasi pengolahan limbah plastik ramah lingkungan.",
    category: "Sosial & Lingkungan",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCq_XsltlDESd5QkHt0RADa8OvOAIZVODIpa8uXKozfFpQBEC_NewOCEWi34b2JvZsFYjWC94dcb1xQR4YFZTcGN1bgX3Sri3sRgD1iHjeYK_RpPNNyCH1zKvBLVQWxfyHZl4pebLeLPngEU5mYpow00X9e_5qWd1FczDaoHLStVrfNQ_goC9ozjDwgtBjPJwGza7aXAXTJdNsWDdD6a6SuGIY9xVJxjDb-lJtkCsnA9i0A5M91wicemVUWaauUXFX-WcrHQzwJLw",
    status: "Selesai",
    highlights: ["2.500 mangrove tertanam di Manokwari", "Pemberdayaan nelayan lokal", "Pembersihan sampah plastik se-wilayah pantai"]
  },
  {
    id: "PRG-04",
    name: "Garda Desa Center",
    description: "Pusat pendampingan administrasi pembangunan desa (kampung) agar dana desa terserap secara transparan, tepat guna, dan berkeadilan sosial.",
    category: "Kaderisasi",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQsI7YBCd9vEdnstALWSlIf6qyhklJpq3QdfuoRsw1GdrzBUezohkH1k2iwXpsrEK9HUtNJ4ZBZhQTR0BcqFvZVFLEBK7R-YLeczOxb3JjOEKvhTH5YiR-9gaVUgOQvLhoyA0rfRpf7m_f7TAf6DRtqDL4Jg3WTjBDHPhaRZ6Dl8zCZDHArjXvfkQmWvKL645nCJG5eAN0weB_EVv4_-aaKTIXW3XjReB23RYOJbhTq-1SufwRaR_EJNPXMUh--bsqR-xgADF7zQ",
    status: "Perencanaan",
    highlights: ["Pelatihan 100 kader pendamping desa", "Sistem monitoring digital terbuka", "Kerjasama dengan Kementerian Desa"]
  }
];

export const ORGANOGRAM: OrganogramNode = {
  id: "ORG-01",
  role: "Ketua Dewan Koordinasi Wilayah (DKW)",
  name: "Fadhlurrahman Anshari, S.Pd, S.H",
  title: "Ketua Umum",
  photoUrl: ASSETS.CHAIRMAN_PHOTO,
  description: "Memimpin jalannya organisasi, pembuat kebijakan strategis utama, serta representasi politik Garda Bangsa tingkat Provinsi Papua Barat.",
  subNodes: [
    {
      id: "ORG-02",
      role: "Sekretaris Dewan Koordinasi Wilayah (DKW)",
      name: "Drs. Ahmad Fauzi",
      title: "Sekretaris Umum",
      photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPHGPlEpiaFoRd5NY1E_Z5omP-oZiOkt-J3U-BbCs9Mg6BD1yXJmZXFcGAJqKSzymWjpShuLPf-qmsxLvP6BAB6-l6O0UKk1nzKqnWwzSwFL9CHqovImfaveIw_GMRUnhzD_FcbYGX3X8d6eZ4Xru69wuqfta7YLsluwE41_QT2Qbki32Dd8jbWR22nuWZeBqUQw4VEpq95TUM1n-RiY8ZPZdc_x_LwhHqzKXKGKsRb05UzthB4-UX3L3Mg4pEXaReAS4IXyMVUQ",
      description: "Mengelola urusan administrasi, persuratan, perumusan kesepakatan internal, dan koordinator sinergi lintas bidang."
    },
    {
      id: "ORG-03",
      role: "Bendahara Dewan Koordinasi Wilayah (DKW)",
      name: "Maria J. Wandik",
      title: "Bendahara Umum",
      photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJKwNbv2VYzvHYPsorHgW0H3Dtl_is9IGHbf3TENl8wpi8Zzg7zTzbaFLjRaUYyjjFrVq1AJERWDEtdrqRg9Yx-OdzYUZO62JsfG9Jh-E0AiGWaKP8DlefPnLrWjFcymts0GXCU7zDx_E58raXMo9TY_VNctfr6a9BcrEEdYjveTa127SGClm87LgSZQqL8dJ8UeOxTfqtMpFX36WBUL4rKJkzSLg8R5D7hR4qOGz3IZmhy7qjgqzKR2j9Ref2zNhItSG49A3yYQ",
      description: "Penanggung jawab utama tata kelola keuangan, perbendaharaan organisasi, penggalangan dana kreatif, dan kepatuhan anggaran."
    },
    {
      id: "ORG-04",
      role: "Ketua Bidang Kaderisasi & Organisasi",
      name: "Hendra Pratama",
      title: "Kabid Kaderisasi",
      photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSAAWk-yW5qFJOFKlsmQ-JfAs1uZjN1mZfAX9TP5sB8ny0rr75FQJQizWiEKK-CwSod-BZs2mcci_0jwi6wMpjDHIakGCft2Kwyl3WPWOPoF4PsCbNz0lOQCb5qQkAJTcMLRidz76YLy7E5Y_DMzsQhQu-fgbNEye8gDb9jGKnm1jAmCR33QyQGSqfPhpSuTor6Z1_QUq28huEcUKat96U5amusQNPGO9zD4YN1bmjjgZwlGOJV3RMGLvwfYLY8T91P5i3vi_Oog",
      description: "Merumuskan skema pengkaderan formal, verifikasi database anggota, pembinaan DPC di daerah, serta penguatan ideologi pemuda."
    }
  ]
};

export const INITIAL_CONTACTS: ContactMessage[] = [
  {
    id: "MSG-001",
    name: "Yafet Mandacan",
    email: "yafet.mnd@gmail.com",
    subject: "Pertanyaan Prosedur KTA Online",
    message: "Halo pengurus Garda Bangsa Papua Barat, saya ingin mendaftar menjadi kader aktif di Kabupaten Manokwari. Bagaimana mekanisme cetak KTA dan verifikasi data fisiknya? Terima kasih.",
    date: "2026-07-06 14:32",
    status: "Sudah Dibaca"
  },
  {
    id: "MSG-002",
    name: "Ratna Sari",
    email: "ratna.sari@gmail.com",
    subject: "Kemitraan UMKM Garda Preneur",
    message: "Selamat siang. Saya memiliki usaha kuliner keripik keladi di Sorong Selatan dan sangat tertarik untuk bergabung dengan program kemitraan Garda Preneur. Apakah ada pendampingan kemasan produk?",
    date: "2026-07-07 09:15",
    status: "Belum Dibaca"
  }
];
