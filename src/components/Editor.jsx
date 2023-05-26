import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Editor() {
  
  // Créer une référence pour le canvas et les états pour le déplacement de l'image
  const myCanvas = useRef();
  const [canvasImage, setCanvasImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // Dessine l'image initiale sur le canvas et stocke l'image dans l'état du canvas
  useEffect(() => {
    const context = myCanvas.current.getContext("2d");
    const image = new Image();
    image.src = "./src/assets/react.svg";

    image.onload = () => {
      const width = image.width * 2;
      const height = image.height * 3;
      const x = (myCanvas.current.width - width) / 2;
      const y = (myCanvas.current.height - height) / 2;
      context.drawImage(image, x, y, width, height);
      setCanvasImage(myCanvas.current.toDataURL());
    };
  }, []);

  // Evenement au clic sur le canvas
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDragOffset({
      x: event.clientX - imagePosition.x,
      y: event.clientY - imagePosition.y,
    });
  };

  // Mouvement de la souris sur le canvas
  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const x = event.clientX - dragOffset.x;
    const y = event.clientY - dragOffset.y;
    setImagePosition({ x, y });

    const context = myCanvas.current.getContext("2d");
    const image = new Image();
    image.src = canvasImage;

    image.onload = () => {
      context.clearRect(0, 0, myCanvas.current.width, myCanvas.current.height);
      context.drawImage(
        image,
        x,
        y,
        myCanvas.current.width,
        myCanvas.current.height
      );
      const texture = new THREE.CanvasTexture(myCanvas.current);
      texture.needsUpdate = true;
    };
  };

  // Relachement du clic sur le canvas
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Rendu du composant
  return (
    <>
      <canvas
        id="myCanvas"
        ref={myCanvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}
