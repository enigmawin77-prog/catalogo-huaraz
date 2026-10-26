export default function About() {
  return (
    <section className="page">
      <div className="container" style={{ maxWidth: 760 }}>
        <p className="section-kicker">NODO HUARAZ</p>
        <h1>Nosotros</h1>
        <p className="muted" style={{ fontSize: 20, margin: '16px 0 24px' }}>
          Catálogo Tecnológico Huaraz es una plataforma para explorar inventario de hardware, periféricos y conectividad
          con una interfaz de operación futurista.
        </p>
        <p>
          Este proyecto muestra un catálogo consultable, filtros reales y un panel de administración autenticado. Los
          productos iniciales están marcados como datos de demostración y pueden reemplazarse desde el panel cuando
          exista un operador autorizado.
        </p>
        <p style={{ marginTop: 16 }}>
          No se publican teléfonos, direcciones ni redes sociales hasta que se configuren en el entorno del servidor.
        </p>
      </div>
    </section>
  )
}
