import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export function CustomObject({color}) {
  const objLoader = useLoader(OBJLoader, './src/assets/cup.obj');
  const canvasTexture = document.querySelector('#myCanvas')
  const imgTexture = new THREE.CanvasTexture(canvasTexture)
  return (
  <>
    <mesh>
      <meshStandardMaterial color={color} />
      <primitive object={objLoader}/>
    </mesh>
    <mesh 
        geometry={objLoader.children[0].geometry}>
        <meshStandardMaterial 
        metalness= {0.25}
        roughness= {0.07}
        color={color} 
    />
    </mesh>

    <mesh 
      geometry={objLoader.children[0].geometry}>
      <meshStandardMaterial 
        map={imgTexture}
        side={THREE.DoubleSide}
        transparent= {true}
        metalness= {0.25}
        roughness= {0.07}
        refractionRatio= {0.98}
      />
    </mesh> 

    <mesh
      geometry={objLoader.children[1].geometry}>
        <meshStandardMaterial 
        metalness= {0.25}
        roughness= {0.07}
        color={color} 
      />
    </mesh> 

</>
  )
}