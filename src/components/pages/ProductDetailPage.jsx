import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getProductById } from '@/services/api/productService'
import { useCart } from '@/hooks/useCart'
import { toast } from 'react-toastify'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getProductById(parseInt(id))
      setProduct(data)
    } catch (err) {
      setError('Product not found')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      toast.success(`${product.name} added to cart!`)
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={fetchProduct} />
  if (!product) return <Error message="Product not found" />

  const images = product.images || [product.image]
  const discount = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="container-max section-padding py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-primary">
            Home
          </button>
          <ApperIcon name="ChevronRight" className="w-4 h-4" />
          <span className="text-primary font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="primary">{product.category}</Badge>
                {product.salePrice && (
                  <Badge variant="sale">-{discount}% OFF</Badge>
                )}
                {!product.inStock && (
                  <Badge variant="error">Out of Stock</Badge>
                )}
              </div>
              
              <h1 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon
                      key={i}
                      name="Star"
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 4.5)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600">
                    ({product.rating || '4.5'}) · {product.reviews || '127'} reviews
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-bold gradient-text">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Features */}
            {product.features && (
              <div>
                <h3 className="font-display font-semibold text-lg mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <ApperIcon name="Check" className="w-5 h-5 text-success" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Purchase Options */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 p-0"
                  >
                    <ApperIcon name="Minus" className="w-4 h-4" />
                  </Button>
                  <span className="font-medium min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="accent"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  <ApperIcon name="Zap" className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
              </div>

              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Truck" className="w-4 h-4" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="RotateCcw" className="w-4 h-4" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage