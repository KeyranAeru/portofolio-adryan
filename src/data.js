export const LINKS = {
  email:    "adryanpurnama04@gmail.com",
  whatsapp: "https://wa.me/+6285945653285",
  github:   "https://github.com/keyranaeru",
  linkedin: "https://www.linkedin.com/in/adryan-purnama-januar-7b0a4b1b3/",
  instagram:"https://www.instagram.com/yaxvn_"
};

export const T = {
  logo:{id:"Adryan Purnama Januar",en:"Adryan Purnama Januar"},
  n_home:{id:"Beranda",en:"Home"}, n_about:{id:"Tentang",en:"About"}, n_proj:{id:"Proyek",en:"Projects"},
  n_proof:{id:"Bukti",en:"Proof"}, n_contact:{id:"Kontak",en:"Contact"}, n_hire:{id:"Hubungi saya",en:"Hire me"},

  h_title:{id:"Halo, saya Adryan.",en:"Hi, I’m Adryan."},
  h_sub:{id:"Saya Web Developer.",en:"I'm a Web Developer."},
  h_desc:{id:"Lulusan Rekayasa Perangkat Lunak dari Makassar. Saya membuat aplikasi web fullstack dengan PHP & MySQL.",
          en:"Software Engineering graduate from Makassar. I build fullstack web apps with PHP & MySQL."},
  h_cta:{id:"Lihat proyek saya",en:"See my projects"},
  h_note:{id:"Terbuka untuk kerja & freelance",en:"Open to work & freelance"},

  a_title:{id:"Tentang saya",en:"About me"},
  a_lead:{id:"Sedikit cerita tentang siapa saya dan ke mana saya melangkah.",en:"A little about who I am and where I’m heading."},
  a_story:{id:"Saya menikmati proses mengubah ide menjadi sesuatu yang bisa digunakan atau dimainkan. Latar Rekayasa Perangkat Lunak memberi saya bekal membangun aplikasi web, sementara pengalaman mengembangkan game edukasi 2D Cakap Hanyu memperluas cara saya merancang pengalaman interaktif. Saya ingin terus belajar, teliti dalam menyelesaikan masalah, dan membuat karya yang bermanfaat bagi orang lain.",
           en:"I enjoy turning ideas into things people can use or play. My Software Engineering background gave me the foundation to build web applications, while developing the 2D educational game Cakap Hanyu broadened how I think about interactive experiences. I want to keep learning, solve problems thoughtfully, and create work that is useful to others."},
  a_focus:{id:"Fokus bidang",en:"Focus areas"},
  a_exp:{id:"Pengalaman & pendidikan",en:"Experience & education"},
  a_skills:{id:"Skill & tech stack",en:"Skills & tech stack"},
  a_goal:{id:"Tujuan karier",en:"Career goals"},
  a_goal_txt:{id:"Berkembang sebagai fullstack developer, membangun produk yang berdampak bersama tim yang saling belajar.",
              en:"Grow as a fullstack developer, building impactful products with a team that learns together."},

  p_title:{id:"Proyek",en:"Projects"}, p_lead:{id:"Beberapa karya yang pernah saya buat.",en:"Some things I’ve built."},
  e_title:{id:"Bukti kegiatan",en:"Proof of work"}, e_lead:{id:"Dokumentasi dari pengalaman magang, freelance, dan kegiatan lainnya.",en:"Documentation from my internship, freelance work, and other activities."},
  c_title:{id:"Kontak",en:"Contact"}, c_lead:{id:"Punya proyek atau peluang kerja? Hubungi saya lewat salah satu kanal di bawah.",en:"Got a project or an opportunity? Reach me through any of the channels below."},
  f_rights:{id:"Hak cipta dilindungi.",en:"All rights reserved."}
};

export const FOCUS = [
  {t:{id:"Web Fullstack",en:"Fullstack Web"}, d:{id:"Aplikasi web dengan PHP, MySQL, HTML, CSS, dan JavaScript.",en:"Web apps with PHP, MySQL, HTML, CSS, and JavaScript."}}
];

export const EXP = [
  {when:{id:"Agustus 2026",en:"August 2026"}, t:{id:"Freelance Game Developer",en:"Freelance Game Developer"}, d:{id:"Mengembangkan game edukasi 2D “Cakap Hanyu” untuk belajar bahasa Mandarin.",en:"Built “Cakap Hanyu”, a 2D educational game for learning Mandarin."}},
  {when:{id:"Agu – Nov 2024",en:"Aug – Nov 2024"}, t:{id:"Magang 2D & 3D Animator · MSV Studio, Sleman",en:"2D & 3D Animator Intern · MSV Studio, Sleman"}, d:{id:"Membantu proses produksi animasi 2D, menyiapkan aset visual, serta berkolaborasi dengan tim animator selama proses produksi di MSV Studio.",en:"Assisted with 2D animation production at MSV Studio, contributing to visual assets and collaborating with the animation team throughout the production process."}},
  {when:{id:"2022 – 2026",en:"2022 – 2026"}, t:{id:"S1 Rekayasa Perangkat Lunak · Universitas Dipa Makassar",en:"B.Sc. Software Engineering · Universitas Dipa Makassar"}, d:{id:"IPK 3,52 (Cum Laude).",en:"GPA 3.52 (Cum Laude)."}}
];

export const SKILLS = [
  {t:{id:"Bahasa pemrograman",en:"Languages"}, items:["C#","PHP","JavaScript","HTML","CSS","SQL"]},
  {t:{id:"Tools & engine",en:"Tools & engines"}, items:["Unity Engine","MySQL","Git","Adobe Illustrator"]},
  {t:{id:"Soft skill",en:"Soft skills"}, items:[{id:"Kerja tim",en:"Teamwork"},{id:"Pemecahan masalah",en:"Problem solving"},{id:"Cepat belajar",en:"Fast learner"}]}
];

export const PROJECTS = [
  {slug:"lontara", t:"Lontara", tag:["Unity","C#","Android"], img:"img/lontara.jpeg", demo:"img/lontara.apk", code:"#",
   long:{id:"Game edukasi Android yang dibuat dengan Unity untuk siswa SDN Bulurokeng Makassar, memakai algoritma Shuffle. Ini adalah proyek skripsi saya.",en:"An educational Android game built with Unity for students of SDN Bulurokeng Makassar, using the Shuffle algorithm. This is my thesis project."},
   d:{id:"Game Android edukasi untuk SDN Bulurokeng Makassar. Proyek skripsi dengan algoritma Shuffle.",en:"Educational Android game for SDN Bulurokeng Makassar. Thesis project using the Shuffle algorithm."}},
  {slug:"cakap-hanyu", t:"Cakap Hanyu", tag:["Unity","C#","2D"], img:"img/cakap.jpeg", demo:"img/cakap-hanyu.apk", code:"#",
   long:{id:"Game edukasi 2D untuk belajar bahasa Mandarin, dikerjakan sebagai proyek freelance pada Agustus 2026.",en:"A 2D educational game for learning Mandarin, delivered as a freelance project in August 2026."},
   d:{id:"Game edukasi 2D untuk belajar bahasa Mandarin (proyek freelance).",en:"2D educational game for learning Mandarin (freelance project)."}},
  {slug:"Lemburku", t:{id:"Lemburku",en:"Lemburku"}, tag:["PHP","MySQL","HTML/CSS"], img:"img/Lemburku.png", demo:"https://lemburku.page.gd/", code:"#",
   long:{id:"Lemburku adalah aplikasi web untuk membantu pencatatan dan rekap absensi karyawan. Dibangun menggunakan PHP dan MySQL, aplikasi ini menyediakan akun admin dan user untuk mencoba pengalaman penggunaan sesuai perannya.\n\nAkun admin: hrd_maman / kata sandi: admin123\nAkun user: budi / kata sandi: user123",
         en:"Lemburku is a web app for recording and summarizing employee attendance. Built with PHP and MySQL, it provides admin and user accounts so visitors can explore the experience for each role.\n\nAdmin account: hrd_maman / password: admin123\nUser account: budi / password: user123"},
   d:{id:"Aplikasi web pencatatan dan rekap absensi karyawan dengan PHP dan MySQL.",en:"An employee attendance tracking and reporting web app built with PHP and MySQL."}}
];

export const PROOFS = [
  {t:{id:"Magang di MSV Studio",en:"Internship at MSV Studio"}, when:{id:"Agu – Nov 2024",en:"Aug – Nov 2024"}, img:"img/magang.jpeg", d:{id:"Foto kegiatan / sertifikat magang.",en:"Activity photos / internship certificate."}},
  {t:{id:"Freelance: Cakap Hanyu",en:"Freelance: Cakap Hanyu"}, when:{id:"Agustus 2026",en:"August 2026"}, img:"img/cakap.jpeg", d:{id:"Tangkapan layar game / bukti kerja.",en:"Game screenshots / proof of work."}},
  {t:{id:"Skripsi: Lontara",en:"Thesis: Lontara"}, when:"2026", img:"img/skripsi.jpeg", d:{id:"Dokumentasi uji coba di SDN Bulurokeng.",en:"Documentation of the trial at SDN Bulurokeng."}}
];
