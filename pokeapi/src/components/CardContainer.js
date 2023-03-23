import React from 'react'
import PokeCard from './PokeCard'

const CardContainer = ({ pokeList }) => {
    return (
    <div className='container'>
        {pokeList.map((poke, index) => (
            <PokeCard key={index} name={poke.name} url={poke.url}/>
        ))}
    </div>
  )
}

export default CardContainer