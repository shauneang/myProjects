import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PokeType from './pokecard/PokeType'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'

const PokeDetail = () => {
    const location = useLocation()
    const [pokemon, setPokemon] = useState()
    const [pokeName, setPokeName] = useState()
    const [pokeImg, setPokeImg] = useState()
    const [pokeId, setPokeId] = useState()
    const [pokeExp, setPokeExp] = useState()
    const [paddedId, setPaddedId] = useState()
    const [pokeHeight, setPokeHeight] = useState()
    const [pokeWeight, setPokeWeight] = useState()
    const [pokeMoveCount, setPokeMoveCount] = useState()
    const [pokeGameApp, setPokeGameApp] = useState()
    const [pokeTypes, setPokeTypes] = useState([])
    useEffect(() => {
        const fetchPokemon = async () => {
            const baseurl = 'https://pokeapi.co/api/v2'
            const searchParam = location["pathname"]
            const res = await fetch(baseurl + searchParam)
            const data = await res.json()
            return data
        }
    
        const getPokemon = async () => {
            const pokeFromServer = await fetchPokemon()
            setPokemon(pokeFromServer)
        }
    
        getPokemon()
    }, [location])
    
    useEffect(() => {
        if (pokemon) {
            const name = pokemon["species"]["name"]
            setPokeName(name)

            const img = pokemon["sprites"]["front_default"]
            setPokeImg(img)
        
            const exp = pokemon["base_experience"]
            setPokeExp(exp)

            const id = pokemon["id"]
            setPokeId(id)
            
            const paddedId = makeThreeDigit(id.toString())
            setPaddedId(paddedId)

            const height = pokemon["height"]
            setPokeHeight(height)

            const weight = pokemon["weight"]
            setPokeWeight(weight)

            const moveCount = pokemon["moves"].length
            setPokeMoveCount(moveCount)

            const gameApp = pokemon["game_indices"].length
            setPokeGameApp(gameApp)

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
    <div className='detail-container'>
        <div className='detail'>
            <div className='image-container'>
                <img src={pokeImg} alt={pokeName}></img>
            </div>
            <Link to={'/'} className="backarrow">
                <BsFillArrowLeftCircleFill size={50}/>
            </Link>

            <div className='desc'>
                <label>{pokeName} #{paddedId}</label> 
                <div className='types'>
                    {pokeTypes.map((type, index) => (
                        <PokeType key={index} type={type["type"]["name"]} url={type["type"]["url"]}/>
                    ))}
                </div>
                <div className="details">
                    <div>EXP: {pokeExp}</div> 
                    <div>Height: {pokeHeight}</div>
                    <div>Weight: {pokeWeight}</div> 
                    <div>Moves: {pokeMoveCount}</div> 
                    <div>Games: {pokeGameApp}</div> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default PokeDetail