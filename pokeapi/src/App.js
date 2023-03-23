import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar"
import CardContainer from "./components/CardContainer"
import TypeFilter from "./components/TypeFilter";
import OrderFilter from "./components/OrderFilter";
import PokeDetail from "./components/PokeDetail";

function App() {
  const [pokeList, setPokeList] = useState([])
  const orderingOptions = [
    { value: "asc", label: "ID ASC" },
    { value: "dsc", label: "ID DSC" },
  ];
  const [orderBy, setOrderBy] = useState(orderingOptions[0].value);
  
  useEffect(() => {
    const getPoke = async () => {
      const pokeFromServer = await fetchData()
  
      setPokeList(pokeFromServer)
      setOrderBy("asc")
    }
    getPoke()
  }, [])  

  // Fetch Data
  const fetchData = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await res.json()
    return data["results"]
  }

  // Search Poke
  const searchPoke = async (name) => {
    try {
      const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
      const res = await fetch(baseUrl + name.toLowerCase())
      const data = await res.json()
      const pname = data["name"]
      const id = data["id"]
      const url = baseUrl + id
      const pokemonObj = {name: pname, url: url}
      setPokeList([pokemonObj])
      setOrderBy("asc")
    } catch {
      alert('Pokemon does not exist')
    }
  }

  // Filter Type
  const filterType = async (id) => {
      const baseUrl = 'https://pokeapi.co/api/v2/type/'
      const res = await fetch(baseUrl + id)
      const data = await res.json()
      const pokemon = data["pokemon"]
      const mappedPokemon = pokemon.map((poke) => {
        return poke["pokemon"]
      })
      setPokeList(mappedPokemon)
      setOrderBy("asc")
  }

  // Order List
  const orderList = async (order) => {
    if (orderBy !== order) {
      setOrderBy(order)
      const flippedList = pokeList.reverse()
      setPokeList(flippedList)
    }
  }

  // Reset List
  const resetList = async () => {
    const pokeFromServer = await fetchData()
  
    setPokeList(pokeFromServer)
  }

  return (
    <>
      <Router>
        <Header />
          <Routes>
            <Route path='/' element={
              <>
                <SearchBar onSearch={searchPoke}/>
                <div className="filters">
                  <TypeFilter onFilter={filterType} onReset={resetList}/>
                  <OrderFilter onOrder={orderList} order={orderBy} orderingOptions={orderingOptions}/>
                </div>
                {pokeList.length > 0 
                  ? <CardContainer pokeList={pokeList}/> 
                  : <div className="empty-list">No Pokemon to Display</div>}
              </>
            }/>
            <Route path="/pokemon/:id" element={<PokeDetail/>}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
