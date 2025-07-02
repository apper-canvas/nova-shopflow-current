import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = "Nothing here yet", 
  message = "It looks like there's nothing to show right now.", 
  actionText = "Get Started",
  actionHref = "/",
  onAction,
  icon = "Package"
}) => {
  const ActionComponent = onAction ? 'button' : Link

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Empty State Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
        </motion.div>

        {/* Empty State Message */}
        <h3 className="font-display font-semibold text-2xl text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ActionComponent
            {...(onAction ? { onClick: onAction } : { to: actionHref })}
            className="inline-block"
          >
            <Button size="lg" className="px-8">
              <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
              {actionText}
            </Button>
          </ActionComponent>
        </motion.div>

        {/* Decorative Elements */}
        <div className="mt-12 flex items-center justify-center space-x-2 opacity-30">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  )
}

export default Empty