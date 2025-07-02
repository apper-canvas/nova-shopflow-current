import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ message = "Something went wrong", onRetry, title = "Oops!" }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto px-4"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="AlertTriangle" className="w-10 h-10 text-white" />
        </motion.div>

        {/* Error Message */}
        <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          {onRetry && (
            <Button onClick={onRetry} size="lg">
              <ApperIcon name="RotateCcw" className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          )}
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Go Home
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600">
            If the problem persists, please contact our support team.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-3">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <ApperIcon name="Mail" className="w-4 h-4" />
              <span>support@shopflow.com</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <ApperIcon name="Phone" className="w-4 h-4" />
              <span>1-800-SHOP-NOW</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Error