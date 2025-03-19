'use client'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { easing } from 'maath'

function House({ gap = 0.1, displacement = 5, intensity = 5 }) {
  const cursor = new THREE.Vector3()
  const oPos = new THREE.Vector3()
  const vec = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const ref = useRef()

  // Define positions for walls, roof, and door
  const positions = useMemo(() => {
    const temp = []

    // Base (walls)
    for (let x = -5; x <= 5; x++) {
      for (let y = 0; y <= 5; y++) {
        if (!(x >= -1 && x <= 1 && y <= 3)) { // Leave space for the door
          temp.push([x, y, -5]) // Back wall
          temp.push([x, y, 5])  // Front wall
        }
      }
      for (let z = -5; z <= 5; z++) {
        temp.push([-5, x, z]) // Left wall
        temp.push([5, x, z])  // Right wall
      }
    }

    // Roof (triangular)
    for (let x = -5; x <= 5; x++) {
      for (let z = -5; z <= 5; z++) {
        const y = 6 + Math.abs(x) // Triangular roof shape
        temp.push([x, y, z])
      }
    }

    return temp
  }, [])

  // Animate cubes on interaction
  useFrame(({ pointer, camera, clock }, delta) => {
    cursor.set(pointer.x, pointer.y, 0.5).unproject(camera)
    dir.copy(cursor).sub(camera.position).normalize()
    cursor.add(dir.multiplyScalar(camera.position.length()))

    let count = 0
    for (let child of ref.current.children) {
      oPos.set(...positions[count++])
      dir.copy(oPos).sub(cursor).normalize()
      const dist = oPos.distanceTo(cursor)
      const distInv = displacement - dist
      const col = Math.max(0.5, distInv) / 1.5

      // Custom colors for roof and walls
      const isRoof = oPos.y > 5
      const colorBase = isRoof ? [1, 0.5, 0] : [0.5, 0.5, 1] // Roof is orange, walls are blue

      easing.dampC(child.color, dist > displacement ? 'white' : colorBase, 0.1, delta)
      easing.damp3(
        child.position,
        dist > displacement ? oPos : vec.copy(oPos).add(dir.multiplyScalar(distInv * intensity)),
        0.2,
        delta
      )
    }
  })

  return (
    <Instances ref={ref} limit={positions.length} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial />
      {positions.map((pos, i) => (
        <Instance key={i} position={pos} />
      ))}
    </Instances>
  )
}

export default function App() {
  return (
    <div className='h-screen'>
    <Canvas camera={{ position: [15, 15, 15], fov: 50 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} castShadow />
      <House />
    </Canvas>
    </div>

  )
}
