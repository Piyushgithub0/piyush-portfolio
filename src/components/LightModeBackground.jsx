import { useTheme } from '../ThemeContext'
import OceanCanvas from './OceanCanvas'

const LightModeBackground = () => {
  const { theme } = useTheme()

  if (theme !== 'light') return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dynamic Depth Gradient using CSS */}
      <div className="ocean-depth-gradient absolute inset-0" />
      <OceanCanvas />
    </div>
  )
}

export default LightModeBackground
