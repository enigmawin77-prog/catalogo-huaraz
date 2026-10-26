export function EmptyState({ title = 'Sin coincidencias', text }) {
  return (
    <div className="empty">
      <p className="section-kicker">0 RESULTADOS</p>
      <h3>{title}</h3>
      {text ? <p className="muted">{text}</p> : null}
    </div>
  )
}
