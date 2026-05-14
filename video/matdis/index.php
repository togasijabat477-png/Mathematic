<?php
// ============================================
// DATA PLAYLIST LOGIKA MATEMATIKA
// Video diganti dengan materi yang masih sesuai:
// 1. Pernyataan, Kalimat Terbuka, Negasi
// 2. Konjungsi dan Disjungsi
// 3. Operasi Logika lengkap
// ============================================

$videos = [
    [
        "id" => "pHTp1bzaXIU",
        "title" => "Pernyataan, Kalimat Terbuka, Negasi / Ingkaran",
        "duration" => "Materi Logika Matematika",
        "description" => "Dasar pernyataan, kalimat terbuka, dan negasi"
    ],
    [
        "id" => "fM-G03F0hCk",
        "title" => "Pernyataan dan Kalimat Terbuka",
        "duration" => "Materi Logika Matematika",
        "description" => "Mengenal pernyataan dan kalimat terbuka dalam logika matematika"
    ],
    [
        "id" => "RfqwmnJKQkc",
        "title" => "Negasi atau Ingkaran",
        "duration" => "Materi Logika Matematika",
        "description" => "Membahas ingkaran atau negasi dari suatu pernyataan"
    ],
    [
        "id" => "Zdli2cvUnJc",
        "title" => "Konjungsi dan Disjungsi",
        "duration" => "Materi Logika Matematika",
        "description" => "Membahas operasi logika AND dan OR"
    ],
    [
        "id" => "bMMpEBefy1Q",
        "title" => "Implikasi dan Biimplikasi",
        "duration" => "Materi Logika Matematika",
        "description" => "Membahas pernyataan jika-maka dan jika-hanya-jika"
    ],
    [
        "id" => "9kzwopxbzRM",
        "title" => "Tabel Kebenaran Logika Matematika",
        "duration" => "Materi Logika Matematika",
        "description" => "Tabel kebenaran negasi, konjungsi, disjungsi, implikasi, dan biimplikasi"
    ],
    [
        "id" => "Z2u9pFzntxA",
        "title" => "Negasi, Disjungsi, Konjungsi, Implikasi, dan Biimplikasi",
        "duration" => "Materi Logika Matematika",
        "description" => "Pembahasan lengkap operasi dasar logika"
    ],
    [
        "id" => "oQ_3Bave03o",
        "title" => "Negasi Pernyataan Majemuk",
        "duration" => "Materi Logika Matematika",
        "description" => "Membahas ingkaran dari pernyataan majemuk"
    ],
    [
        "id" => "dQA8f3lkk1k",
        "title" => "Ekuivalensi, Tautologi, Kontradiksi, Kontingensi",
        "duration" => "Materi Logika Matematika",
        "description" => "Materi lanjutan tentang bentuk logika dan nilai kebenaran"
    ],
    [
        "id" => "HEUtUVY4bnU",
        "title" => "Konvers, Invers, dan Kontraposisi",
        "duration" => "Materi Logika Matematika",
        "description" => "Membahas perubahan bentuk dari pernyataan implikasi"
    ],
    [
        "id" => "Zg9-2DqBaQA",
        "title" => "Pernyataan Berkuantor",
        "duration" => "Materi Logika Matematika",
        "description" => "Mengenal kuantor universal dan kuantor eksistensial"
    ],
    [
        "id" => "ILbvdcMQ7qY",
        "title" => "Tautologi, Kontradiksi, Ekuivalensi, dan Kuantor",
        "duration" => "Materi Logika Matematika",
        "description" => "Pembahasan tautologi, kontradiksi, ekuivalensi, dan kuantor"
    ],
    [
        "id" => "RXfw240E7zs",
        "title" => "Pernyataan Berkuantor - Part 16",
        "duration" => "Materi Logika Matematika",
        "description" => "Materi tambahan tentang pernyataan berkuantor"
    ],
    [
        "id" => "bOZblMH_0Lw",
        "title" => "Penarikan Kesimpulan",
        "duration" => "Materi Logika Matematika",
        "description" => "Membahas cara menarik kesimpulan dari premis"
    ],
    [
        "id" => "WSIwbOSYOwg",
        "title" => "Modus Ponens, Modus Tollens, dan Silogisme",
        "duration" => "Materi Logika Matematika",
        "description" => "Pembahasan penarikan kesimpulan dalam logika matematika"
    ]
];

