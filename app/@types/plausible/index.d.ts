type Options = { //Opciones para recibir los datos de la API
    callback?: () => void; //Función que se ejecuta cuando se recibe la respuesta de la API
    props: Record<string, string  | number | undefined>; //Objeto que contiene las propiedades de la API
}
interface Window { //Extend the Window interface with Plausible
    plausible: (event:'add_fox' | 'remove_fox', options?: Options)=>void; //Solo lee el evento add_fox o remove_fox
}