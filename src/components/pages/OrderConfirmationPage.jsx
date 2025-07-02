import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const OrderConfirmationPage = () => {
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder')
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder))
    }
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="font-display font-semibold text-xl text-gray-900 mb-2">
            Order not found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find your order information.
          </p>
          <Link to="/">
            <Button>
              <ApperIcon name="Home" className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-max section-padding py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <ApperIcon name="Check" className="w-10 h-10 text-white" />
          </motion.div>

          {/* Success Message */}
          <h1 className="font-display font-bold text-4xl text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. We've received your order and are processing it now.
          </p>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-8 text-left mb-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Order Info */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-4">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">#{orderData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">{formatDate(orderData.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-primary">{formatPrice(orderData.total)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-4">Shipping Address</h3>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900">
                    {orderData.shipping.firstName} {orderData.shipping.lastName}
                  </p>
                  <p>{orderData.shipping.address}</p>
                  <p>
                    {orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.zipCode}
                  </p>
                  <p className="mt-2">
                    <ApperIcon name="Mail" className="w-4 h-4 inline mr-1" />
                    {orderData.shipping.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-display font-semibold text-lg mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.Id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 rounded-xl p-6 mb-8"
          >
            <h3 className="font-display font-semibold text-lg mb-4">What's Next?</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ApperIcon name="Package" className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Processing</p>
                  <p className="text-gray-600">1-2 business days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ApperIcon name="Truck" className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Shipping</p>
                  <p className="text-gray-600">3-5 business days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <ApperIcon name="Home" className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Delivered</p>
                  <p className="text-gray-600">To your door</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center"
          >
            <Link to="/">
              <Button size="lg">
                <ApperIcon name="ShoppingBag" className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Button variant="secondary" size="lg">
              <ApperIcon name="Mail" className="w-5 h-5 mr-2" />
              Email Receipt
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage