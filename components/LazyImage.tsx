import { type } from "os";
import {useRef, useEffect, useState} from "react"; // useRef es un hook que nos permite acceder al DOM de un elemento
import {ImgHTMLAttributes} from "react";

type PlaceholderValue = "blur" | "empty";

type LazyImageProps = {  // Defino el tipo de dato que va a recibir el componente, se utiliza Props para darle propiedades al componente
  src: string;
  width: string | number;
  height: string | number;
  placeholder?: PlaceholderValue; // ? es para que sea opcional
  onLazyLoad?: (img: HTMLImageElement) => void; // La funcion onLazyLoad funciona como un callback, que se ejecuta cuando la imagen se carga en el cliente
};

type ImageNative = ImgHTMLAttributes<HTMLImageElement>; // Defino el tipo de dato que va a recibir el componente (sera imagen)
type Props = LazyImageProps & ImageNative; //Pasamos los dos tipos de datos al componente

export function LazyImage({src, onLazyLoad, ...imgProps}: Props): JSX.Element {
    const node = useRef<HTMLImageElement>(null); // node es una referencia al elemento HTML 
    const [isLazyLoaded, setIsLazyLoaded] = useState(false);
    const defaultImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="; // Imagen por defecto que se muestra mientras se carga la imagen
    const [currentSrc, setCurrentSrc] = useState(defaultImage); // src es el estado del elemento HTML [state, setState] = useState(initialState)
   
   
    useEffect(() => { // useEffect es un hook que se ejecuta cuando el componente se renderiza en el cliente 
        if (isLazyLoaded) {
            return;
          }
    // Nuevo observador de cambios
    // onIntesection -> console.log 

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !node.current) {
            return;
          }
                setCurrentSrc(src); // Se actualiza el estado del elemento HTML, cuando la imagen se ve en la pantalla, se cambiara el src de la imagen
                observer.disconnect();
                setIsLazyLoaded(true);
                if (typeof onLazyLoad === "function") {
                    onLazyLoad(node.current);
                  }
        });
    });


    //Observe node
    if (node.current){
    observer.observe(node.current); // Con esto se observa el elemento HTML, se puede utilizar node.current!, donde ! es un operador de aserción no nulo, que le dice al compilador que no se preocupe por el valor nulo.
    }

    //Desconectar el observador

    return () => observer.disconnect(); // Con esto se desconecta el observador


//}, []); //El array vacio es para que solo se ejecute una vez cuando se renderiza el componente
}, [src, onLazyLoad, isLazyLoaded]); //Este prop es para que se ejecute cada vez que cambie la imagen

return (<img ref={node} src={currentSrc} {...imgProps}/> //El scr se inicializa vacio, y cuando se vea en la pantalla se actualiza, y carga hasta el momento que se vea
    );
};