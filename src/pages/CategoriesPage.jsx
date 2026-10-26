import { useEffect, useState } from 'react'
import { Categories } from '../components/home/Categories.jsx'
import { Loader } from '../components/ui/Loader.jsx'
import { categoryService } from '../services/productService.js'

export default function CategoriesPage() {
  const [categories, setCategories] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    categoryService
      .list()
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <p className="page container toast error">{error}</p>
  if (!categories) return <Loader />
  return <Categories categories={categories} />
}
