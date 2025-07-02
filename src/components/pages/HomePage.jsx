import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/organisms/ProductGrid'
import CategoryFilter from '@/components/organisms/CategoryFilter'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const HomePage = () => {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({})
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  const searchQuery = searchParams.get('search') || ''
  const categoryFromUrl = searchParams.get('category') || ''
  const saleFromUrl = searchParams.get('sale') === 'true'

  useEffect(() => {
    setSelectedCategory(categoryFromUrl)
    if (saleFromUrl) {
      setSelectedFilters(prev => ({ ...prev, onSale: true }))
    }
  }, [categoryFromUrl, saleFromUrl])

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'newest', label: 'Newest First' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {!searchQuery && !categoryFromUrl && (
        <section className="bg-gradient-to-br from-primary/5 via-blue-50 to-accent/5 border-b border-gray-100">
          <div className="container-max section-padding py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="font-display font-bold text-5xl lg:text-6xl text-gray-900 mb-6">
                Discover Your Perfect
                <span className="gradient-text block">Shopping Experience</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Shop the latest trends, premium quality products, and exclusive deals all in one place. 
                Your style, your choice, your ShopFlow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="px-8">
                  <ApperIcon name="ShoppingBag" className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
                <Button variant="secondary" size="lg" className="px-8">
                  <ApperIcon name="Sparkles" className="w-5 h-5 mr-2" />
                  View Deals
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container-max section-padding py-8">
        <div className="flex lg:hidden items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-2xl text-gray-900">
            {searchQuery ? `Search: "${searchQuery}"` : selectedCategory || 'All Products'}
          </h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="sticky top-24">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedFilters={selectedFilters}
                onFiltersChange={setSelectedFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort Options */}
            <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
              <h2 className="hidden lg:block font-display font-semibold text-xl text-gray-900">
                {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory || 'All Products'}
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field py-2 text-sm min-w-[160px]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid
              filters={selectedFilters}
              searchQuery={searchQuery}
              sortBy={sortBy}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage