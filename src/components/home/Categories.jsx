import { Link } from 'react-router-dom'

function StorageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <line x1="7" y1="12" x2="7.01" y2="12" strokeWidth="2.5" />
      <line x1="7" y1="16" x2="7.01" y2="16" strokeWidth="2.5" />
    </svg>
  )
}

function AudioIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      <line x1="12" y1="9" x2="12" y2="15" strokeWidth="1.5" />
      <line x1="10" y1="11" x2="10" y2="13" strokeWidth="1.5" />
      <line x1="14" y1="11" x2="14" y2="13" strokeWidth="1.5" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      <line x1="9" y1="4" x2="15" y2="4" strokeWidth="1.5" />
    </svg>
  )
}

function CpuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="8.5" y="8.5" width="7" height="7" strokeDasharray="2 1" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
    </svg>
  )
}

function GamepadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="6" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="15" y1="13" x2="15.01" y2="13" strokeWidth="2.5" />
      <line x1="18" y1="11" x2="18.01" y2="11" strokeWidth="2.5" />
    </svg>
  )
}

function LaptopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
      <line x1="9" y1="16" x2="15" y2="16" strokeWidth="1.5" />
    </svg>
  )
}

function MouseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="6" />
      <line x1="12" y1="7" x2="12" y2="11" />
    </svg>
  )
}

function NetworkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
    </svg>
  )
}

const CATEGORY_META = {
  'almacenamiento': {
    color: 'cyan',
    icon: StorageIcon,
    image: '/images/products/kingston-nv2-1tb.jpg',
  },
  'audio-accesorios': {
    color: 'magenta',
    icon: AudioIcon,
    image: '/images/products/hyperx-cloud-iii.jpg',
  },
  'celulares-tablets': {
    color: 'cyan',
    icon: PhoneIcon,
    image: '/images/products/samsung-galaxy-a55-5g.jpg',
  },
  'componentes-pc': {
    color: 'magenta',
    icon: CpuIcon,
    image: '/images/products/nvidia-rtx-4060-8gb.jpg',
  },
  'gaming': {
    color: 'magenta',
    icon: GamepadIcon,
    image: '/images/products/logitech-g-pro-x-tkl.jpg',
  },
  'laptops-computadoras': {
    color: 'cyan',
    icon: LaptopIcon,
    image: '/images/products/asus-tuf-gaming-a15-fa506.jpg',
  },
  'perifericos': {
    color: 'magenta',
    icon: MouseIcon,
    image: '/images/products/logitech-mx-master-3s.jpg',
  },
  'redes-conectividad': {
    color: 'cyan',
    icon: NetworkIcon,
    image: '/images/products/tplink-archer-ax55.jpg',
  },
}

const ORDER = [
  'almacenamiento',
  'audio-accesorios',
  'celulares-tablets',
  'componentes-pc',
  'gaming',
  'laptops-computadoras',
  'perifericos',
  'redes-conectividad',
]

function MountainHeaderGraphic() {
  return (
    <svg className="cat-mountain-svg" viewBox="0 0 460 140" fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="peakGlowCyan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00F5FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="peakGlowMagenta" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF2BD6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF2BD6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mountainFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D1B2A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#050811" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Cyberpunk HUD grid lines in background */}
      <line x1="20" y1="30" x2="440" y2="30" stroke="rgba(0,245,255,0.12)" strokeDasharray="4 4" />
      <line x1="80" y1="70" x2="420" y2="70" stroke="rgba(255,43,214,0.12)" strokeDasharray="3 3" />
      <circle cx="380" cy="24" r="1.5" fill="#00F5FF" />
      <circle cx="280" cy="18" r="1.2" fill="#FF2BD6" />
      <circle cx="160" cy="22" r="1.5" fill="#00F5FF" />

      {/* Silhouette of Cordillera Blanca mountain range */}
      <path
        d="M20 135 L60 105 L110 80 L140 92 L180 50 L210 65 L260 25 L310 70 L350 48 L400 88 L440 135 Z"
        fill="url(#mountainFill)"
        stroke="rgba(0, 245, 255, 0.25)"
        strokeWidth="1.2"
      />

      {/* Glowing Neon Ridges */}
      <path d="M180 50 L210 65 L260 25 L310 70" stroke="#00F5FF" strokeWidth="2.2" strokeLinecap="round" filter="drop-shadow(0 0 6px #00F5FF)" />
      <path d="M260 25 L285 55 L350 48" stroke="#FF2BD6" strokeWidth="2" strokeLinecap="round" filter="drop-shadow(0 0 6px #FF2BD6)" />
      <path d="M110 80 L140 92 L180 50" stroke="#00F5FF" strokeWidth="1.8" />
      <path d="M350 48 L400 88" stroke="#FF2BD6" strokeWidth="1.6" />

      {/* Inner mountain ridge details */}
      <path d="M260 25 L245 75 L220 135" stroke="rgba(0, 245, 255, 0.4)" strokeWidth="1" strokeDasharray="2 3" />
      <path d="M260 25 L290 85 L320 135" stroke="rgba(255, 43, 214, 0.4)" strokeWidth="1" strokeDasharray="2 3" />

      {/* HUD Label: HUARAZ */}
      <g transform="translate(365, 88)">
        <polygon points="0,0 75,0 85,14 75,28 0,28 10,14" fill="rgba(8,16,32,0.85)" stroke="#00F5FF" strokeWidth="1.4" />
        <text x="42" y="18" fill="#00F5FF" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="2" textAnchor="middle" fontWeight="bold">
          HUARAZ
        </text>
        <line x1="88" y1="14" x2="105" y2="14" stroke="#00F5FF" strokeWidth="1" />
      </g>
    </svg>
  )
}

