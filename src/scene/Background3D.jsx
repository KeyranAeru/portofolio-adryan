import { useEffect, useRef } from 'react'
import { initScene } from './initScene'
import { sceneState } from './state'

export default function Background3D() {
  const ref = useRef(null)
  useEffect(() => initScene(ref.current, sceneState), [])
  return (
    <div className="scene" id="scene">
      <canvas id="gl" ref={ref} />
    </div>
  )
}