function getThumbnail($videoId) {
    return "https://img.youtube.com/vi/" . rawurlencode($videoId) . "/mqdefault.jpg";
}

function e($value) {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pembelajaran Logika Matematika</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: Arial, sans-serif;
            background: #0f0c29;
            color: white;
            padding: 40px 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 34px;
            margin-bottom: 8px;
        }

        .header p {
            color: #cfd8dc;
        }

        .main-player {
            background: rgba(0, 0, 0, 0.6);
            border-radius: 24px;
            padding: 20px;
            margin-bottom: 32px;
            border: 1px solid rgba(255, 255, 255, 0.16);
        }

        .video-wrapper {
            position: relative;
            padding-bottom: 56.25%;
            background: black;
            border-radius: 16px;
            overflow: hidden;
        }

        .video-wrapper iframe {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border: none;
        }

        #currentVideoTitle {
            margin-top: 15px;
            text-align: center;
            font-weight: bold;
            font-size: 18px;
        }

        #currentVideoDescription {
            margin-top: 8px;
            text-align: center;
            color: #cfd8dc;
        }

        .video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }

        .video-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.2s ease, background 0.2s ease;
        }

        .video-card:hover {
            transform: translateY(-4px);
            background: rgba(255, 255, 255, 0.16);
        }

        .thumbnail-wrapper {
            position: relative;
            padding-bottom: 56.25%;
            background: #000;
        }

        .thumbnail-wrapper img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .video-info {
            padding: 14px;
        }

        .video-info h4 {
            font-size: 16px;
            line-height: 1.35;
            margin-bottom: 8px;
        }

        .video-info p {
            color: #d7dde1;
            font-size: 14px;
            line-height: 1.45;
        }

        .fallback-link {
            text-align: center;
            margin-top: 24px;
        }

        .fallback-link a {
            color: #64ffda;
            font-weight: bold;
            text-decoration: none;
        }

        .fallback-link a:hover {
            text-decoration: underline;
        }

        @media (max-width: 600px) {
            body { padding: 24px 14px; }
            .header h1 { font-size: 26px; }
            .main-player { padding: 12px; border-radius: 18px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Logika Matematika</h1>
            <p>Playlist pembelajaran: pernyataan, negasi, konjungsi, disjungsi, implikasi, dan biimplikasi</p>
        </div>

        <div class="main-player">
            <div class="video-wrapper">
                <iframe
                    id="youtubePlayer"
                    src="https://www.youtube.com/embed/<?php echo e($videos[0]['id']); ?>?rel=0&playsinline=1"
                    title="<?php echo e($videos[0]['title']); ?>"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>

            <div id="currentVideoTitle"><?php echo e($videos[0]['title']); ?></div>
            <div id="currentVideoDescription"><?php echo e($videos[0]['description']); ?></div>
        </div>

        <div class="video-grid">
            <?php foreach ($videos as $v): ?>
                <div
                    class="video-card"
                    data-id="<?php echo e($v['id']); ?>"
                    data-title="<?php echo e($v['title']); ?>"
                    data-description="<?php echo e($v['description']); ?>"
                >
                    <div class="thumbnail-wrapper">
                        <img
                            src="<?php echo e(getThumbnail($v['id'])); ?>"
                            alt="<?php echo e($v['title']); ?>"
                            loading="lazy"
                        >
                    </div>

                    <div class="video-info">
                        <h4><?php echo e($v['title']); ?></h4>
                        <p><?php echo e($v['description']); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="fallback-link">
            <a
                id="fallbackLink"
                href="https://www.youtube.com/watch?v=<?php echo e($videos[0]['id']); ?>"
                target="_blank"
                rel="noopener noreferrer"
            >
                Tonton langsung di YouTube
            </a>
        </div>
    </div>

    <script>
        const player = document.getElementById('youtubePlayer');
        const currentTitle = document.getElementById('currentVideoTitle');
        const currentDescription = document.getElementById('currentVideoDescription');
        const fallbackLink = document.getElementById('fallbackLink');

        document.querySelectorAll('.video-card').forEach((card) => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const title = card.dataset.title;
                const description = card.dataset.description;

                player.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
                player.title = title;
                currentTitle.textContent = title;
                currentDescription.textContent = description;
                fallbackLink.href = `https://www.youtube.com/watch?v=${id}`;

                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    </script>
</body>
</html>