export function Categories({ categories }) {
  // Sort categories according to the reference image order
  const sorted = [...(categories || [])].sort((a, b) => {
    const idxA = ORDER.indexOf(a.slug)
    const idxB = ORDER.indexOf(b.slug)
    if (idxA === -1 && idxB === -1) return 0
    if (idxA === -1) return 1
    if (idxB === -1) return -1
    return idxA - idxB
  })

  return (
    <section className="cat-showcase-section" id="categorias">
      <div className="container">
        {/* Top Header */}
        <div className="cat-showcase-header">
          <div className="cat-header-left">
            <span className="cat-header-kicker">
              <span>///</span> TECNOLOGÍA SIN LÍMITES
            </span>
            <h2 className="cat-header-title">
              <span className="cat-title-white">CATEGORÍAS</span>
              <span className="cat-title-gradient">TECNOLÓGICAS</span>
            </h2>
            <p className="cat-header-desc">
              Encuentra todo lo que necesitas en un solo lugar. Explora nuestras categorías y descubre la tecnología que
              impulsa tu mundo.
            </p>
          </div>

          <div className="cat-header-center">
            <div className="cat-experience-badge">
              <span className="cat-exp-bracket cyan">[</span>
              <div className="cat-exp-text">
                <strong>MEJORES PRODUCTOS</strong>
                <span>MEJORES EXPERIENCIAS</span>
              </div>
              <span className="cat-exp-bracket magenta">]</span>
            </div>
          </div>

          <div className="cat-header-right">
            <MountainHeaderGraphic />
          </div>
        </div>

        {/* 8 Cyberpunk Cards Grid */}
        <div className="cat-showcase-grid">
          {sorted.map((cat, i) => {
            const meta = CATEGORY_META[cat.slug] || {
              color: i % 2 === 0 ? 'cyan' : 'magenta',
              icon: CpuIcon,
              image: '/images/products/asus-tuf-gaming-a15-fa506.jpg',
            }
            const Icon = meta.icon

            return (
              <Link
                key={cat.id || cat.slug}
                to={`/catalogo?category=${cat.slug}`}
                className={`cat-card-hud theme-${meta.color}`}
              >
                {/* Left info column */}
                <div className="cat-card-left">
                  <div>
                    <div className="cat-icon-badge">
                      <Icon />
                    </div>
                    <h3 className="cat-card-title">{cat.name}</h3>
                    <p className="cat-card-desc">{cat.description}</p>
                  </div>

                  <div className="cat-card-bottom">
                    <span className="cat-card-units">{cat.productCount ?? 2} UNIDADES</span>
                    <span className="cat-arrow-btn" aria-hidden="true">
                      →
                    </span>
                  </div>
                </div>

                {/* Right floating product preview image */}
                <div className="cat-card-right">
                  <div className="cat-image-container">
                    <img src={meta.image} alt={cat.name} loading="lazy" />
                    <div className="cat-image-overlay" />
                    <div className="cat-tech-stripes">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom Cyberpunk Footer Bar */}
        <div className="cat-showcase-footer">
          <div className="cat-footer-left">
            <span>&gt;&gt;</span>
            <span>EXPLORA • ELIGE • DISFRUTA</span>
          </div>

          <div className="cat-footer-center" />

          <div className="cat-footer-right">
            <div className="cat-footer-slashes">
              <span />
              <span />
              <span />
            </div>
            <span>CATÁLOGO TECNOLÓGICO HUARAZ</span>
          </div>
        </div>
      </div>
    </section>
  )
}
