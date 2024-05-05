import { Edges } from '@react-three/drei'
import { brighten } from '3oilerplate'

export const Object = ({ shapes, material, rotation, config }: any) => (
  <mesh rotation={[rotation, 0, 0]}>
    { shapes.map(({ geometry, position, rotation }: any, index: number) => (
      <mesh
        geometry={geometry}
        position={position}
        rotation={rotation}
        material={material}
        key={`mesh-${index}`}
      >
        { config.edges && <Edges color={brighten(config.color, 1.5)} /> }
      </mesh>
    )) }
  </mesh>
)
