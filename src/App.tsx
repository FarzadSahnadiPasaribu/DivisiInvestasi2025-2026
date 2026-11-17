import { useEffect, useRef, useState } from "react";
import beginningPhoto from "./assets/memories/The Beginning.jpeg";
import firstStepsPhoto from "./assets/memories/Our First Steps.jpeg";
import journeyPhoto from "./assets/memories/The Journey.jpeg";
import duoMautPhoto from "./assets/memories/Duo Maut.jpeg";
import lastChapterPhoto from "./assets/memories/The Last Chapter.jpeg";
import duoCrisPhoto from "./assets/memories/Duo Maut Cris.jpeg";
import duoCepatPulangPhoto from "./assets/memories/Duo Maut Cepat Pulang.jpeg";
import documentationOnePhoto from "./assets/memories/WhatsApp Image 2026-11-18 at 01.47..jpeg";
import documentationTwoPhoto from "./assets/memories/WhatsApp Image 2026-11-18 at 01.47.53.jpeg";
import documentationThreePhoto from "./assets/memories/WhatsApp Image 2026-11-18 at 01.4.jpeg";

type Memory = {
  src: string;
  label: string;
  note: string;
};

const memories: Memory[] = [
  {
    src: beginningPhoto,
    label: "The Beginning",
    note: "Titik mula sebuah perjalanan",
  },
  {
    src: firstStepsPhoto,
    label: "Our First Steps",
    note: "Langkah-langkah awal kita",
  },
  {
    src: journeyPhoto,
    label: "The Journey",
    note: "Cerita di sepanjang perjalanan",
  },
  {
    src: duoMautPhoto,
    label: "Duo Maut",
    note: "Kadiv–Wakadiv, satu divisi dan banyak urusan",
  },
  {
    src: lastChapterPhoto,
    label: "The Last Chapter",
    note: "Menjelang halaman terakhir",
  },
  { src: duoCrisPhoto, label: "Duo Maut Cris", note: "The Iconic Duo" },
  {
    src: duoCepatPulangPhoto,
    label: "Duo Maut Cepat Pulang",
    note: "The Fastest Exit",
  },
  {
    src: documentationOnePhoto,
    label: "Dokumentasi 01.47",
    note: "Satu bingkai, satu keluarga",
  },
  {
    src: documentationTwoPhoto,
    label: "Dokumentasi 01.47.53",
    note: "Wajah-wajah di balik perjalanan",
  },
  {
    src: documentationThreePhoto,
    label: "Dokumentasi 01.4",
    note: "Bagian kecil dari cerita besar",
  },
];

const chapters = [
  ["awal", "01", "Awal"],
  ["proses", "02", "Proses"],
  ["kegiatan", "03", "Kegiatan"],
  ["duo", "04", "Duo Maut"],
  ["orang", "05", "Keluarga"],
  ["regenerasi", "06", "Regenerasi"],
  ["tumbuh", "07", "Tumbuh"],
  ["jalan", "08", "Jalan Baru"],
  ["terima-kasih", "09", "Terima Kasih"],
];

