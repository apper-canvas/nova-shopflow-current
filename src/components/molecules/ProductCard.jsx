import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { useCart } from '@/hooks/useCart'
import { toast } from 'react-toastify'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="product-card"
    >
      <Link to={`/product/${product.Id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.salePrice && (
            <Badge 
              variant="sale" 
              className="absolute top-3 left-3 animate-pulse"
            >
              SALE
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="error" size="md">Out of Stock</Badge>
            </div>
          )}
          
          {/* Quick Add Button - appears on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            {product.inStock && (
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="sm"
                className="w-full backdrop-blur-sm bg-white/90 text-primary hover:bg-white shadow-lg"
              >
                <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            )}
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <ApperIcon 
              name="Heart" 
              className="w-5 h-5 text-gray-300 hover:text-red-500 transition-colors cursor-pointer ml-2 flex-shrink-0" 
            />
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.salePrice ? (
                <>
                  <span className="text-xl font-bold gradient-text">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <ApperIcon name="Star" className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{product.rating || '4.5'}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard