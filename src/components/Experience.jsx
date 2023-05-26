import { OrbitControls } from '@react-three/drei'

export default function Experience() {
return <>
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />
    <OrbitControls />
</>
}
