
type Props = {image:string}; // Defino el tipo de dato que va a recibir el componente, se utiliza Props para darle propiedades al componente

export const RandomFox = ({image}:Props):JSX.Element => {
    return (<img width={302} height="auto" src={image} className="rounded"/>
    );
};