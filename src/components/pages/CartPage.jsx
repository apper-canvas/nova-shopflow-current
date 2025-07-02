import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import CartItem from '@/components/molecules/CartItem'
import Empty from '@/components/ui/Empty'
import { useCart } from '@/hooks/useCart'

const CartPage = () => {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Empty
          title="Your cart is empty"
          message="Looks like you haven't added anything to your cart yet"
          actionText="Start Shopping"
          actionHref="/"
          icon="ShoppingCart"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-max section-padding py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={clearCart}
            className="text-error hover:text-error hover:bg-error/5"
          >
            <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <CartItem key={item.Id} item={item} />
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6"
              >
                <h2 className="font-display font-semibold text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>{formatPrice(getTotalPrice() * 0.08)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-display font-semibold text-lg">Total</span>
                      <span className="font-bold text-2xl gradient-text">
                        {formatPrice(getTotalPrice() * 1.08)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/checkout" className="block">
                    <Button className="w-full" size="lg">
                      <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link to="/" className="block">
                    <Button variant="secondary" className="w-full">
                      <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security Features */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Shield" className="w-4 h-4 text-success" />
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Truck" className="w-4 h-4 text-success" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="RotateCcw" className="w-4 h-4 text-success" />
                      <span>30-day return policy</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage