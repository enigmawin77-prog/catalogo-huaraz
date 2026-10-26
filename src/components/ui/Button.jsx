export function Button({ as: Tag = 'button', variant = 'default', className = '', ...props }) {
  const variants = {
    default: 'btn',
    primary: 'btn btn-primary',
    magenta: 'btn btn-magenta',
    ghost: 'btn btn-ghost',
  }
  return <Tag className={`${variants[variant] || variants.default} ${className}`} {...props} />
}
