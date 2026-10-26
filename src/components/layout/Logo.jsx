export function Logo({ className = 'brand-mark' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" fill="#07090F" stroke="#00F5FF" strokeWidth="2" />
      <path d="M12 46 L32 14 L52 46" fill="none" stroke="#00F5FF" strokeWidth="3" />
      <path d="M22 46 L32 30 L42 46" fill="none" stroke="#FF2BD6" strokeWidth="2.4" />
      <rect x="28" y="46" width="8" height="8" fill="#8B5CF6" />
    </svg>
  )
}
