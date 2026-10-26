import Catalog from './Catalog.jsx'

export default function Offers() {
  return <Catalog preset={{ onSale: true, sort: 'newest' }} />
}
