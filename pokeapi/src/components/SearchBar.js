import React from 'react'
import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
    const [text, setText] = useState('')

    const onSubmit = (e) => {
      e.preventDefault()
      if(!text) {
          alert('Please search for a Pokemon')
          return
      }

      onSearch(text)
      setText('') 
    }
  return (
    <div className='searchbar'>
        <form className='search-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <input type='text' placeholder='Search Pokemon' value={text} onChange={(e) => setText(e.target.value)}/>
                <label>Use this input to search for any pokemon. In an instant.</label>
            </div>
            <button type="submit" hidden />
        </form>
    </div>
  )
}

export default SearchBar