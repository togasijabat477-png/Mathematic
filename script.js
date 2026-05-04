/* ═══════════════════════════════════════════
   MATHEMATIC — JavaScript (Interaksi Saja)
   Hanya untuk: navigasi, toggle, modal, quiz
   ═══════════════════════════════════════════ */

/* tombol kembali - integrated into init */
function handlePageParam() {
    var params = new URLSearchParams(window.location.search);
    var page = params.get("page");
    var tab  = params.get("tab");
    if (page) {
        if (tab && page === 'materi') { activeMateriTab = tab; renderMateri(); }
        navigateTo(page);
    }
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        var page = event.state.page;
        var tab = event.state.tab;
        if (tab && page === 'materi') { activeMateriTab = tab; renderMateri(); }
        navigateTo(page);
    } else {
        handlePageParam();
    }
});


/* ═══ DATA ═══ */

var funFacts = [
  {id:"nol",
    emoji:"🔢",
    title:"Nol Bukan Kosong",
    summary:"Angka 0 tidak ditemukan oleh orang Yunani atau Romawi — melainkan oleh matematikawan India, Brahmagupta, sekitar 628 M.",tag:"Sejarah",category:"Sejarah",color:"teal",details:{fullStory:"Sebelum Brahmagupta, peradaban Romawi dan Yunani tidak memiliki konsep nol. Brahmagupta, pada tahun 628 M dalam bukunya 'Brahmasphutasiddhanta' pertama kali mendefinisikan nol sebagai hasil pengurangan bilangan dengan dirinya sendiri.",whyItMatters:"Tanpa nol, sistem bilangan posisional tidak akan ada. Tanpa sistem posisional, komputer tidak mungkin ada karena seluruh komputasi digital berbasis biner (0 dan 1).",funExtra:"Kata 'zero' berasal dari bahasa Arab 'sifr' yang berarti 'kosong'."}},
  {id:"fibonacci",emoji:"🌀",title:"Fibonacci Ada di Mana-mana",summary:"Deret Fibonacci (1,1,2,3,5,8,13...) muncul di susunan biji bunga matahari, spiral cangkang siput, dan percabangan pohon.",tag:"Alam",category:"Alam",color:"violet",details:{fullStory:"Leonardo Fibonacci memperkenalkan deret ini di bukunya 'Liber Abaci' (1202) melalui masalah kelinci.",whyItMatters:"Rasio antara dua angka Fibonacci berturutan mendekati Golden Ratio (φ ≈ 1.618), yang dianggap sebagai proporsi paling estetis.",funExtra:"Jika kamu menghitung spiral di bunga matahari searah jarum jam dan berlawanan, jumlahnya SELALU dua angka Fibonacci berturutan."}},
  {id:"infinity",emoji:"♾️",title:"Ada Banyak Jenis Tak Hingga",summary:"Georg Cantor membuktikan bahwa tak hingga bilangan real LEBIH BESAR dari tak hingga bilangan bulat.",tag:"Bilangan",category:"Bilangan",color:"amber",details:{fullStory:"Pada 1874, Georg Cantor mengguncang dunia matematika dengan bukti diagonal-nya.",whyItMatters:"Konsep countable vs uncountable menjelaskan mengapa ada masalah yang TIDAK MUNGKIN diselesaikan komputer.",funExtra:"Cantor sendiri sangat tersiksa oleh penemuannya. Baru setelah kematiannya, idenya diterima."}},
  {id:"probabilitas",emoji:"🎲",title:"Probabilitas Lahir dari Judi",summary:"Teori probabilitas lahir dari surat-surat antara Pascal dan Fermat (1654) tentang bagaimana membagi taruhan.",tag:"Probabilitas",category:"Probabilitas",color:"teal",details:{fullStory:"Pada 1654, Chevalier de Méré punya masalah judi: bagaimana membagi taruhan secara adil jika permainan dihentikan sebelum selesai?",whyItMatters:"Probabilitas kini menjadi tulang punggung machine learning, analisis risiko keuangan, dan quantum mechanics.",funExtra:"Pascal juga menciptakan 'Pascal's Wager' — argumen probabilistik untuk percaya Tuhan."}},
  {id:"rsa",emoji:"🔑",title:"RSA Masih Belum Dipecahkan",summary:"Enkripsi RSA 2048-bit menggunakan dua bilangan prima raksasa. Komputer tercepat butuh triliunan tahun untuk memfaktorkannya.",tag:"Kriptografi",category:"Kriptografi",color:"violet",details:{fullStory:"RSA diciptakan tahun 1977 dan mengandalkan fakta bahwa mengalikan dua bilangan prima besar itu mudah, tapi memfaktorkan hasilnya kembali itu SANGAT sulit.",whyItMatters:"Setiap kali kamu berbelanja online atau login ke bank — RSA melindungi datamu.",funExtra:"Algoritma Shor secara teori bisa memecahkan RSA menggunakan komputer kuantum. Tapi komputer kuantum yang cukup kuat belum ada."}},
  {id:"empat-warna",emoji:"🗺️",title:"Masalah 4 Warna",summary:"Selama 124 tahun (1852–1976), matematikawan gagal membuktikan bahwa 4 warna cukup untuk mewarnai peta.",tag:"Teori Graf",category:"Teori Graf",color:"amber",details:{fullStory:"Pada 1852, Francis Guthrie bertanya: berapa warna minimum yang dibutuhkan agar tidak ada dua wilayah bertetangga yang memiliki warna sama?",whyItMatters:"Teorema 4 warna adalah fondasi graph coloring, digunakan dalam penjadwalan ujian dan alokasi frekuensi radio.",funExtra:"Banyak matematikawan menolak bukti komputer ini sebagai 'bukti sejati'."}},
  {id:"algoritma",emoji:"🧮",title:"\"Algoritma\" dari Nama Orang",summary:"Kata \"algorithm\" berasal dari nama Al-Khwarizmi, matematikawan Persia abad ke-9.",tag:"Sejarah",category:"Sejarah",color:"teal",details:{fullStory:"Muhammad ibn Musa al-Khwarizmi menulis buku 'Kitab al-Jabr wal-Muqabala' yang melahirkan kata 'aljabar'.",whyItMatters:"Setiap program komputer adalah kumpulan algoritma. Al-Khwarizmi secara tidak langsung menjadi 'bapak' seluruh ilmu komputer modern.",funExtra:"Al-Khwarizmi juga memperkenalkan sistem angka Hindu (0-9) ke dunia Arab."}},
  {id:"pi",emoji:"📐",title:"Pi Tidak Pernah Habis",summary:"π = 3.14159265... tidak berulang dan tidak berakhir selamanya. Hingga 2023, π telah dihitung hingga 105 triliun digit.",tag:"Bilangan",category:"Bilangan",color:"violet",details:{fullStory:"Pi adalah rasio keliling lingkaran terhadap diameternya. Hanya 39 digit π sudah cukup untuk menghitung keliling alam semesta dengan presisi seukuran atom hidrogen!",whyItMatters:"Pi muncul di mana-mana: fisika kuantum, teori relativitas Einstein, dan perhitungan GPS.",funExtra:"Setiap 14 Maret (3/14) dirayakan sebagai 'Pi Day'."}},
  {id:"internet-graf",emoji:"🌐",title:"Internet Adalah Graf Raksasa",summary:"World Wide Web bisa dimodelkan sebagai directed graph dengan miliaran node dan edge.",tag:"Teori Graf",category:"Teori Graf",color:"amber",details:{fullStory:"Larry Page dan Sergey Brin menggunakan teori graf untuk menciptakan PageRank.",whyItMatters:"Google memahami STRUKTUR web sebagai graf dan menggunakan eigenvector dari matriks adjacency untuk meranking halaman.",funExtra:"Rata-rata hanya butuh 3 klik untuk sampai dari artikel Wikipedia manapun ke artikel lainnya."}},
  {id:"birthday-paradox",emoji:"🧩",title:"Paradoks Ulang Tahun",summary:"Dalam kelompok hanya 23 orang, kemungkinan dua orang berbagi ulang tahun yang sama lebih dari 50%!",tag:"Probabilitas",category:"Probabilitas",color:"teal",details:{fullStory:"Dengan 23 orang, ada 253 pasangan yang mungkin. Probabilitas ada yang sama = 50.7%!",whyItMatters:"'Birthday attack' mengeksploitasi paradoks ini untuk menemukan collision dalam fungsi hash.",funExtra:"Coba di kelasmu! Jika ada 30+ mahasiswa, hampir pasti ada dua orang dengan ulang tahun yang sama."}},
  {id:"prima",emoji:"🏗️",title:"Bilangan Prima = Atom Matematika",summary:"Setiap bilangan bulat positif lebih dari 1 bisa ditulis sebagai hasil kali bilangan prima dengan cara yang unik.",tag:"Bilangan",category:"Bilangan",color:"violet",details:{fullStory:"Fundamental Theorem of Arithmetic: setiap bilangan bulat > 1 dapat difaktorkan menjadi bilangan prima secara unik.",whyItMatters:"Bilangan prima adalah fondasi kriptografi modern (RSA, Diffie-Hellman).",funExtra:"Cicada muncul setiap 13 atau 17 tahun — keduanya prima! Ini strategi evolusi."}},
  {id:"neptunus",emoji:"🌌",title:"Matematika Meramalkan Planet",summary:"Matematikawan menghitung posisi planet Neptunus hanya dari keanehan orbit Uranus.",tag:"Alam",category:"Alam",color:"amber",details:{fullStory:"Pada 1846, Le Verrier menghitung bahwa anomali pada orbit Uranus hanya bisa dijelaskan oleh gravitasi planet yang belum ditemukan.",whyItMatters:"Ini menunjukkan kekuatan prediktif matematika.",funExtra:"Le Verrier menulis: 'Arahkan teleskop ke titik ini, dan Anda akan menemukan planet baru.' Dan benar saja!"}},
  {id:"dna",emoji:"🧬",title:"DNA pun Pakai Matematika",summary:"Struktur heliks ganda DNA mengikuti proporsi matematika yang sangat presisi.",tag:"Alam",category:"Alam",color:"teal",details:{fullStory:"Setiap putaran penuh heliks DNA berisi tepat 10 pasangan basa dan memiliki panjang 3.4 nanometer.",whyItMatters:"Bioinformatika modern menggunakan algoritma matematika berat untuk sequencing DNA.",funExtra:"Jika seluruh DNA dalam tubuhmu direntangkan, panjangnya mencapai ~2x jarak Bumi-Matahari!"}},
  {id:"game",emoji:"🎮",title:"Game = Matematika yang Dimainkan",summary:"Setiap game video menggunakan fisika berbasis kalkulus, grafis berbasis aljabar linear, AI berbasis teori graf.",tag:"Terapan",category:"Terapan",color:"violet",details:{fullStory:"Setiap frame game 3D melibatkan ribuan operasi matriks.",whyItMatters:"Industri game bernilai $200+ miliar/tahun dan membutuhkan programmer yang paham matematika.",funExtra:"John Carmack, pembuat Doom, pada dasarnya adalah seorang matematikawan yang kebetulan membuat game!"}},
  {id:"fourier",emoji:"🌊",title:"Gelombang Laut Bisa Diprediksi",summary:"Transformasi Fourier membuktikan bahwa gelombang laut yang tampak kacau adalah jumlahan ribuan gelombang sederhana.",tag:"Terapan",category:"Terapan",color:"amber",details:{fullStory:"Joseph Fourier menunjukkan bahwa SETIAP fungsi periodik bisa diuraikan menjadi jumlahan gelombang sinus dan kosinus.",whyItMatters:"Fourier Transform ada DI MANA-MANA: kompresi MP3 dan JPEG, pengenalan suara.",funExtra:"Fourier mengembangkan teorinya saat mempelajari konduksi panas — bukan gelombang!"}}
];

