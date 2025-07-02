import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { getCategories } from '@/services/api/categoryService'

const CategoryFilter = ({ selectedCategory, onCategoryChange, selectedFilters, onFiltersChange }) => {
  const [categories, setCategories] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handlePriceRangeChange = (field, value) => {
    const newRange = { ...priceRange, [field]: value }
    setPriceRange(newRange)
    
    const filters = { ...selectedFilters }
    if (newRange.min) filters.minPrice = parseFloat(newRange.min)
    else delete filters.minPrice
    if (newRange.max) filters.maxPrice = parseFloat(newRange.max)
    else delete filters.maxPrice
    
    onFiltersChange(filters)
  }

  const toggleFilter = (key) => {
    const filters = { ...selectedFilters }
    filters[key] = !filters[key]
    if (!filters[key]) delete filters[key]
    onFiltersChange(filters)
  }

  const clearAllFilters = () => {
    onCategoryChange('')
    onFiltersChange({})
    setPriceRange({ min: '', max: '' })
  }

  const activeFiltersCount = Object.keys(selectedFilters).length + (selectedCategory ? 1 : 0)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-gray-900 flex items-center">
            <ApperIcon name="Filter" className="w-5 h-5 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </h3>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden"
            >
              <ApperIcon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                className="w-4 h-4" 
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded || window.innerWidth >= 768 ? 'auto' : 0 }}
        className="overflow-hidden md:overflow-visible"
      >
        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
            <div className="space-y-2">
              <Button
                variant={!selectedCategory ? "primary" : "ghost"}
                size="sm"
                onClick={() => onCategoryChange('')}
                className="w-full justify-start"
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.Id}
                  variant={selectedCategory === category.name ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onCategoryChange(category.name)}
                  className="w-full justify-between"
                >
                  <span>{category.name}</span>
                  <span className="text-xs text-gray-500">({category.count})</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                className="input-field text-sm py-2"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                className="input-field text-sm py-2"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Quick Filters</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.onSale || false}
                  onChange={() => toggleFilter('onSale')}
                  className="rounded border-gray-300 text-primary focus:ring-primary/50"
                />
                <span className="text-sm text-gray-700">On Sale</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.inStock || false}
                  onChange={() => toggleFilter('inStock')}
                  className="rounded border-gray-300 text-primary focus:ring-primary/50"
                />
                <span className="text-sm text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.freeShipping || false}
                  onChange={() => toggleFilter('freeShipping')}
                  className="rounded border-gray-300 text-primary focus:ring-primary/50"
                />
                <span className="text-sm text-gray-700">Free Shipping</span>
              </label>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CategoryFilter