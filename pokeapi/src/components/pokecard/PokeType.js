import React from 'react'
import { useState, useEffect } from 'react'

const PokeType = ({ type, url, onClick}) => {
  const [id, setId] = useState();

  useEffect(() => {
    const fetchType = async () => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }

    const getType = async () => {
        const typeFromServer = await fetchType()
        setId(typeFromServer["id"])
    }

    getType()
}, [url])
  return (
    <div className={`type ${type}`} onClick={() => {onClick && onClick(id)}}>
        {type}
    </div>
  )
}

export default PokeType