import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { useCart } from '@/hooks/useCart'
import { toast } from 'react-toastify'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: 'same'
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    // Validate shipping info
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode']
    const isValid = requiredFields.every(field => shippingInfo[field].trim())
    
    if (isValid) {
      setCurrentStep(2)
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const orderData = {
        id: Date.now(),
        items: cart,
        shipping: shippingInfo,
        payment: paymentInfo,
        total: getTotalPrice() * 1.08,
        date: new Date().toISOString()
      }
      
      // Store order data for confirmation page
      localStorage.setItem('lastOrder', JSON.stringify(orderData))
      
      clearCart()
      navigate('/order-confirmation')
      toast.success('Order placed successfully!')
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Shipping', icon: 'Truck' },
    { number: 2, title: 'Payment', icon: 'CreditCard' },
    { number: 3, title: 'Confirmation', icon: 'Check' }
  ]

  if (cart.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-max section-padding py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  currentStep >= step.number
                    ? 'bg-primary border-primary text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <ApperIcon name="Check" className="w-5 h-5" />
                  ) : (
                    <ApperIcon name={step.icon} className="w-5 h-5" />
                  )}
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step.number ? 'text-primary' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {step.number < steps.length && (
                  <div className={`w-16 h-px mx-4 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card p-6"
              >
                <h2 className="font-display font-semibold text-2xl mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      required
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                    />
                    <Input
                      label="Last Name"
                      required
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    />
                  </div>
                  <Input
                    label="Address"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label="City"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    />
                    <Input
                      label="State"
                      required
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                    />
                    <Input
                      label="ZIP Code"
                      required
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Continue to Payment
                    <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card p-6"
              >
                <h2 className="font-display font-semibold text-2xl mb-6">Payment Information</h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <Input
                    label="Card Number"
                    required
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                  />
                  <Input
                    label="Cardholder Name"
                    required
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      required
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                    />
                    <Input
                      label="CVV"
                      required
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setCurrentStep(1)}
                    >
                      <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button type="submit" loading={loading} className="flex-1">
                      {loading ? 'Processing...' : 'Place Order'}
                      <ApperIcon name="Check" className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="card p-6">
                <h3 className="font-display font-semibold text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.Id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
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
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl gradient-text">
                      {formatPrice(getTotalPrice() * 1.08)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage