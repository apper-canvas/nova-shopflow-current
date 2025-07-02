import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/molecules/ProductCard'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getProducts } from '@/services/api/productService'

const ProductGrid = ({ filters = {}, searchQuery = '', sortBy = 'name' }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  useEffect(() => {
    fetchProducts()
  }, [filters, searchQuery, sortBy])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getProducts()
      
      let filteredProducts = data

      // Apply search filter
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      // Apply category filter
      if (filters.category) {
        filteredProducts = filteredProducts.filter(product => 
          product.category === filters.category
        )
      }

      // Apply price range filter
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => 
          (product.salePrice || product.price) >= filters.minPrice
        )
      }
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => 
          (product.salePrice || product.price) <= filters.maxPrice
        )
      }

      // Apply sale filter
      if (filters.onSale) {
        filteredProducts = filteredProducts.filter(product => product.salePrice)
      }

      // Apply in stock filter
      if (filters.inStock) {
        filteredProducts = filteredProducts.filter(product => product.inStock)
      }

      // Apply sorting
      filteredProducts.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return (a.salePrice || a.price) - (b.salePrice || b.price)
          case 'price-high':
            return (b.salePrice || b.price) - (a.salePrice || a.price)
          case 'rating':
            return (b.rating || 4.5) - (a.rating || 4.5)
          case 'newest':
            return new Date(b.createdAt || '2024-01-01') - new Date(a.createdAt || '2024-01-01')
          default:
            return a.name.localeCompare(b.name)
        }
      })

      setProducts(filteredProducts)
    } catch (err) {
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const totalPages = Math.ceil(products.length / productsPerPage)

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={fetchProducts} />
  if (products.length === 0) {
    return (
      <Empty 
        title="No products found"
        message={searchQuery ? `No products match "${searchQuery}"` : "No products available"}
        actionText="Clear filters"
        onAction={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {products.length} products found
          </span>
          {searchQuery && (
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
              "{searchQuery}"
            </span>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <ApperIcon name="Grid3X3" className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <ApperIcon name="List" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${currentPage}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {paginatedProducts.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8">
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ApperIcon name="ChevronLeft" className="w-4 h-4" />
          </Button>
          
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "primary" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
              className="min-w-[2.5rem]"
            >
              {i + 1}
            </Button>
          ))}
          
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ApperIcon name="ChevronRight" className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid