'use client';
import Image from 'next/image'
import {RandomFox} from '../components/RandomFox'

import {MouseEventHandler, useState} from 'react'

const random = () =>Math.floor(Math.random() * 123) + 1 //Generate a random funtion between 1 and 123

//Generate simple unique id
const generateId = () => Math.random().toString(16).slice(2)

type ImageItem = {id: string, url: string}
export default function Home() {
const [images, setImages] = useState<Array<ImageItem>>([]); // [state, setState] = useState(initialState)
  
const addNewFox:MouseEventHandler<HTMLButtonElement> = (event) => {
  
  const newImageItem: ImageItem = {
    id: generateId(),
    url: `https://randomfox.ca/images/${random()}.jpg`
  };

  setImages((images) => [
    ...images, newImageItem
  ])
}
return (
    <main>
      <h1 className="text-3xl font-bold underline">
      Hello world!</h1>
      <br></br>
      <button onClick={addNewFox}>Add new fox</button>
      {images.map(({id,url}) => (
      <div key={id} className='p-4'>
      <RandomFox image={url}/>
      </div>
      ))}
     </main>
  )
}
