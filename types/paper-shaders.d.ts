declare module '@paper-design/shaders-react' {
  import type { ComponentType, CSSProperties } from 'react'

  export type GrainGradientProps = {
    style?: CSSProperties
    colorBack?: string
    softness?: number
    intensity?: number
    noise?: number
    shape?: string
    offsetX?: number
    offsetY?: number
    scale?: number
    rotation?: number
    speed?: number
    colors?: string[]
  }

  export const GrainGradient: ComponentType<GrainGradientProps>
}
