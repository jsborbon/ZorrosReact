'use client';
import Image from 'next/image'
import {random} from 'lodash' //Con una instalacion tipica lodash viene sin tipos de datos, por lo que se debe instalar @types/lodash (Que viene de definitely Typed)
import {LazyImage} from '../components/LazyImage'

import {MouseEventHandler, useState} from 'react'

//const random = () =>Math.floor(Math.random() * 123) + 1 //Generate a random funtion between 1 and 123
const randomNumber = () => random(1,123); //Generate a random funtion between 1 and 123

//Generate simple unique id
const generateId = () => Math.random().toString(16).slice(2)


//type IFoxImageItem = {id: string, url: string} Se ha comentado para que se pueda utilizar el tipo de dato de manera Global
export default function Home() {
const [images, setImages] = useState<Array<IFoxImageItem>>([]); // [state, setState] = useState(initialState)
  
const addNewFox:MouseEventHandler<HTMLButtonElement> = (event) => {
  
 const newImageItem: IFoxImageItem = {
    id: generateId(),
    url: `https://randomfox.ca/images/${randomNumber()}.jpg`
  };

  setImages([...images, newImageItem])
  window.plausible("add_fox") // Con esto se envia un evento a plausible
};

return (
    <main>
    <h1 className="text-3xl font-bold underline">
      Hello world!</h1>
    <br>
    </br>
    <button onClick={addNewFox}>Add new fox</button>
    {images.map(({ id, url }, index) => (
      <div key={id} className='p-4'>
        <LazyImage
          src={url}
          width={302}
          height="auto"
          title='RandomFox'
          className="rounded bg-gray-300"
          onClick={() => console.log("HEY")}
          onLazyLoad={(img) => {
            console.log(`Image #${index + 1} cargada. Nodo:`, img);
          } } />
      </div>
    ))}
  </main>
  )
}
