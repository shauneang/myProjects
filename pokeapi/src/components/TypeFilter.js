import React, { useState, useEffect } from 'react'
import PokeType from './pokecard/PokeType'

const TypeFilter = ({ onFilter, onReset }) => {
    const [types, setTypes] = useState([])

    useEffect(() => {
        const getTypes = async () => {
            const res = await fetch("https://pokeapi.co/api/v2/type")
            const data = await res.json()
            setTypes(data["results"])
        }
        getTypes()
    })
  return (
    <div className="filter type-filter">
        <label>Filter by type:</label>
        <div className='type-container'>
            {types.map((type, index) => {
                return (
                    <PokeType key={index} type={type["name"]} url={type["url"]} onClick={onFilter}/>
                )
            })}
            <div className="type" onClick={onReset}>Reset</div>
        </div>
    </div>
  )
}

export default TypeFilter