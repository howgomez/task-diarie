import React, { useEffect, useRef, useState } from 'react';
import ColorThief from 'colorthief';



const ImageContainer = ({ src } : { src?: string | null }) => {
  const [gradient, setGradient] = useState('');
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const colorThief = new ColorThief();

    const handleImageLoad = () => {
      try {
        if (imgRef.current) {
          const dominantColor = colorThief.getColor(imgRef.current);
          const gradientStyle = `linear-gradient(135deg, rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.7), rgba(0, 0, 0, 0.7))`;
          setGradient(gradientStyle);
        }
      } catch (error) {
        console.error("Error al obtener el color dominante:", error);
      }
    };

    const imgElement = imgRef.current;

    if (imgElement) {
      imgElement.addEventListener('load', handleImageLoad);
      if (imgElement.complete) {
        handleImageLoad();
      }
    }

    return () => {
      if (imgElement) {
        imgElement.removeEventListener('load', handleImageLoad);
      }
    };
  }, [src]);

  return (
    <div
      className="relative  rounded-t-lg overflow-hidden shadow-lg flex items-center justify-center size-[350px]"
      style={{
        background: gradient || 'linear-gradient(135deg, #ddd, #eee)',
      }}
    >
      <img
        ref={imgRef}
        src={ src || ''}
        crossOrigin="anonymous"
        alt=""
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default ImageContainer;