function Icon({
  name,
  size = 20,
}: {
  name: "arrow" | "close" | "expand" | "heart" | "clock" | "chevron";
  size?: number;
}) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    expand: (
      <>
        <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    chevron: <path d="m8 10 4 4 4-4" />,
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? "is-shown" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function Photo({
  memory,
  onOpen,
  className = "",
  eager = false,
}: {
  memory: Memory;
  onOpen: (memory: Memory) => void;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <button
      className={`photo-frame group ${className}`}
      onClick={() => !failed && onOpen(memory)}
      aria-label={`Buka foto ${memory.label}`}
    >
      {!failed ? (
        <img
          src={memory.src}
          alt={memory.label}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="photo-fallback">
          <small>Dokumentasi</small>
          <strong>{memory.label}</strong>
          <span>Foto belum dapat dimuat</span>
        </span>
      )}
      <span className="photo-shade" />
      <span className="photo-caption">
        <span>
          <small>{memory.note}</small>
          {memory.label}
        </span>
        <Icon name="expand" />
      </span>
    </button>
  );
}

function SectionHead({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`section-head ${align === "center" ? "text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </Reveal>
  );
}

function App() {
  const [progress, setProgress] = useState(0);
  const [lightbox, setLightbox] = useState<Memory | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [hugging, setHugging] = useState(false);
  const [hugCount, setHugCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
        setNavOpen(false);
      }
      if (!lightbox) return;
      const index = memories.findIndex((item) => item.src === lightbox.src);
      if (event.key === "ArrowRight") setLightbox(memories[(index + 1) % memories.length]);
      if (event.key === "ArrowLeft")
        setLightbox(memories[(index - 1 + memories.length) % memories.length]);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const sendHug = () => {
    setHugCount((count) => count + 1);
    setHugging(false);
    requestAnimationFrame(() => setHugging(true));
    window.setTimeout(() => setHugging(false), 4000);
  };

  return (
    <main>
      <div className="progress-track">
        <span style={{ width: `${progress}%` }} />
      </div>

      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Kembali ke awal">
          <span>DI</span>
          <span>
            Memori
            <br />
            2025—26
          </span>
        </button>
        <button
          className="chapter-trigger"
          onClick={() => setNavOpen((open) => !open)}
          aria-expanded={navOpen}
        >
          Daftar Bab <Icon name="chevron" size={17} />
        </button>
      </header>

      <nav className={`chapter-nav ${navOpen ? "open" : ""}`} aria-label="Navigasi bab">
        <p>Perjalanan kita</p>
        {chapters.map(([id, number, title]) => (
          <button key={id} onClick={() => scrollTo(id)}>
            <span>{number}</span>
            {title}
          </button>
        ))}
      </nav>

      <section id="home" className="hero">
        <div className="hero-glow" />
        <div
          className="hero-photo"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(21,17,22,.34), #151116 98%), url("${memories[4].src}")`,
          }}
        />
        <div className="hero-content">
          <p className="hero-kicker">Sebuah album dokumenter digital</p>
          <h1>
            Kita Pernah Berjalan <em>Sejauh Ini.</em>
          </h1>
          <p className="hero-copy">
            Di antara banyak hal yang terjadi selama satu periode, ada satu hal yang patut kita
            syukuri: kita pernah menjadi bagian dari perjalanan yang sama.
          </p>
          <p className="hero-period">
            Divisi Investasi <span>•</span> KSPM GIBEI UNIMED <span>•</span> 2025/2026
          </p>
          <button className="primary-button" onClick={() => scrollTo("awal")}>
            Buka Cerita Kita <Icon name="arrow" />
          </button>
        </div>
        <div className="scroll-cue">
          <span>Gulir untuk mengenang</span>
          <i />
        </div>
      </section>

      <section id="awal" className="story-section cream-section">
        <div className="section-number">01</div>
        <div className="story-grid">
          <div>
            <SectionHead
              eyebrow="Bab pertama — semua punya awal"
              title="Awalnya, Kita Hanya Sekumpulan Orang dengan Tujuan yang Sama."
            />
            <Reveal>
              <div className="body-copy">
                <p>
                  Ketika periode ini dimulai, mungkin belum semuanya berjalan seperti yang kita
                  bayangkan. Ada tanggung jawab baru, ada proses penyesuaian, dan ada banyak hal
                  yang harus dipelajari bersama.
                </p>
                <p>
                  Kita datang dengan karakter, kemampuan, dan cara berpikir yang berbeda. Namun,
                  dari perbedaan itulah perjalanan ini mulai terbentuk.
                </p>
                <p>
                  Tidak semua orang langsung saling mengenal. Tidak semua hal langsung berjalan
                  sempurna. Tetapi perlahan, kita mulai memahami bahwa sebuah divisi bukan hanya
                  tentang siapa yang memegang jabatan, melainkan tentang bagaimana setiap orang
                  mengambil bagian.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal className="start-collage">
            <Photo memory={memories[0]} onOpen={setLightbox} className="start-main" eager />
            <Photo memory={memories[1]} onOpen={setLightbox} className="start-small" />
            <span className="hand-note">
              Begin somewhere,
              <br />
              grow together.
            </span>
          </Reveal>
        </div>
      </section>

      <section id="proses" className="story-section dark-section">
        <div className="section-number">02</div>
        <div className="narrow">
          <SectionHead
            eyebrow="Bab kedua — lika-liku"
            title="Tidak Selalu Mudah, tetapi Kita Tetap Berproses."
            align="center"
          />
          <Reveal>
            <p className="lead-copy">
              Tidak ada perjalanan organisasi yang selalu mulus. Ada saat ketika koordinasi terasa
              sulit, komunikasi perlu diperbaiki, dan ide-ide belum berjalan sesuai harapan.
            </p>
          </Reveal>
        </div>
        <div className="process-layout">
          <Reveal className="process-photo">
            <Photo memory={memories[7]} onOpen={setLightbox} />
          </Reveal>
          <Reveal className="process-text">
            <span className="gold-rule" />
            <p>
              Ada evaluasi yang harus diterima, ada tanggung jawab yang harus diselesaikan, dan ada
              situasi yang mengharuskan kita belajar menjadi lebih dewasa.
            </p>
            <p>
              Mungkin saat itu semuanya terasa melelahkan. Namun, justru dari proses itulah kita
              belajar tentang komitmen, tanggung jawab, dan arti bekerja dalam sebuah tim.
            </p>
            <blockquote>“Kita tidak harus selalu sempurna untuk bisa berkembang.”</blockquote>
          </Reveal>
        </div>
      </section>

      <section id="kegiatan" className="story-section burgundy-section">
        <div className="section-number">03</div>
        <div className="section-intro-row">
          <SectionHead
            eyebrow="Bab ketiga — jejak kegiatan"
            title="Setiap Kegiatan Punya Ceritanya Sendiri."
          />
          <Reveal>
            <p>
              Dari persiapan, diskusi, pelaksanaan, sampai evaluasi—setiap kegiatan hidup karena
              orang-orang yang membuatnya menjadi mungkin.
            </p>
          </Reveal>
        </div>
        <div className="editorial-gallery">
          <Reveal className="gallery-hero">
            <Photo memory={memories[2]} onOpen={setLightbox} />
          </Reveal>
          <Reveal className="gallery-side" delay={100}>
            <Photo memory={memories[8]} onOpen={setLightbox} />
          </Reveal>
          <Reveal className="gallery-side" delay={180}>
            <Photo memory={memories[9]} onOpen={setLightbox} />
          </Reveal>
        </div>
        <p className="gallery-hint">Klik foto untuk melihat lebih dekat</p>
      </section>

      <section id="duo" className="story-section duo-section">
        <div className="section-number">04</div>
        <SectionHead
          eyebrow="Bab keempat — album internal"
          title="Kalau Bicara Divisi Investasi, Ada Tiga Duo yang Tidak Boleh Dilupakan."
          align="center"
        />
        <div className="duo-list">
          <Reveal className="duo-card dynamic">
            <div className="duo-photo">
              <Photo memory={memories[3]} onOpen={setLightbox} />
              <span className="tape" />
            </div>
            <div className="duo-copy">
              <span className="card-label">The Dynamic Duo</span>
              <span className="card-index">01 / 03</span>
              <h3>Dua Kepala, Satu Divisi, Banyak Urusan.</h3>
              <p>
                Di balik perjalanan Divisi Investasi, tentu ada dinamika kepemimpinan yang ikut
                mewarnai setiap prosesnya. Dari koordinasi, diskusi, pembagian tanggung jawab,
                sampai menghadapi berbagai situasi, Kadiv dan Wakadiv menjadi bagian dari cerita
                yang tidak terpisahkan.
              </p>
              <p>
                Kadang harus serius memikirkan divisi, kadang mencari solusi, dan kadang mungkin
                sama-sama pusing menghadapi keadaan.
              </p>
            </div>
          </Reveal>
          <Reveal className="duo-card iconic">
            <div className="duo-photo">
              <Photo memory={memories[5]} onOpen={setLightbox} />
              <span className="scribble">iconic!</span>
            </div>
            <div className="duo-copy">
              <span className="card-label">The Iconic Duo</span>
              <span className="card-index">02 / 03</span>
              <h3>Kalau Sudah Ada Duo Maut Cris, Ceritanya Berbeda Lagi.</h3>
              <p>
                Setiap divisi pasti punya pasangan ikonik yang kehadirannya menjadi bagian dari
                cerita tersendiri. Duo Maut Cris menjadi salah satu warna unik dalam perjalanan
                Divisi Investasi.
              </p>
              <p>
                Mungkin bagi orang lain ini hanya sebuah sebutan. Namun, bagi orang-orang yang
                pernah berada di dalam cerita ini, ada kenangan tersendiri di baliknya.
              </p>
            </div>
          </Reveal>
          <Reveal className="duo-card fastest">
            <div className="duo-photo">
              <Photo memory={memories[6]} onOpen={setLightbox} />
              <span className="clock-sticker">
                <Icon name="clock" /> OTW pulang
              </span>
            </div>
            <div className="duo-copy">
              <span className="card-label">The Fastest Exit</span>
              <span className="card-index">03 / 03</span>
              <h3>Rapat Boleh Panjang, Tapi Kalau Sudah Waktunya Pulang...</h3>
              <p>
                Ada satu duo yang punya reputasi tersendiri: Duo Maut Cepat Pulang. Bukan berarti
                tidak peduli dengan divisi, tetapi sepertinya mereka punya radar khusus yang selalu
                aktif ketika kegiatan mulai selesai.
              </p>
              <div className="countdown">
                <span>3</span>
                <span>2</span>
                <span>1</span>
                <strong>PULANG</strong>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="orang" className="story-section cream-section people-section">
        <div className="section-number">05</div>
        <div className="people-grid">
          <div>
            <SectionHead
              eyebrow="Bab kelima — orang-orangnya"
              title="Sebuah Divisi Tidak Pernah Dibangun oleh Satu Orang."
            />
            <Reveal>
              <div className="body-copy">
                <p>
                  Di balik setiap kegiatan, selalu ada orang-orang yang mengambil peran. Ada yang
                  menyampaikan ide, mengatur jalannya kegiatan, membantu ketika dibutuhkan, dan
                  memastikan tanggung jawab tetap berjalan.
                </p>
                <p>
                  Mungkin tidak semua kontribusi terlihat di depan. Namun, setiap bagian memiliki
                  arti. Karena pada akhirnya, sebuah perjalanan tidak hanya diingat dari apa yang
                  berhasil dilakukan, tetapi juga dari siapa saja yang ikut mengusahakannya.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal className="people-wall">
            <Photo memory={memories[4]} onOpen={setLightbox} className="wall-main" />
            <Photo memory={memories[7]} onOpen={setLightbox} className="wall-small one" />
            <Photo memory={memories[8]} onOpen={setLightbox} className="wall-small two" />
          </Reveal>
        </div>
      </section>

      <section id="regenerasi" className="story-section legacy-section">
        <div className="section-number">06</div>
        <SectionHead
          eyebrow="Bab keenam — regenerasi"
          title="Cerita Ini Tidak Berhenti di Periode Ini."
          align="center"
        />
        <div className="legacy-grid">
          <Reveal className="legacy-card">
            <span className="card-label">A New Chapter</span>
            <h3>Cris Diana</h3>
            <p>
              Selamat untuk Cris Diana yang telah dipercaya menjadi <strong>Wakadiv Galeri</strong>.
            </p>
            <p>
              Semoga amanah baru ini menjadi kesempatan untuk membawa Galeri ke arah yang semakin
              baik, lebih solid, dan semakin berdampak.
            </p>
            <b>Honorable Mention. Full Respect!</b>
          </Reveal>
          <Reveal className="legacy-card featured" delay={100}>
            <span className="crown-line">Penerus tongkat estafet</span>
            <span className="card-label">The Wonderkid — Next Kadiv</span>
            <h3>Fajar</h3>
            <p>
              Siapa sangka, wonderkid yang satu ini akhirnya melanjutkan perjalanan sebagai{" "}
              <strong>Kadiv Investasi periode berikutnya</strong>.
            </p>
            <p>
              Jangan berhenti belajar, jangan takut mengambil keputusan, dan buktikan bahwa
              kepercayaan ini berada di tangan yang tepat.
            </p>
            <b>Sukses selalu untuk Kadiv Investasi selanjutnya!</b>
          </Reveal>
          <Reveal className="legacy-card playful" delay={200}>
            <span className="plot">
              plot
              <br />
              twist
            </span>
            <span className="card-label">The Plot Twist</span>
            <h3>Fauzan</h3>
            <p>
              Tetaplah menjadi Fauzan yang penuh warna. Semoga selalu punya energi untuk memberikan
              kejutan di setiap kesempatan.
            </p>
            <p>
              Jangan pernah berhenti bikin Fajar stress. Biar kepemimpinan berikutnya tetap punya
              bumbu cerita—tetapi saling mendukung tetap nomor satu.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="tumbuh" className="growth-section">
        <div
          className="growth-bg"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(21,17,22,.94) 5%, rgba(21,17,22,.53), rgba(21,17,22,.82)), url("${memories[2].src}")`,
          }}
        />
        <div className="growth-content">
          <Reveal>
            <p className="eyebrow">Bab ketujuh — melihat ke belakang</p>
            <h2>Mungkin Kita Tidak Sadar, Tetapi Kita Sudah Sejauh Ini.</h2>
          </Reveal>
          <Reveal>
            <p>
              Jika melihat kembali perjalanan dari awal hingga akhir, mungkin ada banyak hal yang
              dulu terasa sulit, tetapi sekarang menjadi bagian dari pengalaman berharga.
            </p>
            <p>
              Kita pernah belajar, mencoba, memperbaiki, dan menghadapi berbagai situasi bersama.
              Terima kasih untuk setiap usaha, waktu, pikiran, dan kontribusi yang diberikan.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="jalan" className="story-section path-section">
        <div className="section-number">08</div>
        <div className="path-line" />
        <SectionHead
          eyebrow="Bab kedelapan — setelah ini"
          title="Periode Boleh Berganti, Cerita Jangan Berhenti."
          align="center"
        />
        <Reveal className="path-copy">
          <p>
            Setelah periode ini berakhir, mungkin kesibukan akan berubah. Pertemuan tidak lagi
            sesering dulu. Agenda organisasi akan berganti, dan setiap orang akan melanjutkan
            perjalanannya masing-masing.
          </p>
          <p>
            Namun, semoga pergantian periode tidak membuat kita melupakan orang-orang yang pernah
            berproses bersama. Tidak harus selalu bertemu untuk tetap saling mengingat.
          </p>
          <blockquote>“Ya, kita pernah menjadi bagian dari perjalanan yang luar biasa.”</blockquote>
        </Reveal>
      </section>

      <section id="terima-kasih" className="thanks-section">
        <div
          className="thanks-bg"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(21,17,22,.34), rgba(21,17,22,.94)), url("${memories[4].src}")`,
          }}
        />
        <div className="thanks-content">
          <Reveal>
            <p className="eyebrow">Bab kesembilan — untuk satu keluarga</p>
            <h2>Terima Kasih Sudah Menjadi Bagian dari Cerita Ini.</h2>
          </Reveal>
          <Reveal>
            <p>
              Untuk setiap orang yang pernah menjadi bagian dari Divisi Investasi KSPM GIBEI UNIMED
              2025/2026: terima kasih sudah hadir, berproses, belajar, dan memberikan warna dalam
              perjalanan ini.
            </p>
            <p>
              Tidak semua hal berjalan sempurna. Tidak semua kenangan bisa diabadikan. Tetapi setiap
              kontribusi memiliki tempat dalam cerita kita.
            </p>
          </Reveal>
          <Reveal>
            <button className="hug-button" onClick={sendHug}>
              <Icon name="heart" />{" "}
              {hugCount ? "Pelukan Terkirim untuk Satu Divisi" : "Kirim Pelukan untuk Satu Divisi"}{" "}
              <span>♡</span>
            </button>
          </Reveal>
        </div>
        {hugging && (
          <div className="hug-celebration" aria-live="polite">
            <div className="hug-ring ring-one" />
            <div className="hug-ring ring-two" />
            <div className="hug-message">
              <Icon name="heart" size={36} />
              <strong>Satu pelukan hangat telah terkirim.</strong>
              <span>Untuk seluruh keluarga Divisi Investasi.</span>
            </div>
            {Array.from({ length: 22 }).map((_, index) => (
              <i key={index} style={{ "--i": index } as React.CSSProperties}>
                ♡
              </i>
            ))}
          </div>
        )}
      </section>

      <section className="finale">
        <div className="finale-orbit" />
        <p className="eyebrow">Epilog — satu cerita</p>
        <h2>Kita Pernah Menjadi Bagian dari Cerita yang Sama.</h2>
        <p>
          Periode boleh berganti. Jabatan boleh berganti. Orang-orang mungkin akan menempuh
          perjalanan masing-masing. Namun, semua proses, usaha, tawa, dan kenangan yang pernah
          tercipta akan selalu menjadi bagian dari perjalanan kita.
        </p>
        <p>
          Terima kasih, Divisi Investasi KSPM GIBEI UNIMED 2025/2026.
          <br />
          Sampai bertemu di cerita-cerita hebat berikutnya.
        </p>
        <strong className="final-line">One Period. Many Stories. One Family.</strong>
        <button className="secondary-button" onClick={() => scrollTo("home")}>
          Putar Kembali Kenangan Kita <Icon name="arrow" />
        </button>
      </section>

      <footer>
        <span>Divisi Investasi</span>
        <span>KSPM GIBEI UNIMED · 2025/2026</span>
        <span>Dibuat untuk dikenang.</span>
      </footer>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${lightbox.label}`}
          onClick={() => setLightbox(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Tutup foto"
          >
            <Icon name="close" size={26} />
          </button>
          <button
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              const i = memories.indexOf(lightbox);
              setLightbox(memories[(i - 1 + memories.length) % memories.length]);
            }}
            aria-label="Foto sebelumnya"
          >
            ‹
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.label} />
            <figcaption>
              <small>{lightbox.note}</small>
              <strong>{lightbox.label}</strong>
            </figcaption>
          </figure>
          <button
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              const i = memories.indexOf(lightbox);
              setLightbox(memories[(i + 1) % memories.length]);
            }}
            aria-label="Foto berikutnya"
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
