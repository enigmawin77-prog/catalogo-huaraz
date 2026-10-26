import { getDb } from '../config/database.js'
import { stringifyJson } from '../utils/json.js'

const CATEGORIES = [
  {
    slug: 'laptops-computadoras',
    name: 'Laptops y computadoras',
    description: 'Equipos portátiles y de escritorio para estudio, oficina y creación.',
    icon: 'laptop',
  },
  {
    slug: 'componentes-pc',
    name: 'Componentes de PC',
    description: 'Procesadores, tarjetas gráficas, memorias y placas madre.',
    icon: 'cpu',
  },
  {
    slug: 'perifericos',
    name: 'Periféricos',
    description: 'Teclados, mouse, webcams y accesorios de productividad.',
    icon: 'keyboard',
  },
  {
    slug: 'celulares-tablets',
    name: 'Celulares y tablets',
    description: 'Smartphones y tablets para comunicación y movilidad.',
    icon: 'phone',
  },
  {
    slug: 'gaming',
    name: 'Gaming',
    description: 'Hardware y periféricos pensados para juego competitivo.',
    icon: 'game',
  },
  {
    slug: 'audio-accesorios',
    name: 'Audio y accesorios',
    description: 'Auriculares, parlantes y complementos de sonido.',
    icon: 'audio',
  },
  {
    slug: 'almacenamiento',
    name: 'Almacenamiento',
    description: 'SSD, HDD y unidades portátiles para respaldar y acelerar equipos.',
    icon: 'storage',
  },
  {
    slug: 'redes-conectividad',
    name: 'Redes y conectividad',
    description: 'Routers, adaptadores y soluciones para una red estable.',
    icon: 'network',
  },
]

const PRODUCTS = [
  {
    name: 'Laptop ASUS TUF Gaming A15 FA506',
    slug: 'asus-tuf-gaming-a15-fa506',
    brand: 'ASUS',
    category: 'laptops-computadoras',
    description:
      'Portátil de 15.6 pulgadas con Ryzen 7 y RTX 4050, pensada para estudio, edición ligera y juego. Chasis reforzado y teclado RGB. Dato de demostración del catálogo.',
    price: 4299,
    previous_price: 4699,
    image_url: '/images/placeholders/laptop.svg',
    specs: { procesador: 'AMD Ryzen 7 7735HS', ram: '16 GB DDR5', almacenamiento: '512 GB SSD', gpu: 'RTX 4050 6 GB', pantalla: '15.6" FHD 144 Hz' },
    highlights: ['Refrigeración de alto flujo', 'Teclado RGB', 'Garantía internacional'],
    stock: 6,
    availability: 'in_stock',
    is_featured: 1,
    is_new: 1,
  },
  {
    name: 'Laptop Lenovo IdeaPad Slim 3 15IRH8',
    slug: 'lenovo-ideapad-slim-3',
    brand: 'Lenovo',
    category: 'laptops-computadoras',
    description:
      'Ultraportátil para universidad y oficina, con pantalla IPS y SSD rápido. Ideal para ofimática y clases virtuales. Dato de demostración del catálogo.',
    price: 1899,
    previous_price: null,
    image_url: '/images/placeholders/laptop.svg',
    specs: { procesador: 'Intel Core i5-13420H', ram: '8 GB', almacenamiento: '512 GB SSD', pantalla: '15.6" FHD IPS' },
    highlights: ['Carcasa delgada', 'Teclado numérico', 'Windows 11'],
    stock: 11,
    availability: 'in_stock',
    is_featured: 0,
    is_new: 1,
  },
  {
    name: 'All-in-One HP 24-cb1xxx',
    slug: 'hp-aio-24',
    brand: 'HP',
    category: 'laptops-computadoras',
    description:
      'Computadora todo en uno de 23.8 pulgadas para escritorio compacto. Webcam integrada y diseño limpio. Dato de demostración del catálogo.',
    price: 2499,
    previous_price: null,
    image_url: '/images/placeholders/desktop.svg',
    specs: { procesador: 'Intel Core i5', ram: '8 GB', almacenamiento: '512 GB SSD', pantalla: '23.8" FHD' },
    highlights: ['Ahorro de espacio', 'Webcam Full HD'],
    stock: 4,
    availability: 'limited',
    is_featured: 0,
    is_new: 0,
  },
  {
    name: 'Procesador AMD Ryzen 5 7600',
    slug: 'amd-ryzen-5-7600',
    brand: 'AMD',
    category: 'componentes-pc',
    description:
      'CPU de 6 núcleos con arquitectura Zen 4 para gaming y productividad. Incluye cooler de stock. Dato de demostración del catálogo.',
    price: 899,
    previous_price: 989,
    image_url: '/images/placeholders/cpu.svg',
    specs: { nucleos: '6', hilos: '12', socket: 'AM5', tdp: '65 W' },
    highlights: ['PCIe 5.0', 'DDR5 nativo'],
    stock: 14,
    availability: 'in_stock',
    is_featured: 1,
    is_new: 0,
  },
  {
    name: 'Tarjeta gráfica NVIDIA GeForce RTX 4060 8 GB',
    slug: 'nvidia-rtx-4060-8gb',
    brand: 'NVIDIA',
    category: 'componentes-pc',
    description:
      'GPU de 1080p/1440p con DLSS 3 y ray tracing. Consumo contenido para gabinetes ATX. Dato de demostración del catálogo.',
    price: 1799,
    previous_price: null,
    image_url: '/images/placeholders/gpu.svg',
    specs: { memoria: '8 GB GDDR6', bus: '128 bit', conectores: '1x 8 pines' },
    highlights: ['DLSS 3', 'AV1 encode'],
    stock: 5,
    availability: 'limited',
    is_featured: 1,
    is_new: 1,
  },
  {
    name: 'Memoria RAM Kingston Fury Beast 32 GB (2x16) DDR5 5600',
    slug: 'kingston-fury-beast-32gb-ddr5',
    brand: 'Kingston',
    category: 'componentes-pc',
    description:
      'Kit dual channel DDR5 para plataformas Intel y AMD recientes. Perfil XMP/EXPO. Dato de demostración del catálogo.',
    price: 429,
    previous_price: 479,
    image_url: '/images/placeholders/ram.svg',
    specs: { capacidad: '32 GB', velocidad: '5600 MT/s', latencia: 'CL36' },
    highlights: ['Disipador bajo perfil', 'Compatible EXPO/XMP'],
    stock: 20,
    availability: 'in_stock',
    is_featured: 0,
    is_new: 0,
  },
  {
    name: 'Teclado mecánico Logitech G Pro X TKL',
    slug: 'logitech-g-pro-x-tkl',
    brand: 'Logitech',
    category: 'perifericos',
    description:
      'Tenkeyless con switches intercambiables y cable desmontable. Pensado para escritorio compacto. Dato de demostración del catálogo.',
    price: 549,
    previous_price: null,
    image_url: '/images/placeholders/keyboard.svg',
    specs: { switches: 'GX Brown', conexion: 'USB-C', formato: 'TKL' },
    highlights: ['Switches hot-swap', 'RGB LIGHTSYNC'],
    stock: 9,
    availability: 'in_stock',
    is_featured: 0,
    is_new: 1,
  },
  {
    name: 'Mouse inalámbrico Logitech MX Master 3S',
    slug: 'logitech-mx-master-3s',
    brand: 'Logitech',
    category: 'perifericos',
    description:
      'Mouse de productividad con MagSpeed, seguimiento en vidrio y recarga USB-C. Dato de demostración del catálogo.',
    price: 429,
    previous_price: 499,
    image_url: '/images/placeholders/mouse.svg',
    specs: { sensor: '8000 DPI', conexion: 'Logi Bolt / Bluetooth', bateria: 'hasta 70 días' },
    highlights: ['Clic silencioso', 'Multi-dispositivo'],
    stock: 12,
    availability: 'in_stock',
    is_featured: 1,
    is_new: 0,
  },
  {
    name: 'Smartphone Samsung Galaxy A55 5G 256 GB',
    slug: 'samsung-galaxy-a55-5g',
    brand: 'Samsung',
    category: 'celulares-tablets',
    description:
      'Gama media con pantalla Super AMOLED de 120 Hz, IP67 y 5G. Dato de demostración del catálogo.',
    price: 1499,
    previous_price: null,
    image_url: '/images/placeholders/phone.svg',
    specs: { pantalla: '6.6" AMOLED 120 Hz', almacenamiento: '256 GB', ram: '8 GB', bateria: '5000 mAh' },
    highlights: ['IP67', 'Actualizaciones largas'],
    stock: 8,
    availability: 'in_stock',
    is_featured: 1,
    is_new: 1,
  },
  {
    name: 'Tablet Xiaomi Redmi Pad SE 11"',
    slug: 'xiaomi-redmi-pad-se',
    brand: 'Xiaomi',
    category: 'celulares-tablets',
    description:
      'Tablet de 11 pulgadas para contenido, apuntes y clases. Cuatro altavoces. Dato de demostración del catálogo.',
    price: 799,
    previous_price: 899,
    image_url: '/images/placeholders/tablet.svg',
    specs: { pantalla: '11" FHD', almacenamiento: '128 GB', ram: '6 GB', bateria: '8000 mAh' },
    highlights: ['Dolby Atmos', 'Modo lectura'],
    stock: 7,
    availability: 'in_stock',
    is_featured: 0,
    is_new: 0,
  },
  {
    name: 'Control Xbox Wireless Carbon Black',
    slug: 'xbox-wireless-controller',
    brand: 'Microsoft',
    category: 'gaming',
    description:
      'Mando inalámbrico compatible con PC, Xbox y dispositivos Bluetooth. Textura antideslizante. Dato de demostración del catálogo.',
    price: 279,
    previous_price: null,
    image_url: '/images/placeholders/gamepad.svg',
    specs: { conexion: 'Bluetooth / 2.4 GHz', bateria: 'AA / recargable opcional' },
    highlights: ['Grips texturizados', 'Botón Share'],
    stock: 16,
    availability: 'in_stock',
    is_featured: 0,
    is_new: 0,
  },
  {
    name: 'Silla gamer Cougar Armor One',
    slug: 'cougar-armor-one',
    brand: 'Cougar',
    category: 'gaming',
    description:
      'Silla con soporte lumbar, reclinado y tapiz sintético. Pensada para sesiones largas. Dato de demostración del catálogo.',
    price: 899,
    previous_price: null,
    image_url: '/images/placeholders/chair.svg',
    specs: { material: 'PVC', reclinado: '180°', peso_max: '120 kg' },
    highlights: ['Cojines incluidos', 'Base de acero'],
    stock: 0,
    availability: 'out_of_stock',
    is_featured: 0,
    is_new: 0,
  },
  {
    name: 'Auriculares HyperX Cloud III',
    slug: 'hyperx-cloud-iii',
    brand: 'HyperX',
    category: 'audio-accesorios',
    description:
      'Headset con drivers de 53 mm, micrófono desmontable y diadema de aluminio. Dato de demostración del catálogo.',
    price: 349,
    previous_price: 399,
    image_url: '/images/placeholders/headset.svg',
    specs: { drivers: '53 mm', conexion: 'USB / 3.5 mm', peso: '308 g' },
    highlights: ['Espuma viscoelástica', 'Micrófono con LED mute'],
    stock: 10,
    availability: 'in_stock',
    is_featured: 1,
    is_new: 0,
  },
  {
    name: 'Parlante Bluetooth JBL Flip 6',
    slug: 'jbl-flip-6',
    brand: 'JBL',
    category: 'audio-accesorios',
    description:
      'Bocina portátil resistente al agua con PartyBoost. Autonomía de hasta 12 horas. Dato de demostración del catálogo.',
    price: 399,
    previous_price: null,
    image_url: '/images/placeholders/speaker.svg',
    specs: { autonomia: '12 h', resistencia: 'IP67', conexion: 'Bluetooth 5.1' },
    highlights: ['Sonido JBL Original Pro', 'USB-C'],
    stock: 13,
    availability: 'in_stock',
    is_featured: 0,
    is_new: 1,
  },
  {
    name: 'SSD Kingston NV2 1 TB NVMe',
    slug: 'kingston-nv2-1tb',
    brand: 'Kingston',
    category: 'almacenamiento',
    description:
      'Unidad M.2 2280 PCIe 4.0 para arranque rápido de sistema y juegos. Dato de demostración del catálogo.',
    price: 259,
    previous_price: 299,
    image_url: '/images/placeholders/ssd.svg',
    specs: { interfaz: 'PCIe 4.0 x4', formato: 'M.2 2280', capacidad: '1 TB' },
    highlights: ['Bajo consumo', 'Instalación simple'],
    stock: 22,
    availability: 'in_stock',
    is_featured: 0,
    is_new: 0,
  },
  {
    name: 'Disco externo WD Elements 2 TB USB 3.0',
    slug: 'wd-elements-2tb',
    brand: 'Western Digital',
    category: 'almacenamiento',
    description:
      'Almacenamiento portátil para respaldos y archivos pesados. Alimentado por USB. Dato de demostración del catálogo.',
    price: 289,
    previous_price: null,
    image_url: '/images/placeholders/hdd.svg',
    specs: { capacidad: '2 TB', interfaz: 'USB 3.0', formato: '2.5"' },
    highlights: ['Plug and play', 'Carcasa compacta'],
    stock: 9,
    availability: 'in_stock',
    is_featured: 0,
    is_new: 0,
  },
  {
    name: 'Router TP-Link Archer AX55 Wi-Fi 6',
    slug: 'tplink-archer-ax55',
    brand: 'TP-Link',
    category: 'redes-conectividad',
    description:
      'Router AX3000 con OneMesh y puertos Gigabit. Cubre departamentos y oficinas pequeñas. Dato de demostración del catálogo.',
    price: 329,
    previous_price: 379,
    image_url: '/images/placeholders/router.svg',
    specs: { wifi: 'Wi-Fi 6 AX3000', puertos: '4x LAN Gigabit', banda: 'Dual band' },
    highlights: ['HomeShield', 'OFDMA'],
    stock: 7,
    availability: 'in_stock',
    is_featured: 1,
    is_new: 0,
  },
  {
    name: 'Adaptador USB Wi-Fi 6 TP-Link Archer TX20U',
    slug: 'tplink-archer-tx20u',
    brand: 'TP-Link',
    category: 'redes-conectividad',
    description:
      'Dongle USB para actualizar PCs de escritorio a Wi-Fi 6 sin abrir el gabinete. Dato de demostración del catálogo.',
    price: 129,
    previous_price: null,
    image_url: '/images/placeholders/usb.svg',
    specs: { wifi: 'AX1800', conexion: 'USB 3.0', antena: 'Alta ganancia' },
    highlights: ['Instalación rápida', 'Compatible Windows'],
    stock: 18,
    availability: 'in_stock',
    is_featured: 0,
    is_new: 1,
  },
]

