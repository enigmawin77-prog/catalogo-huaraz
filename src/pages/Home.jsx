import { useEffect, useState } from 'react'
import { Categories } from '../components/home/Categories.jsx'
import { FeaturedProducts } from '../components/home/FeaturedProducts.jsx'
import { Hero } from '../components/home/Hero.jsx'
import { SearchBar } from '../components/catalog/SearchBar.jsx'
import { categoryService, productService } from '../services/productService.js'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [featured, setFeatured] = useState([])
  const [news, setNews] = useState([])
  const [offers, setOffers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      categoryService.list(),
      productService.list({ featured: true, limit: 3 }),
      productService.list({ sort: 'newest', limit: 3 }),
      productService.list({ onSale: true, limit: 3 }),
    ])
      .then(([cats, feat, newest, sale]) => {
        setCategories(cats.data)
        setFeatured(feat.data)
        setNews(newest.data)
        setOffers(sale.data)
      })
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <Hero featured={featured[0]} />
      <div className="container">
        <SearchBar />
        {error ? <p className="toast error">{error}</p> : null}
      </div>
      <Categories categories={categories} />
      <FeaturedProducts kicker="SELECCIÓN" title="Destacados del nodo" products={featured} />
      <FeaturedProducts kicker="FEED" title="Novedades" products={news} />
      <FeaturedProducts kicker="OFERTAS VIGENTES" title="En promoción" products={offers} />
    </>
  )
}
