import React from 'react'
import { useState, useEffect } from 'react'
import PokeType from './pokecard/PokeType'
import { Link } from 'react-router-dom'

const PokeCard = ({ name, url }) => {
    const [pokemon, setPokemon] = useState()
    const [pokeImg, setPokeImg] = useState()
    const [pokeId, setPokeId] = useState()
    const [pokeExp, setPokeExp] = useState()
    const [paddedId, setPaddedId] = useState()
    const [pokeTypes, setPokeTypes] = useState([])

    useEffect(() => {
        const fetchPokemon = async () => {
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
    
        const getPokemon = async () => {
            const pokeFromServer = await fetchPokemon()
            setPokemon(pokeFromServer)
        }
    
        getPokemon()
    }, [url])
    
    useEffect(() => {
        if (pokemon) {
            const img = pokemon["sprites"]["front_default"]
            setPokeImg(img)
        
            const exp = pokemon["base_experience"]
            setPokeExp(exp)

            const id = pokemon["id"]
            setPokeId(id)
            
            const paddedId = makeThreeDigit(id.toString())
            setPaddedId(paddedId)
            
            const types = pokemon["types"]
            setPokeTypes(types)
        }
    }, [pokemon])  

    const makeThreeDigit = (id) => {
        const length = id.length
        const padding = length < 3 ? '0'.repeat(3 - length) : ''
        return padding + id
    }

    return (
    <div className='card'>
        <Link to={`pokemon/${pokeId}`}>
            <div className='image-container'>
                <img src={pokeImg} alt={name}></img>
            </div>
        </Link>
        <div className='details'>
            <p className='card-id'>#{paddedId}</p>
            <p className='card-exp'>EXP: {pokeExp}</p>
        </div>
        <label>{name}</label> 
        <div className='types'>
            {pokeTypes.map((type, index) => (
                <PokeType key={index} type={type["type"]["name"]} url={type["type"]["url"]}/>
            ))}
        </div>
    </div>
  )
}

export default PokeCard