import React, { useEffect, useRef, useState } from 'react';
import ColorThief from 'colorthief';

const ImageContainer = ({ src, children }: { src?: string; children?: React.ReactNode }) => {
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
      className="relative rounded-lg overflow-hidden shadow-lg flex gap-4 flex-col sm:flex-row"
      style={{
        background: gradient || 'linear-gradient(135deg, #ddd, #eee)',
      }}
    >
     <div className='flex items-center justify-center w-full sm:w-[350px] h-auto sm:h-[300px] bg-black/50 rounded-t-lg'>
     <img
        ref={imgRef}
        src={ src || ''}
        crossOrigin="anonymous"
        alt=""
        className='w-full h-full object-cover rounded-r-md'
      />
     </div>
     {children}
   </div>
  );
};

export default ImageContainer;
