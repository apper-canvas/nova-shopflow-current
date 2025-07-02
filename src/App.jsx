import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import HomePage from '@/components/pages/HomePage'
import ProductDetailPage from '@/components/pages/ProductDetailPage'
import CartPage from '@/components/pages/CartPage'
import CheckoutPage from '@/components/pages/CheckoutPage'
import OrderConfirmationPage from '@/components/pages/OrderConfirmationPage'
import { CartProvider } from '@/hooks/useCart'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          </Routes>
        </Layout>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </CartProvider>
  )
}

export default App