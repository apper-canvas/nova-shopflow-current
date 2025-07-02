import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { useCart } from '@/hooks/useCart'

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.Id)
    } else {
      updateQuantity(item.Id, newQuantity)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="card p-4 flex items-center space-x-4"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
        <p className="font-bold text-primary">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 p-0 hover:bg-white"
          >
            <ApperIcon name="Minus" className="w-4 h-4" />
          </Button>
          <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 p-0 hover:bg-white"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeFromCart(item.Id)}
          className="text-error hover:text-error hover:bg-error/5 w-8 h-8 p-0"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  )
}

export default CartItem