var vokasiItems = [
  {id:"coding",num:"01",icon:"💻",title:"Coding Lebih Bersih",summary:"Logika matematika = logika pemrograman. If-else, loop, rekursi — semua berakar dari proposisi logika.",tag:"Logika & Pemrograman",details:{explanation:"Setiap statement if-else dalam kode adalah proposisi logika.",realExample:"Saat membuat validasi form: (email valid) ∧ (password ≥ 8 karakter) ∧ (username unik).",skillsNeeded:"Logika Proposisi, Teori Himpunan, Relasi & Fungsi"}},
  {id:"database",num:"02",icon:"🗄️",title:"Database Jadi Mudah",summary:"Relasi antar tabel di SQL? Itu teori relasi dan fungsi. Join, union, intersect — operasi himpunan.",tag:"Database & SQL",details:{explanation:"Database relasional diciptakan oleh Edgar Codd berdasarkan teori relasi matematika.",realExample:"SELECT * FROM mahasiswa JOIN nilai ON mahasiswa.id = nilai.mhs_id WHERE nilai.skor > 80",skillsNeeded:"Teori Himpunan, Relasi, Fungsi"}},
  {id:"network",num:"03",icon:"🌐",title:"Jaringan & Routing",summary:"Bagaimana data menemukan jalur tercepat di internet? Teori Graf! Algoritma Dijkstra.",tag:"Networking & Routing",details:{explanation:"Internet adalah graf raksasa di mana router = node dan kabel = edge.",realExample:"Setiap router menjalankan Dijkstra untuk memilih jalur tercepat.",skillsNeeded:"Teori Graf, Algoritma Shortest Path"}},
  {id:"security",num:"04",icon:"🔐",title:"Keamanan Siber",summary:"Enkripsi RSA yang menjaga password dan data bankmu? Itu Teori Bilangan!",tag:"Cybersecurity",details:{explanation:"Kriptografi modern sepenuhnya berbasis matematika.",realExample:"Saat login ke internet banking, browser melakukan TLS handshake.",skillsNeeded:"Teori Bilangan, Aritmetika Modular"}},
  {id:"ai",num:"05",icon:"🤖",title:"AI & Machine Learning",summary:"Setiap model AI bekerja dengan matriks dan vektor — itulah Aljabar Linear.",tag:"AI & Data Science",details:{explanation:"Neural network adalah serangkaian perkalian matriks dan fungsi aktivasi.",realExample:"ChatGPT memproses inputmu sebagai vektor numerik.",skillsNeeded:"Aljabar Linear, Kalkulus, Probabilitas"}},
  {id:"analytics",num:"06",icon:"📊",title:"Analisis Bisnis & Data",summary:"Kombinatorika membantu menghitung kemungkinan dalam pengujian software dan analisis data.",tag:"Business & Analytics",details:{explanation:"Data analyst menggunakan statistik, probabilitas, dan aljabar linear.",realExample:"5 metode pembayaran × 3 ekspedisi × 4 jenis promo = 60 kombinasi test case.",skillsNeeded:"Kombinatorika, Probabilitas, Statistik"}},
  {id:"mobile",num:"07",icon:"📱",title:"Pengembangan Aplikasi Mobile",summary:"Animasi halus di aplikasi mobile menggunakan interpolasi matematika dan kurva Bezier.",tag:"Mobile Dev",isNew:true,details:{explanation:"Animasi smooth menggunakan kurva Bezier dan easing functions.",realExample:"Saat swipe Instagram Stories, titik-titik koordinat diinterpolasi.",skillsNeeded:"Kalkulus, Interpolasi, Kurva Parametrik"}},
  {id:"cloud",num:"08",icon:"☁️",title:"Cloud & DevOps",summary:"Load balancing server menggunakan teori antrian berbasis probabilitas.",tag:"Cloud Computing",isNew:true,details:{explanation:"Cloud computing menggunakan teori antrian untuk load balancing.",realExample:"AWS Auto Scaling menggunakan exponential smoothing.",skillsNeeded:"Teori Antrian, Probabilitas, Optimasi"}}
];

var realLifeItems = [
  {id:"whatsapp",emoji:"📱",title:"WhatsApp & Enkripsi End-to-End",subtitle:"Kriptografi · Teori Bilangan · Modular Arithmetic",summary:"Setiap pesan WhatsApp dienkripsi menggunakan protokol Signal.",details:{howItWorks:"Pesanmu dienkripsi di HP-mu menggunakan kunci unik. Bahkan WhatsApp sendiri tidak bisa membaca pesanmu!",mathBehind:"Diffie-Hellman Key Exchange: g^(ab) mod p.",mindBlown:"WhatsApp memproses lebih dari 100 miliar pesan per hari!"}},
  {id:"gmaps",emoji:"🗺️",title:"Google Maps Cari Rute Tercepat",subtitle:"Teori Graf · Algoritma Dijkstra · Optimasi",summary:"Di baliknya berjalan algoritma graf Dijkstra dan A*.",details:{howItWorks:"Google Maps merepresentasikan jaringan jalan sebagai weighted directed graph.",mathBehind:"Dijkstra's Algorithm: O((V+E) log V) dengan priority queue.",mindBlown:"Google Maps memproses lebih dari 1 miliar kilometer navigasi per hari!"}},
  {id:"spotify",emoji:"🎵",title:"Spotify Tahu Lagu yang Kamu Suka",subtitle:"Aljabar Linear · Matriks · Collaborative Filtering",summary:"Sistem rekomendasi Spotify menggunakan matriks kolaboratif.",details:{howItWorks:"Collaborative Filtering merepresentasikan preferensi jutaan pengguna sebagai matriks raksasa.",mathBehind:"Matrix Factorization: M ≈ U × S^T",mindBlown:"Discover Weekly menggunakan matriks dengan 400+ juta baris × 80+ juta kolom!"}},
  {id:"traffic",emoji:"🚦",title:"Lampu Merah yang Terkoordinasi",subtitle:"Teori Graf · Optimasi · Logika Boolean",summary:"Sistem lampu lalu lintas menggunakan graph coloring dan optimasi.",details:{howItWorks:"Persimpangan jalan dimodelkan sebagai conflict graph.",mathBehind:"Chromatic number graf menentukan jumlah minimum fase lampu.",mindBlown:"Kota Seoul menghemat 15% waktu perjalanan setelah menerapkan graph coloring!"}},
  {id:"ecommerce",emoji:"🛒",title:"Rekomendasi Produk Tokopedia/Shopee",subtitle:"Kombinatorika · Probabilitas · Aljabar Linear",summary:"'Produk yang sering dibeli bersama' menggunakan analisis asosiasi.",details:{howItWorks:"Association Rule Mining menganalisis jutaan transaksi.",mathBehind:"P(Mouse|Laptop) = P(Mouse ∩ Laptop) / P(Laptop).",mindBlown:"Amazon: 35% penjualan dari rekomendasi — $175+ miliar per tahun!"}},
  {id:"fraud",emoji:"🏦",title:"Deteksi Fraud Kartu Kredit",subtitle:"Logika Boolean · Aljabar Linear · Probabilitas",summary:"Sistem anti-fraud bank menggunakan decision tree berbasis logika.",details:{howItWorks:"Setiap transaksi dianalisis dalam milidetik oleh model ML.",mathBehind:"Information Gain berbasis entropi Shannon: H(X) = -Σ p(x) log₂ p(x).",mindBlown:"Visa memproses 65.000 transaksi per detik dengan akurasi 99.97%!"}},
  {id:"hospital",emoji:"🏥",title:"Rumah Sakit & Diagnosis Medis",subtitle:"Transformasi Fourier · Probabilitas · Aljabar Linear",summary:"MRI menggunakan Inverse Fourier Transform untuk gambar tubuh.",details:{howItWorks:"MRI menggunakan medan magnet kuat membuat atom hidrogen 'bergetar'.",mathBehind:"Fourier Transform 2D: F(u,v) = ∫∫ f(x,y) e^(-j2π(ux+vy)) dxdy",mindBlown:"Compressed sensing mengurangi waktu scan MRI dari 45 menjadi 15 menit!"}},
  {id:"car",emoji:"🚗",title:"Mobil Listrik & Kendaraan Otonom",subtitle:"Aljabar Linear · Kalkulus · Teori Graf · Probabilitas",summary:"Tesla Autopilot memproses ratusan sensor setiap detik.",details:{howItWorks:"Computer Vision dengan CNN mendeteksi objek. Kalman Filter menggabungkan data sensor.",mathBehind:"Kalman Filter: prediksi state lalu update berdasarkan pengukuran.",mindBlown:"Tesla Autopilot: 2.3 triliun operasi matriks per detik!"}},
  {id:"netflix",emoji:"🎬",title:"Netflix Tahu Film yang Belum Kamu Tonton",subtitle:"Aljabar Linear · SVD · Probabilitas",summary:"Netflix menggunakan SVD untuk menemukan pola tersembunyi.",details:{howItWorks:"SVD memfaktorkan matriks rating User×Movie menjadi tiga matriks.",mathBehind:"SVD: M = UΣV^T",mindBlown:"80% konten yang ditonton Netflix berasal dari rekomendasi!"}}
];

var quizData = [
  {q:"Berapa banyak bilangan prima antara 1 dan 100?",hint:"Ingat: bilangan prima hanya habis dibagi 1 dan dirinya sendiri.",opts:["20","25","30","21"],ans:1,exp:"25 bilangan prima antara 1–100."},
  {q:"Jika sebuah koin dilempar 6 kali dan semua hasilnya kepala, berapa peluang lemparan ke-7 menghasilkan ekor?",hint:"Apakah koin punya \"memori\"?",opts:["Lebih dari 50%","Tepat 50%","Kurang dari 50%","Tergantung koinnya"],ans:1,exp:"Tepat 50%. Ini adalah Gambler's Fallacy."},
  {q:"Berapa banyak cara menyusun 3 orang dari kelompok 5 orang dalam antrian?",hint:"Permutasi: P(5,3) = ?",opts:["10","15","60","120"],ans:2,exp:"60 cara. P(5,3) = 5 × 4 × 3 = 60."},
  {q:"Protokol mana yang menggunakan konsep Spanning Tree?",hint:"Minimum spanning tree dari Teori Graf.",opts:["HTTP","DNS","STP (Spanning Tree Protocol)","FTP"],ans:2,exp:"STP mengimplementasikan algoritma minimum spanning tree."},
  {q:"Matriks A berukuran 3×4 dikalikan matriks B. Agar valid, berapa ukuran minimum matriks B?",hint:"Kolom A harus sama dengan baris B.",opts:["4×3","3×4","4×1","3×3"],ans:0,exp:"4×3. Untuk A(3×4) × B(m×n), syaratnya m = 4."}
];

var materiData = {
  diskrit: [{
    icon:"∑", title:"Matematika Diskrit",
    items:[
      {num:"01",title:"Logika Matematika",description:"Proposisi, operator logika, dan tabel kebenaran",tag:"Learn",file:"subject/matdis/Logika_Matematika.html"},
      {num:"02",title:"Himpunan",description:"Konsep dasar dan operasi pada himpunan",tag:"Learn",file:"subject/matdis/Himpunan.html"},
      {num:"03",title:"Relasi & Fungsi",description:"Sifat-sifat relasi dan jenis-jenis fungsi",tag:"Learn",file:"subject/matdis/Relasi_dan_Fungsi.html"},
      {num:"04",title:"Teori Graf",description:"Representasi dan algoritma graf",tag:"Learn",file:"subject/matdis/teori_graf_gabungan.html"},
      {num:"05",title:"Aljabar Bolean",description:"materi Aljabar Bolean",tag:"Learn",file:"subject/matdis/Aljabar_Bolean.html"},
      {num:"06",title:"Pohon",description:"Karakteristik Pohon",tag:"Learn",file:"subject/matdis/Pohon.html"},
      {num:"07",title:"Number Of Theory",description:"Aritmatika Modulo",tag:"Learn",file:"subject/matdis/numberoftheory.html"}
    ]
  },{
   icon:"📼", title:"Video Pembelajaran Matematika Diskrit",
    items:[
      {num:"01",title:"Logika Matematika",description:"Proposisi, operator logika, dan tabel kebenaran",tag:"Watch",file:"video/matdis/video_logika.html"},
      {num:"02",title:"Himpunan",description:"Konsep dasar dan operasi pada himpunan",tag:"Watch",file:"video/matdis/Himpunan.html"},
      {num:"03",title:"Relasi & Fungsi",description:"Sifat-sifat relasi dan jenis-jenis fungsi",tag:"Watch",file:"video/matdis/Relasi_dan_Fungsi.html"},
      {num:"04",title:"Teori Graf",description:"Representasi dan algoritma graf",tag:"Watch",file:"video/matdis/teori_graf_gabungan.html"},
      {num:"05",title:"Aljabar Bolean",description:"materi Aljabar Bolean",tag:"Watch",file:"video/matdis/Aljabar_Bolean.html"},
      {num:"06",title:"Pohon",description:"Karakteristik Pohon",tag:"Watch",file:"video/matdis/Pohon.html"},
      {num:"07",title:"Number Of Theory",description:"Aritmatika Modulo",tag:"Watch",file:"video/matdis/numberoftheory.html"}
    ]
  },{
    icon:"📝", title:"Latihan Soal Matematika Diskrit",
    items:[
      {num:"Latihan",title:"Logika",description:"Latihan soal Logika tingkat menengah",tag:"Practice",file:"soal/matdis/Logika.html"},
      {num:"Latihan",title:"Himpunan",description:"Latihan soal Himpunan",tag:"Practice",file:"soal/matdis/Himpunan.html"},
      {num:"Latihan",title:"Matriks",description:"Latihan soal matriks",tag:"Practice",file:"soal/matdis/Soal_Matriks.html"},
      {num:"Latihan",title:"Graf",description:"Latihan soal Graf",tag:"Practice",file:"soal/matdis/soal_graf.html"},
      {num:"Latihan",title:"Aljabar Bolean",description:"Latihan soal Aljabar Bolean",tag:"Practice",file:"soal/matdis/Aljabar_Bolean.html"},
      {num:"Latihan",title:"Pohon",description:"Latihan soal Pohon",tag:"Practice",file:"soal/matdis/Latihan_Soal_Pohon.html"}
    ]
  }],
   
  aljabar: [{
    icon:"λ", title:"Aljabar Linear",
    items:[
      {num:"01",title:"Sistem Persamaan Linear",description:"Operasi SPL",tag:"Learn",file:"subject/aljali/Aljali_BAB1.html"},
      {num:"02",title:"Matriks",description:"Operasi matriks, determinan, dan invers",tag:"Learn",file:"subject/aljali/Aljali_BAB2.html"},
      {num:"03",title:"Determinan",description:"Eliminasi Gauss dan metode penyelesaian",tag:"Learn",file:"subject/aljali/Aljali_BAB3.html"},
      {num:"04",title:"Nilai Eigen Dan Vektor Eigen",description:"Pemetaan linear dan representasi matriks",tag:"Learn",file:"subject/aljali/eigen vektor & value.html"},
      {num:"05",title:"Diagonalisasi",description:"Nilai eigen, vektor eigen, dan diagonalisasi",tag:"Learn",file:"subject/aljali/bab6.html"}
    ]
  },{
     icon:"📼", title:"Video Pembelajaran Aljabar Linear",
    items:[
      {num:"01",title:"Sistem Persamaan Linear",description:"Proposisi, operator logika, dan tabel kebenaran",tag:"Watch",file:"video/aljali/spl.html"},
    ]
  },{
    icon:"📝", title:"Latihan Soal Aljabar Linear",
    items:[
      {num:"Latihan",title:"Sistem Persamaan Linear",description:"Latihan soal SPL tingkat dasar",tag:"Practice",file:"soal/aljali/Soal_PersamaanLinear.html"},
      {num:"Latihan",title:"Matriks",description:"Latihan soal eigenvektor tingkat menengah",tag:"Practice",file:"soal/aljali/Soal_Matriks.html"},
      {num:"Latihan",title:"Determinan",description:"Latihan soal eigenvektor tingkat lanjut",tag:"Practice",file:"soal/aljali/Soal_Determinan.html"},
      {num:"Latihan",title:"Nilai Eigen Dan Vektor Eigen",description:"Latihan soal eigenvalue dan eigenvektor",tag:"Practice",file:"soal/aljali/Eigen Value & Eigen Vektor.html"},
      {num:"Latihan",title:"Diagonalisasi",description:"Latihan soal Diagonalisasi",tag:"Practice",file:"soal/aljali/diagonalisasi.html"}
    ]
  }],
  kriptografi: [{
    icon:"🔐", title:"Kriptografi",
    items:[
      {num:"01",title:"Kriptografi",description:"Sejarah, konsep dasar enkripsi dan dekripsi",tag:"Learn",file:"subject/kriptografi/bab7.html"}
    ]
  },{
     icon:"📼", title:"Video Pembelajaran Kriptografi",
    items:[
      {num:"01",title:"Kriptografi",description:"dasar-dasar teori yang digunakan dalam kriptografi.",tag:"Watch",file:"video/kriptografi/kriptografi.html"},
    ]
  },{
    icon:"📝", title:"Latihan Soal Kriptografi",
    items:[
      {num:"Latihan",title:"Kriptografi",description:"Latihan soal kriptografi",tag:"Practice",file:"soal/kriptografi/kriptografi.html"}
    ]
  }]
};

var gameData = [
  {icon:"🎮",title:"Game Matematika Diskrit",items:[
    {num:"01",title:"Truth Table Challenge",description:"Proposisi, operator logika, dan tabel kebenaran",tag:"Dasar",file:"game/matdis/truth-table.html"},
    {num:"02",title:"Set Match Game",description:"Cocokkan elemen himpunan dengan cepat",tag:"Dasar",file:"game/matdis/set-match.html"},
    {num:"03",title:"Hitung Peluang!",description:"Tantangan kombinatorika dan peluang",tag:"Dasar",file:"game/matdis/hitung-peluang.html"},
    {num:"04",title:"Temukan Jalannya!",description:"Traversal graf dan pencarian jalur",tag:"Dasar",file:"game/matdis/temukan-jalan.html"},
    {num:"05",title:"Benar atau Salah?",description:"Uji kemampuan logika proposisimu",tag:"Dasar",file:"game/matdis/truth-table.html"},
    {num:"06",title:"Kombinatorika",description:"Permutasi, kombinasi, dan prinsip pencacahan",tag:"Menengah",file:"game/matdis/kombinatorika.html"},
    {num:"★ NEW",title:"⬡ Graf Explorer",description:"Temukan jalur Euler & sirkuit Hamilton di graf interaktif. 5 level menantang!",tag:"Teori Graf",isNew:true,accentColor:"teal",file:"game/matdis/graf-explorer.html"}
  ]},
  {icon:"👾",title:"Game Aljabar Linear",items:[
    {num:"★ NEW",title:"⚔ Matrix Battle",description:"Kuasai operasi matriks — penjumlahan, pengurangan, skalar, hingga perkalian matriks! 12 soal progresif.",tag:"Operasi Matriks",isNew:true,accentColor:"violet",file:"game/matrix-battle.html"}
  ]},
  {icon:"🕹️",title:"Game Kriptografi",items:[
    {num:"★ NEW",title:"⚿ Cipher Quest",description:"Enkripsi & dekripsi pesan rahasia! Caesar, Atbash, Vigenère — 10 level dari mudah ke sulit.",tag:"Enkripsi & Dekripsi",isNew:true,accentColor:"green",file:"game/kriptografi/cipher-quest.html"}
  ]}
];

var subjects = [
  {id:"diskrit",icon:"∑",title:"Matematika Diskrit",description:"Logika, himpunan, relasi, graf, dan kombinatorik untuk fondasi ilmu komputer",topics:[{num:"01",name:"Logika Matematika"},{num:"02",name:"Teori Himpunan"},{num:"03",name:"Relasi & Fungsi"},{num:"04",name:"Teori Graf"},{num:"05",name:"Kombinatorika"}],totalTopics:5,availableTopics:5},
  {id:"aljabar",icon:"λ",title:"Aljabar Linear",description:"Vektor, matriks, transformasi linear, dan ruang vektor",topics:[{num:"01",name:"Vektor"},{num:"02",name:"Matriks"},{num:"03",name:"SPL"},{num:"04",name:"Transformasi Linear"},{num:"05",name:"Eigenvalue & Eigenvector"}],totalTopics:6,availableTopics:6},
  {id:"kripto",icon:"🔐",title:"Kriptografi",description:"Enkripsi, dekripsi, algoritma kunci publik, dan keamanan data",topics:[{num:"01",name:"Pengantar Kriptografi"},{num:"02",name:"Enkripsi Simetris"},{num:"03",name:"RSA & Kunci Publik"},{num:"04",name:"Fungsi Hash"},{num:"05",name:"Tanda Tangan Digital"}],totalTopics:5,availableTopics:1}
];

var referensiData = [
  {icon:"📚",title:"Buku Referensi",gradient:"from-teal-to-amber",items:[{title:"Discrete Mathematics and Its Applications",desc:"oleh Kenneth H. Rosen",detail:"Buku referensi paling populer untuk Matematika Diskrit"},{title:"Discrete Mathematics",desc:"oleh Richard Johnsonbaugh",detail:"Pendekatan praktis dengan banyak contoh soal"},{title:"Matematika Diskrit",desc:"oleh Rinaldi Munir",detail:"Buku dalam bahasa Indonesia yang mudah dipahami"}]},
  {icon:"🌐",title:"Website & Platform",gradient:"from-teal-to-cyan",items:[{title:"GeeksforGeeks",desc:"Tutorial dan contoh code untuk berbagai topik",url:"https://www.geeksforgeeks.org/discrete-mathematics/"},{title:"Khan Academy",desc:"Video pembelajaran interaktif gratis",url:"https://www.khanacademy.org/computing/computer-science"},{title:"Brilliant.org",desc:"Platform pembelajaran dengan pendekatan problem-solving",url:"https://brilliant.org/courses/discrete-mathematics/"}]}
];

var filterCategories = [
  {key:"all",label:"🌟 Semua"},{key:"Sejarah",label:"📜 Sejarah"},{key:"Kriptografi",label:"🔐 Kriptografi"},
  {key:"Teori Graf",label:"🕸️ Teori Graf"},{key:"Probabilitas",label:"🎲 Probabilitas"},{key:"Alam",label:"🌿 Alam & Sains"},
  {key:"Bilangan",label:"🔢 Bilangan"},{key:"Terapan",label:"⚙️ Terapan"}
];

var stats = [
  {icon:'👥',target:10,label:'Mahasiswa Aktif',desc:'dari berbagai universitas',suffix:'+'},
  {icon:'📚',target:10,label:'Topik Materi',desc:'terus berkembang',suffix:'+'},
  {icon:'🏆',target:95,label:'Tingkat Kepuasan',desc:'dari survei pengguna',suffix:'%'}
];

var features = [
  {icon:'⚡',title:'Visualisasi Interaktif',desc:'Pahami konsep abstrak melalui animasi dan visualisasi real-time'},
  {icon:'🧠',title:'Adaptive Learning',desc:'Konten yang menyesuaikan dengan kecepatan belajar kamu'},
  {icon:'🎯',title:'Latihan Bertarget',desc:'Soal-soal yang dirancang untuk menguji pemahaman konsep inti'},
  {icon:'📖',title:'Studi Kasus Nyata',desc:'Aplikasi matematika dalam dunia teknologi dan industri'}
];

var creators = [
  {initial:"J",nim:"43325040",name:"Toga Sijabat",role:"Member",avatarClass:"avatar-1"},
  {initial:"J",nim:"43325024",name:"Joshua Nainggolan",role:"Member",avatarClass:"avatar-2"},
  {initial:"D",nim:"43325041",name:"Desmonth Heiwa Hutabarat",role:"Member",avatarClass:"avatar-3"},
  {initial:"A",nim:"43325006",name:"Abin Hendamo Boangmanalu",role:"Member",avatarClass:"avatar-4"}
];

/* ═══ STATE ═══ */
var currentPage = 'beranda';
var activeMateriTab = 'diskrit';
var factFilter = 'all';
var quizIndex = 0, quizScore = 0, quizAnswered = false, selectedAnswer = null;
var openAccordions = {};
var menuOpen = false;
var isLight = localStorage.getItem('mathematic-theme') === 'light';
var letters = ['A','B','C','D'];

/* ═══ NAVIGASI — Berpindah halaman ═══ */
function navigateTo(page, tab) {
  // Sembunyikan halaman lama
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  // Tampilkan halaman baru
  var el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  currentPage = page;

  // Update active link di dropdown
  document.querySelectorAll('.dropdown a').forEach(function(a) {
    a.classList.toggle('active', a.getAttribute('data-page') === page);
  });

  // Tab materi
  if (page === 'materi' && tab) {
    activeMateriTab = tab;
    renderMateri();
  }

  // Tutup menu
  menuOpen = false;
  document.getElementById('dropdownMenu').classList.remove('open');
  document.getElementById('menuBtn').textContent = '☰';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ═══ TOAST — Notifikasi singkat ═══ */
function showToast(msg, type) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(function() { t.classList.remove('show'); }, 3500);
}

/* ═══ MODAL — Popup detail konten ═══ */
function openModal(emoji, tag, title, sections, color) {
  var colorMap = { teal:'hsl(var(--teal))', amber:'hsl(var(--amber))', violet:'hsl(var(--violet))' };
  var bgMap = { teal:'hsl(174 72% 52%/.1)', amber:'hsl(38 95% 58%/.1)', violet:'hsl(265 65% 65%/.1)' };
  var c = color || 'teal';

  document.getElementById('modalHeader').innerHTML =
    '<span class="emoji">' + emoji + '</span>' +
    '<div><span style="display:inline-block;border-radius:99px;padding:4px 12px;font-family:var(--font-mono);font-size:.875rem;background:' + bgMap[c] + ';color:' + colorMap[c] + '">' + tag + '</span>' +
    '<h2 class="font-display" style="margin-top:8px;font-size:1.5rem;font-weight:800">' + title + '</h2></div>';

  var body = '';
  sections.forEach(function(s, i) {
    body += '<div class="modal-section" style="animation:fadeUp .5s cubic-bezier(0,0,0.2,1) ' + (i*0.1) + 's both">' +
      '<h4 style="color:' + colorMap[c] + '"><span>' + s.icon + '</span> ' + s.label + '</h4>' +
      '<p>' + s.content + '</p></div>';
  });
  document.getElementById('modalBody').innerHTML = body;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  var overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal when ESC is pressed or clicking outside
document.addEventListener('click', function(e) {
  var overlay = document.getElementById('modalOverlay');
  if (overlay && overlay.classList.contains('open') && e.target === overlay) {
    closeModal();
  }
});

/* ═══ TYPEWRITER — Efek ketik di hero ═══ */
function startTypewriter() {
  var words = ["Matematika Diskrit", "Aljabar Linear", "Kriptografi"];
  var el = document.getElementById('typewriter');
  var wordIdx = 0, charIdx = 0, isDeleting = false, isPaused = false;

  function step() {
    var word = words[wordIdx];
    if (isPaused) { isPaused = false; isDeleting = true; setTimeout(step, 60); return; }
    if (!isDeleting) {
      charIdx++;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) { isPaused = true; setTimeout(step, 1200); return; }
      setTimeout(step, 80 + Math.random() * 40);
    } else {
      charIdx--;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === 0) { isDeleting = false; wordIdx = (wordIdx + 1) % words.length; setTimeout(step, 300); return; }
      setTimeout(step, 40 + Math.random() * 20);
    }
  }
  setTimeout(step, 90);
}

/* ═══ RENDER FUNCTIONS — Membangun HTML dari data ═══ */

function renderSubjectCards() {
  var iconClasses = { diskrit:'icon-violet', aljabar:'icon-teal', kripto:'icon-amber' };
  var progClasses = { diskrit:'prog-violet', aljabar:'prog-teal', kripto:'prog-amber' };
  var html = '';
  subjects.forEach(function(s, i) {
    var pct = (s.availableTopics / s.totalTopics) * 100;
    html += '<div class="subject-card" data-card-index="' + i + '" style="animation-delay:' + (i*0.15) + 's;--hover-pct:' + pct + '%">' +
      '<div class="top"><div class="icon-box ' + (iconClasses[s.id]||'icon-teal') + '">' + s.icon + '</div>' +
      '<div style="min-width:0;flex:1"><h3>' + s.title + '</h3><p>' + s.description + '</p></div>' +
      '<span class="expand-icon">&#9660;</span></div>' +
      '<div class="topics-grid"><div class="topics-inner">';
    s.topics.forEach(function(t) {
      html += '<div class="topic-tile"><div class="num">' + t.num + '</div><div class="name">' + t.name + '</div></div>';
    });
    html += '</div><div class="topics-bottom"><div style="flex:1">' +
      '<div class="font-mono" style="font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:hsl(var(--fg3))">' + s.availableTopics + ' dari ' + s.totalTopics + ' topik tersedia</div>' +
      '<div class="progress-bar"><div class="progress-fill ' + (progClasses[s.id]||'prog-teal') + '" style="width:' + pct + '%"></div></div>' +
      '</div><a href="#materi" class="btn-sm-teal" onclick="navigateTo(\'materi\');return false;">Pelajari &#10132;</a>' +
      '</div></div></div>';
  });
  document.getElementById('subjectCards').innerHTML = html;
  initSubjectCards();
}

/* ═══ SUBJECT CARDS — Active State Logic ═══
   Menggantikan sistem :hover dengan class .active berbasis JS.
   - Card pertama otomatis aktif saat load
   - Satu card selalu aktif (tidak ada kondisi semua tertutup)
   - Bekerja dengan click (mobile) dan mouseenter (desktop)
*/
function initSubjectCards() {
  var cards = document.querySelectorAll('#subjectCards .subject-card');
  if (!cards.length) return;

  function activateCard(targetCard) {
    cards.forEach(function(c) { c.classList.remove('active'); });
    targetCard.classList.add('active');
  }

  cards.forEach(function(card) {
    // Click: wajib untuk mobile compatibility
    card.addEventListener('click', function(e) {
      if (e.target.closest('.btn-sm-teal')) return;
      activateCard(card);
    });

    // Mouseenter (opsional): untuk pengalaman desktop yang lebih smooth
    card.addEventListener('mouseenter', function() {
      activateCard(card);
    });
  });

  // Card pertama aktif saat pertama kali load
  activateCard(cards[0]);
}

function renderStats() {
  var html = '';
  stats.forEach(function(s) {
    html += '<div class="stat-card"><div class="stat-icon">' + s.icon + '</div>' +
      '<div class="stat-num">' + s.target + s.suffix + '</div>' +
      '<div class="stat-label">' + s.label + '</div>' +
      '<div class="stat-desc">' + s.desc + '</div></div>';
  });
  document.getElementById('statsGrid').innerHTML = html;
}

function renderFeatures() {
  var html = '';
  features.forEach(function(f) {
    html += '<div class="feature-card"><div class="top-row"><div class="ficon">' + f.icon + '</div>' +
      '<div><h3>' + f.title + '</h3><p>' + f.desc + '</p></div></div></div>';
  });
  document.getElementById('featuresGrid').innerHTML = html;
}

function openModuleFile(file) {
  // Simpan state sebelum pergi agar tombol kembali browser kembali ke halaman materi
  history.pushState({ page: 'materi', tab: activeMateriTab }, '', '?page=materi&tab=' + activeMateriTab);
  // Simpan tab untuk tombol kembali di file modul
  sessionStorage.setItem('materiTab', activeMateriTab);
  window.location.href = file;
}

function openGameFile(file) {
  history.pushState({ page: 'game' }, '', '?page=game');
  window.location.href = file;
}

function renderMateri() {
  // Tabs
  var tabs = [{key:'diskrit',label:'∑ Matematika Diskrit'},{key:'aljabar',label:'λ Aljabar Linear'},{key:'kriptografi',label:'🔐 Kriptografi'}];
  var tabHtml = '';
  tabs.forEach(function(t) {
    tabHtml += '<button class="tab-btn' + (activeMateriTab===t.key?' active':'') + '" onclick="activeMateriTab=\'' + t.key + '\';renderMateri()">' + t.label + '</button>';
  });
  document.getElementById('materiTabs').innerHTML = tabHtml;

  // Content
  var sections = materiData[activeMateriTab] || [];
  var html = '';
  sections.forEach(function(s) {
    html += '<div style="margin-bottom:48px"><div class="section-header"><span class="emoji">' + s.icon + '</span><h2 class="font-display">' + s.title + '</h2></div><div class="materi-grid">';
    s.items.forEach(function(item) {
      html += '<div class="materi-card"' + (item.file ? ' onclick="openModuleFile(\'' + item.file + '\')"' : '') + '>' +
        '<div class="accent-line"></div><div class="num">' + item.num + '</div>' +
        '<h3>' + item.title + '</h3><p class="mdesc">' + item.description + '</p>' +
        '<span class="tag">' + item.tag + '</span>' +
        (item.file ? '<span class="link-arrow">➔</span>' : '') + '</div>';
    });
    html += '</div></div>';
  });
  document.getElementById('materiContent').innerHTML = html;
}

function renderGame() {
  var html = '';
  gameData.forEach(function(section) {
    html += '<div style="margin-bottom:48px"><div class="section-header"><span class="emoji">' + section.icon + '</span><h2 class="font-display">' + section.title + '</h2></div><div class="materi-grid">';
    section.items.forEach(function(item) {
      var cls = 'materi-card';
      var tagCls = 'tag';
      if (item.isNew) {
        if (item.accentColor==='teal') { cls += ' new-teal'; tagCls += ' tag-teal'; }
        else if (item.accentColor==='violet') { cls += ' new-violet'; tagCls += ' tag-violet'; }
        else if (item.accentColor==='green') { cls += ' new-green'; tagCls += ' tag-green'; }
      }
      html += '<div class="' + cls + '"' + (item.file ? ' onclick="openGameFile(\'' + item.file + '\')"' : '') + '>' +
        '<div class="accent-line"></div><div class="num">' + item.num + '</div>' +
        '<h3>' + item.title + '</h3><p class="mdesc">' + item.description + '</p>' +
        '<span class="' + tagCls + '">' + item.tag + '</span>' +
        (item.file ? '<span class="link-arrow">➔</span>' : '') + '</div>';
    });
    html += '</div></div>';
  });
  document.getElementById('gameContent').innerHTML = html;
}

function renderFunFacts() {
  var filtered = funFacts;
  var html = '';
  filtered.forEach(function(f, idx) {
    var factId = 'fact-' + idx;
    html += '<div class="fact-card" data-fact-id="' + idx + '">' +
      '<span class="emoji">' + f.emoji + '</span><h3>' + f.title + '</h3><p>' + f.summary + '</p>' +
      '<div class="bottom"><span class="tag">' + f.tag + '</span><span class="read-more">Baca selengkapnya →</span></div></div>';
  });
  document.getElementById('factGrid').innerHTML = html;

  // Add event listeners after rendering
  document.querySelectorAll('.fact-card').forEach(function(card, idx) {
    card.addEventListener('click', function() {
      var factIdx = parseInt(this.getAttribute('data-fact-id'));
      var f = filtered[factIdx];
      if (f) {
        openModal(f.emoji, f.tag, f.title, 
          [{icon:'📖',label:'Cerita Lengkap',content:f.details.fullStory},
           {icon:'💡',label:'Kenapa Ini Penting?',content:f.details.whyItMatters},
           {icon:'🎯',label:'Fun Extra',content:f.details.funExtra}],
          f.color);
      }
    });
  });
}

function renderVokasi() {
  var html = '';
  vokasiItems.forEach(function(v, idx) {
    html += '<div class="vokasi-card" data-vokasi-id="' + idx + '">' +
      (v.isNew ? '<span class="new-badge">BARU</span>' : '') +
      '<span class="font-mono" style="font-size:.875rem;color:hsl(var(--fg3))">' + v.num + '</span>' +
      '<span style="display:block;font-size:2.25rem;margin:12px 0">' + v.icon + '</span>' +
      '<h3 style="font-weight:700;color:hsl(var(--fg));margin-bottom:8px">' + v.title + '</h3>' +
      '<p style="font-size:.875rem;line-height:1.6;color:hsl(var(--fg2));margin-bottom:12px">' + v.summary + '</p>' +
      '<span class="hover-arrow">Lihat detail →</span></div>';
  });
  document.getElementById('vokasiGrid').innerHTML = html;

  // Add event listeners after rendering
  document.querySelectorAll('.vokasi-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var vokasiIdx = parseInt(this.getAttribute('data-vokasi-id'));
      var v = vokasiItems[vokasiIdx];
      if (v) {
        openModal(v.icon, v.tag, v.title,
          [{icon:'📚',label:'Penjelasan Detail',content:v.details.explanation},
           {icon:'💻',label:'Contoh Nyata',content:v.details.realExample},
           {icon:'🎯',label:'Skill yang Dibutuhkan',content:v.details.skillsNeeded}],
          'amber');
      }
    });
  });
}

function renderRealLife() {
  var html = '';
  realLifeItems.forEach(function(item) {
    var isOpen = openAccordions[item.id];
    html += '<div class="accordion-item' + (isOpen ? ' expanded' : '') + '">' +
      '<button class="accordion-btn" onclick="toggleAccordion(\'' + item.id + '\')">' +
      '<span class="emoji">' + item.emoji + '</span>' +
      '<div style="min-width:0;flex:1"><h3>' + item.title + '</h3><p class="sub">' + item.subtitle + '</p></div>' +
      '<span class="chevron' + (isOpen ? ' open' : '') + '">▼</span></button>' +
      '<div class="accordion-content' + (isOpen ? ' open' : '') + '">' +
      '<p>' + item.summary + '</p>' +
      '<button type="button" class="read-more-btn" data-real-id="' + item.id + '">📖 Baca cerita lengkap →</button>' +
      '</div></div>';
  });
  document.getElementById('realLifeAccordion').innerHTML = html;

  document.querySelectorAll('.read-more-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var itemId = this.dataset.realId;
      var item = realLifeItems.find(function(r) { return r.id === itemId; });
      if (!item) return;
      openModal(item.emoji, item.subtitle, item.title, [
        {icon:'⚙️', label:'Cara Kerjanya', content:item.details.howItWorks},
        {icon:'🧮', label:'Matematika di Baliknya', content:item.details.mathBehind},
        {icon:'🤯', label:'Mind Blown!', content:item.details.mindBlown}
      ], 'violet');
    });
  });
}

function toggleAccordion(id) {
  openAccordions[id] = !openAccordions[id];
  renderRealLife();
}

function renderQuiz() {
  var box = document.getElementById('quizBox');
  var pct = quizIndex >= quizData.length ? 100 : (quizIndex / quizData.length) * 100;

  var html = '<div class="quiz-header"><div class="quiz-progress">' +
    '<div class="quiz-bar"><div class="quiz-bar-fill" style="width:' + pct + '%"></div></div>' +
    '<span class="font-mono" style="font-size:.875rem;color:hsl(var(--fg3));margin-top:6px;display:block">' +
    (quizIndex >= quizData.length ? 'Selesai!' : 'Soal ' + (quizIndex+1) + ' dari ' + quizData.length) + '</span>' +
    '</div><div style="text-align:center"><span class="font-mono" style="font-size:.75rem;text-transform:uppercase;color:hsl(var(--fg3))">Skor</span>' +
    '<span class="font-display grad-text" style="display:block;font-size:1.5rem;font-weight:900">' + quizScore + '</span></div></div>';

  html += '<div class="quiz-body">';
  if (quizIndex >= quizData.length) {
    var emoji = quizScore >= 4 ? '🏆' : quizScore >= 3 ? '😊' : '💪';
    var msg = quizScore >= 4 ? 'Luar Biasa!' : quizScore >= 3 ? 'Bagus!' : 'Semangat!';
    html += '<div class="text-center animate-fade-up"><span style="font-size:3rem">' + emoji + '</span>' +
      '<div class="font-display" style="margin-top:16px;font-size:1.5rem;font-weight:800">' + msg + '</div>' +
      '<div style="margin-top:8px;font-size:1.125rem;color:hsl(var(--fg2))">Skor kamu: <strong>' + quizScore + '/' + quizData.length + '</strong> (' + Math.round(quizScore/quizData.length*100) + '%)</div>' +
      '<button class="btn-primary" style="margin-top:24px" onclick="restartQuiz()">Coba Lagi 🔄</button></div>';
  } else {
    var q = quizData[quizIndex];
    html += '<div class="animate-fade-up"><div class="font-mono" style="margin-bottom:12px;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:hsl(var(--violet))">Soal ' + (quizIndex+1) + '</div>' +
      '<div style="margin-bottom:8px;font-size:1.125rem;font-weight:700;line-height:1.6">' + q.q + '</div>' +
      '<div style="margin-bottom:24px;font-size:.875rem;font-style:italic;color:hsl(var(--fg3))">💡 ' + q.hint + '</div>';
    q.opts.forEach(function(opt, i) {
      var cls = 'quiz-opt';
      if (quizAnswered && i === q.ans) cls += ' correct';
      if (quizAnswered && i === selectedAnswer && i !== q.ans) cls += ' wrong';
      html += '<button class="' + cls + '" onclick="pickAnswer(' + i + ')"' + (quizAnswered ? ' disabled' : '') + '>' +
        '<span class="letter">' + letters[i] + '</span><span>' + opt + '</span></button>';
    });
    if (quizAnswered) {
      var isCorrect = selectedAnswer === q.ans;
      html += '<div style="margin-top:16px;border-radius:var(--radius);padding:16px;font-size:.875rem;background:' +
        (isCorrect ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)') + ';color:' + (isCorrect ? '#4ade80' : '#f87171') + '">' +
        (isCorrect ? '✅ Benar!' : '❌ Kurang tepat.') + ' ' + q.exp + '</div>' +
        '<button class="btn-primary" style="margin-top:16px" onclick="nextQuiz()">' +
        (quizIndex < quizData.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil 🏆') + '</button>';
    }
    html += '</div>';
  }
  html += '</div>';
  box.innerHTML = html;
}

function pickAnswer(i) {
  if (quizAnswered) return;
  quizAnswered = true;
  selectedAnswer = i;
  if (i === quizData[quizIndex].ans) quizScore++;
  renderQuiz();
}

function nextQuiz() {
  quizIndex++;
  quizAnswered = false;
  selectedAnswer = null;
  renderQuiz();
}

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  selectedAnswer = null;
  renderQuiz();
}

function renderReferensi() {
  var gradients = {
    'from-teal-to-amber':'linear-gradient(135deg,hsl(var(--teal)),hsl(var(--amber)))',
    'from-teal-to-cyan':'linear-gradient(135deg,hsl(var(--teal)),#0891b2)',
    'from-violet-to-indigo':'linear-gradient(135deg,hsl(var(--violet)),#4338ca)'
  };
  var html = '';
  referensiData.forEach(function(section) {
    html += '<div style="margin-bottom:48px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">' +
      '<div style="width:40px;height:40px;border-radius:10px;background:' + (gradients[section.gradient]||gradients['from-teal-to-amber']) + ';display:flex;align-items:center;justify-content:center;font-size:1.25rem">' + section.icon + '</div>' +
      '<h2 class="font-display" style="font-size:1.25rem;font-weight:800">' + section.title + '</h2></div>';
    section.items.forEach(function(item) {
      html += '<div class="ref-card"><div class="inner"><div><h3>' + item.title + '</h3><p class="rdesc">' + item.desc + '</p>' +
        (item.detail ? '<p class="rdesc" style="margin-top:8px">' + item.detail + '</p>' : '') + '</div>' +
        (item.url ? '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer" class="link-icon">↗</a>' : '') +
        '</div></div>';
    });
    html += '</div>';
  });
  document.getElementById('referensiContent').innerHTML = html;
}

function renderCreators() {
  var html = '';
  creators.forEach(function(c) {
    html += '<div class="creator-card"><div class="creator-avatar ' + c.avatarClass + '">' + c.initial + '</div>' +
      '<div class="creator-nim">NIM: ' + c.nim + '</div>' +
      '<div class="creator-name">' + c.name + '</div>' +
      '<div class="creator-role">' + c.role + '</div></div>';
  });
  document.getElementById('creatorsGrid').innerHTML = html;
}

/* ═══ SCROLL EFFECT — Shadow pada navbar ═══ */
window.addEventListener('scroll', function() {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ═══ THEME TOGGLE — Dark/Light mode ═══ */
function applyTheme() {
  document.documentElement.classList.toggle('light', isLight);
  document.getElementById('themeBtn').textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('mathematic-theme', isLight ? 'light' : 'dark');
}

document.getElementById('themeBtn').addEventListener('click', function() {
  isLight = !isLight;
  applyTheme();
});

/* ═══ MENU TOGGLE — Buka/tutup dropdown ═══ */
document.getElementById('menuBtn').addEventListener('click', function() {
  menuOpen = !menuOpen;
  document.getElementById('dropdownMenu').classList.toggle('open', menuOpen);
  this.textContent = menuOpen ? '✕' : '☰';
});

// Tutup menu saat klik di luar
document.addEventListener('mousedown', function(e) {
  var wrapper = document.getElementById('menuWrapper');
  if (menuOpen && wrapper && !wrapper.contains(e.target)) {
    menuOpen = false;
    document.getElementById('dropdownMenu').classList.remove('open');
    document.getElementById('menuBtn').textContent = '☰';
  }
});

/* ═══ CLOSE MODAL ON ESCAPE ═══ */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

/* ═══ CONTACT FORM ═══ */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var n = this.elements.name.value;
  var em = this.elements.email.value;
  var m = this.elements.message.value;
  if (!n || !em || !m) { showToast('Mohon lengkapi semua field!', 'error'); return; }
  showToast('Pesan berhasil dikirim! Terima kasih.', 'success');
  this.reset();
});

