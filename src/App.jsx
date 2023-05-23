import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Editor from './src/components/Editor.jsx';
import Experience from './src/components/Experience.jsx';
import { CustomObject } from './src/components/CustomObject.jsx';
import { SketchPicker } from 'react-color';

export default function App() {
  const [color, setColor] = useState();
  return ( 
    <>
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 0, 6]
            }}
          >
            <CustomObject color={color}/>
            <Experience />
          </Canvas>
      <div className="container"> 
        <Editor />
        <SketchPicker
              color={color}
              onChange={(color) => {
              setColor(color.hex);}}
            /> 
      </div>
    </>
  )
}

