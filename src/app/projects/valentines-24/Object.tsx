import { Edges } from '@react-three/drei'
import { lighten } from 'csscomp'

export const Object = ({ shapes, material, rotation, settings }: any) => (
  <mesh rotation={[rotation, 0, 0]}>
    { shapes.map(({ geometry, position, rotation }: any, index: number) => (
      <mesh
        geometry={geometry}
        position={position}
        rotation={rotation}
        material={material}
        key={`mesh-${index}`}
      >
        { settings.edges && <Edges color={lighten(settings.color, 0.5)} /> }
      </mesh>
    )) }
  </mesh>
)