/* ═══ INIT — Jalankan semua render saat halaman dimuat ═══ */
(function init() {
  applyTheme();
  startTypewriter();
  renderSubjectCards();
  renderStats();
  renderFeatures();
  renderMateri();
  renderGame();
  renderFunFacts();
  renderVokasi();
  renderRealLife();
  renderQuiz();
  renderReferensi();
  renderCreators();
  handlePageParam();
})();
/* ═══════════════════════════════════════════
   ADAPTIVE CAROUSEL SYSTEM
   ─────────────────────────────────────────
   Desktop (≥1024px) : grid statis, tanpa slider
   Tablet  (≥768px)  : slider per-grup (2–3 card)
   Mobile  (<768px)  : slider 1 card (~1.1 width)
   ─────────────────────────────────────────
   Logika:
   1. Hitung berapa card yang muat di container
   2. Jika semua card muat → grid biasa, tanpa slider
   3. Jika tidak muat   → aktifkan slider, set lebar
      card agar N card terlihat, dots per slide-group
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Selector target ── */
  var TARGET_SELECTORS = [
    '.stats-grid',
    '.features-grid',
    '.materi-grid',
    '.fact-grid',
    '.vokasi-grid',
  ];

  /* ── Breakpoints ── */
  var BP_DESKTOP = 1024;
  var BP_TABLET  = 768;

  /* ─────────────────────────────────────
     Hitung berapa card muat di container
     Gunakan lebar minimal card sebagai patokan
  ───────────────────────────────────────*/
  var CARD_MIN_WIDTH = 260; // px — sama dengan minmax CSS
  var GAP            = 24;  // px — gap antar card

  function getContainerWidth(grid) {
    return grid.parentElement
      ? grid.parentElement.getBoundingClientRect().width
      : grid.getBoundingClientRect().width;
  }

  function calcCardsPerView(containerWidth, vw) {
    if (vw >= BP_DESKTOP) {
      /* Desktop: hitung berapa banyak muat, min 1 */
      return Math.max(1, Math.floor((containerWidth + GAP) / (CARD_MIN_WIDTH + GAP)));
    } else if (vw >= BP_TABLET) {
      /* Tablet: tampilkan 2 card (atau 3 jika lebar) */
      return containerWidth >= 720 ? 3 : 2;
    } else {
      /* Mobile: 1 card (dengan sedikit peek) */
      return 1;
    }
  }

  /* ─────────────────────────────────────
     Pastikan grid dibungkus .carousel-wrap
     dan punya tombol prev/next serta dots
  ───────────────────────────────────────*/
  function ensureWrapped(grid) {
    if (grid.parentElement && grid.parentElement.classList.contains('carousel-wrap')) {
      return grid.parentElement;
    }
    var wrap = document.createElement('div');
    wrap.className = 'carousel-wrap';
    grid.parentNode.insertBefore(wrap, grid);
    wrap.appendChild(grid);

    /* Tombol navigasi */
    var prev = document.createElement('button');
    prev.className = 'carousel-btn prev';
    prev.type = 'button';
    prev.setAttribute('aria-label', 'Sebelumnya');
    prev.innerHTML = '&#9664;';

    var next = document.createElement('button');
    next.className = 'carousel-btn next';
    next.type = 'button';
    next.setAttribute('aria-label', 'Berikutnya');
    next.innerHTML = '&#9654;';

    /* Dots */
    var dotsEl = document.createElement('div');
    dotsEl.className = 'carousel-dots';

    wrap.appendChild(prev);
    wrap.appendChild(next);
    wrap.appendChild(dotsEl);

    /* Scroll event untuk update tombol & dots */
    var scrollTimer;
    grid.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        updateDots(grid);
        updateButtons(grid);
      }, 50);
    });

    prev.addEventListener('click', function () { scrollByGroup(grid, -1); });
    next.addEventListener('click', function () { scrollByGroup(grid, 1); });

    return wrap;
  }

  /* ─────────────────────────────────────
     Aktifkan / nonaktifkan mode slider
  ───────────────────────────────────────*/
  function activateSlider(grid, cardsPerView, vw) {
    var wrap = grid.parentElement;
    var containerWidth = getContainerWidth(grid);
    var cardWidth;

    if (vw < BP_TABLET) {
      /* Mobile: 1 card dengan sedikit peek (5%) */
      cardWidth = containerWidth * 0.88;
    } else {
      /* Tablet: N cards per view */
      cardWidth = (containerWidth - GAP * (cardsPerView - 1)) / cardsPerView;
    }

    /* Terapkan lebar ke setiap card */
    Array.from(grid.children).forEach(function (card) {
      card.style.flex     = '0 0 ' + Math.floor(cardWidth) + 'px';
      card.style.maxWidth = Math.floor(cardWidth) + 'px';
      card.style.minWidth = '0';
    });

    var alreadyActive = grid.classList.contains('is-slider');

    /* Aktifkan mode slider */
    grid.classList.add('is-slider');
    if (wrap) wrap.classList.add('slider-active');

    /* Reset scroll ke awal HANYA jika baru pertama kali diaktifkan */
    if (!alreadyActive) {
      grid.scrollLeft = 0;
    }
  }

  function deactivateSlider(grid) {
    var wrap = grid.parentElement;

    /* Reset lebar card agar grid CSS mengambil alih */
    Array.from(grid.children).forEach(function (card) {
      card.style.flex     = '';
      card.style.maxWidth = '';
      card.style.minWidth = '';
    });

    grid.classList.remove('is-slider');
    if (wrap) wrap.classList.remove('slider-active');
    grid.scrollLeft = 0;
  }

  /* ─────────────────────────────────────
     Hitung jumlah slide (grup card)
     1 slide = N cards yang terlihat sekaligus
  ───────────────────────────────────────*/
  function getSlideCount(grid, cardsPerView) {
    var total = grid.children.length;
    return Math.ceil(total / cardsPerView);
  }

  /* ─────────────────────────────────────
     Scroll sebesar 1 grup card (bukan 1 card)
  ───────────────────────────────────────*/
  function getGroupStep(grid, cardsPerView) {
    var first = grid.children[0];
    if (!first) return grid.clientWidth;
    var cardW = first.getBoundingClientRect().width;
    var styles = getComputedStyle(grid);
    var gap = parseFloat(styles.columnGap || styles.gap || '0') || GAP;
    return (cardW + gap) * cardsPerView;
  }

  function scrollByGroup(grid, dir) {
    /* Ambil cardsPerView dari dataset yang disimpan saat enhance */
    var cpv = parseInt(grid.dataset.cardsPerView || '1', 10);
    var step = getGroupStep(grid, cpv);
    grid.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  /* ─────────────────────────────────────
     Dots — satu dot per slide-group
  ───────────────────────────────────────*/
  function buildDots(grid, slideCount) {
    var wrap = grid.parentElement;
    if (!wrap) return;
    var dotsEl = wrap.querySelector('.carousel-dots');
    if (!dotsEl) return;

    /* Rebuild hanya jika jumlah slide berubah */
    if (parseInt(dotsEl.dataset.slideCount || '0', 10) === slideCount) return;
    dotsEl.dataset.slideCount = slideCount;
    dotsEl.innerHTML = '';

    for (var i = 0; i < slideCount; i++) {
      (function (idx) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Ke slide ' + (idx + 1));
        dot.addEventListener('click', function () {
          var cpv = parseInt(grid.dataset.cardsPerView || '1', 10);
          var step = getGroupStep(grid, cpv);
          grid.scrollTo({ left: step * idx, behavior: 'smooth' });
        });
        dotsEl.appendChild(dot);
      })(i);
    }
  }

  function updateDots(grid) {
    var wrap = grid.parentElement;
    if (!wrap) return;
    var dots = wrap.querySelectorAll('.carousel-dot');
    if (!dots.length) return;

    var cpv  = parseInt(grid.dataset.cardsPerView || '1', 10);
    var step = getGroupStep(grid, cpv);
    var idx  = step > 0 ? Math.round(grid.scrollLeft / step) : 0;
    idx = Math.max(0, Math.min(dots.length - 1, idx));

    dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
  }

  /* ─────────────────────────────────────
     Update status tombol prev/next
  ───────────────────────────────────────*/
  function updateButtons(grid) {
    var wrap = grid.parentElement;
    if (!wrap) return;
    var prev = wrap.querySelector('.carousel-btn.prev');
    var next = wrap.querySelector('.carousel-btn.next');
    if (!prev || !next) return;

    var atStart = grid.scrollLeft <= 4;
    var atEnd   = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 4;
    prev.disabled = atStart;
    next.disabled = atEnd;
  }

  /* ─────────────────────────────────────
     Enhance: titik masuk utama per grid
  ───────────────────────────────────────*/
  function enhance(grid) {
    if (!grid || !grid.children.length) return;

    /* Pastikan sudah dibungkus */
    ensureWrapped(grid);

    var vw             = window.innerWidth;
    var containerWidth = getContainerWidth(grid);
    var totalCards     = grid.children.length;
    var cardsPerView   = calcCardsPerView(containerWidth, vw);

    /* Simpan untuk dipakai scrollByGroup & dot click */
    var prevCpv = parseInt(grid.dataset.cardsPerView || '0', 10);
    grid.dataset.cardsPerView = cardsPerView;

    var needsSlider = totalCards > cardsPerView;
    var alreadySlider = grid.classList.contains('is-slider');

    if (needsSlider) {
      /* Hanya re-activate jika cardsPerView berubah (misal resize layar) */
      if (!alreadySlider || prevCpv !== cardsPerView) {
        activateSlider(grid, cardsPerView, vw);
      }
      var slideCount = getSlideCount(grid, cardsPerView);
      buildDots(grid, slideCount);
      updateDots(grid);
      updateButtons(grid);
    } else {
      deactivateSlider(grid);
      /* Kosongkan dots jika tidak perlu slider */
      var wrap = grid.parentElement;
      if (wrap) {
        var dotsEl = wrap.querySelector('.carousel-dots');
        if (dotsEl) { dotsEl.innerHTML = ''; dotsEl.dataset.slideCount = '0'; }
      }
    }
  }

  /* ─────────────────────────────────────
     Scan semua target grid di halaman
  ───────────────────────────────────────*/
  function scanAll() {
    TARGET_SELECTORS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(enhance);
    });
  }

  /* Debounce resize agar tidak terlalu sering */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(scanAll, 120);
  });

  /* Observe DOM — konten dirender secara async */
  var scheduled = false;
  function schedule(mutations) {
    /* Hanya proses jika ada node yang benar-benar ditambah/dihapus */
    var hasNodeChange = mutations && mutations.some(function (m) {
      return m.addedNodes.length > 0 || m.removedNodes.length > 0;
    });
    if (!hasNodeChange) return;
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      scanAll();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      scanAll();
      new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
    });
  } else {
    scanAll();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  }

})();
/* === MENU RESIZE FIX === */
window.addEventListener('resize', function() {
  if (window.innerWidth > 768 && menuOpen) {
    menuOpen = false;
    document.getElementById('dropdownMenu').classList.remove('open');
    document.getElementById('menuBtn').textContent = '☰';
  }
});