export function seedIfEmpty() {
  const db = getDb()
  const count = db.prepare('SELECT COUNT(*) AS n FROM categories').get().n
  if (count > 0) return { seeded: false }

  const insertCategory = db.prepare(
    'INSERT INTO categories (slug, name, description, icon) VALUES (?, ?, ?, ?)',
  )
  const insertProduct = db.prepare(
    `INSERT INTO products (
      name, slug, brand, category_id, description, price, previous_price,
      image_url, gallery, specs, highlights, stock, availability,
      is_published, is_featured, is_new
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`,
  )

  db.exec('BEGIN')
  try {
    for (const category of CATEGORIES) {
      insertCategory.run(category.slug, category.name, category.description, category.icon)
    }
    const bySlug = Object.fromEntries(
      db.prepare('SELECT id, slug FROM categories').all().map((row) => [row.slug, row.id]),
    )
    for (const product of PRODUCTS) {
      const img = `/images/products/${product.slug}.jpg`
      insertProduct.run(
        product.name,
        product.slug,
        product.brand,
        bySlug[product.category],
        product.description,
        product.price,
        product.previous_price,
        img,
        stringifyJson([img], []),
        stringifyJson(product.specs, {}),
        stringifyJson(product.highlights, []),
        product.stock,
        product.availability,
        product.is_featured,
        product.is_new,
      )
    }
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
  return { seeded: true, categories: CATEGORIES.length, products: PRODUCTS.length }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { initDatabase, closeDatabase } = await import('../config/database.js')
  initDatabase()
  const result = seedIfEmpty()
  console.log(result.seeded ? 'Datos de demostración insertados' : 'La base ya tenía categorías; no se duplicó el seed')
  closeDatabase()
}
