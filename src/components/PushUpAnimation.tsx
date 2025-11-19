import { motion } from 'framer-motion'

type PushUpVariant = 'regular' | 'wide' | 'close' | 'diamond' | 'pike' | 'decline' | 'archer'

interface PushUpAnimationProps {
  variant: PushUpVariant
  className?: string
}

export function PushUpAnimation({ variant, className = '' }: PushUpAnimationProps) {
  const getAnimationConfig = () => {
    switch (variant) {
      case 'regular':
        return {
          bodyY: [0, 25, 0],
          armAngle: [0, 45, 0],
          handX: 120
        }
      case 'wide':
        return {
          bodyY: [0, 20, 0],
          armAngle: [0, 60, 0],
          handX: 140
        }
      case 'close':
        return {
          bodyY: [0, 25, 0],
          armAngle: [0, 30, 0],
          handX: 100
        }
      case 'diamond':
        return {
          bodyY: [0, 25, 0],
          armAngle: [0, 25, 0],
          handX: 90
        }
      case 'pike':
        return {
          bodyY: [0, 20, 0],
          armAngle: [0, 35, 0],
          handX: 110,
          isPike: true
        }
      case 'decline':
        return {
          bodyY: [0, 30, 0],
          armAngle: [0, 50, 0],
          handX: 120,
          isDecline: true
        }
      case 'archer':
        return {
          bodyY: [0, 25, 0],
          armAngle: [0, 60, 0],
          handX: 150,
          isArcher: true
        }
      default:
        return {
          bodyY: [0, 25, 0],
          armAngle: [0, 45, 0],
          handX: 120
        }
    }
  }

  const config = getAnimationConfig()
  const duration = 2.5
  const strokeColor = 'oklch(0.55 0.21 25)'
  const strokeWidth = 3

  return (
    <div className={`w-full aspect-[2/1] flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        style={{ maxWidth: '100%' }}
      >
        <motion.g
          animate={{
            y: config.bodyY,
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {config.isPike ? (
            <>
              <motion.line
                x1="200"
                y1="100"
                x2="200"
                y2="40"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                animate={{
                  y2: [40, 50, 40],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.line
                x1="200"
                y1="100"
                x2="150"
                y2="140"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <motion.line
                x1="200"
                y1="100"
                x2="250"
                y2="140"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <motion.circle
                cx="200"
                cy="30"
                r="10"
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                animate={{
                  cy: [30, 40, 30],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.line
                x1="200"
                y1={config.isPike ? 110 : 120}
                x2={120}
                y2="145"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                animate={{
                  x2: [120, 125, 120],
                  y2: [145, 150, 145],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.line
                x1={120}
                y1="145"
                x2={120}
                y2="160"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                animate={{
                  x1: [120, 125, 120],
                  y1: [145, 150, 145],
                  x2: [120, 125, 120],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.line
                x1="200"
                y1={config.isPike ? 110 : 120}
                x2={280}
                y2="145"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                animate={{
                  x2: [280, 275, 280],
                  y2: [145, 150, 145],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.line
                x1={280}
                y1="145"
                x2={280}
                y2="160"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                animate={{
                  x1: [280, 275, 280],
                  y1: [145, 150, 145],
                  x2: [280, 275, 280],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </>
          ) : config.isDecline ? (
            <>
              <motion.line
                x1="200"
                y1="90"
                x2="200"
                y2="120"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <motion.circle
                cx="200"
                cy="80"
                r="10"
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2="130"
                y2="70"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2="270"
                y2="70"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2="180"
                y2="160"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2="220"
                y2="160"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <line
                x1="160"
                y1="165"
                x2="240"
                y2="165"
                stroke={strokeColor}
                strokeWidth={strokeWidth - 1}
                strokeLinecap="round"
                opacity="0.4"
              />
              
              <line
                x1="180"
                y1="165"
                x2="180"
                y2="160"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <line
                x1="220"
                y1="165"
                x2="220"
                y2="160"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            </>
          ) : config.isArcher ? (
            <>
              <motion.line
                x1="200"
                y1="90"
                x2="200"
                y2="120"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <motion.circle
                cx="200"
                cy="80"
                r="10"
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2="100"
                y2="90"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                animate={{
                  x2: [100, 110, 100],
                  y2: [90, 100, 90],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2="300"
                y2="110"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                animate={{
                  x2: [300, 290, 300],
                  y2: [110, 115, 110],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2="180"
                y2="160"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2="220"
                y2="160"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <motion.line
                x1="200"
                y1="90"
                x2="200"
                y2="120"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <motion.circle
                cx="200"
                cy="80"
                r="10"
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2={200 - config.handX}
                y2="90"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                animate={{
                  y2: [90, 100, 90],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2={200 + config.handX}
                y2="90"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                animate={{
                  y2: [90, 100, 90],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2="180"
                y2="160"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              <motion.line
                x1="200"
                y1="120"
                x2="220"
                y2="160"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            </>
          )}
          
          <line
            x1="50"
            y1="165"
            x2="350"
            y2="165"
            stroke={strokeColor}
            strokeWidth={strokeWidth - 1}
            strokeLinecap="round"
            opacity="0.2"
          />
        </motion.g>
      </svg>
    </div>
  )
}
