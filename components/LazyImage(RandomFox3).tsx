
//Generate a random funtion between 1 and 123
const random = () =>Math.floor(Math.random() * 123) + 1

export const RandomFox = ():JSX.Element => { // En vez de especificar el retorno, podría utilizar el Function Component o FC (Una función que retorna el tipo de componente de React)
    const Image: string = `https://randomfox.ca/images/${random()}.jpg`
    return <img width={302} height="auto" src={Image} className="rounded"/>;
};