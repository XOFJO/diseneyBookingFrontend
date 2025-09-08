import React from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="text-yellow-400 text-4xl mb-4"
      >
        <FontAwesomeIcon icon={faSpinner} />
      </motion.div>
      <p className="text-white text-lg font-medium">加载中...</p>
    </div>
  )
}

export default LoadingSpinner