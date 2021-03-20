import React, { useState } from "react";
import styled from 'styled-components'

const PokemonItem = styled.li`
cursor: pointer;

&:hover{
    text-decoration: underline;
}
`

const PokemonData = styled.div`
border-radius: 6px;
padding: 16px;
`

const PokemonImage = styled.img``

const list = ({pokemons}) => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    console.log('Hello', pokemons);

    const fetchPokemon = async (pokeUrl) => {
        const pokeResponse = await fetch(pokeUrl);
        const pokeJSON = await pokeResponse.json();

        console.log('la info del pokemon es: ', pokeJSON);

        setSelectedPokemon({
            image: pokeJSON.sprites.front_default,
        })
    }
    return (
    <div>
        <ul>
            {React.Children.toArray(
                pokemons.map((pokemon) => (
                <PokemonItem onClick={() =>{fetchPokemon(pokemon.url);}}>
                    {pokemon.name}</PokemonItem>
                ))
            )}
        </ul>

        {selectedPokemon !== null && 
        <PokemonData>
            <PokemonImage src={selectedPokemon.image}/>
        </PokemonData>
        }
    </div>
    )
}

export async function getServerSideProps() {
    const pokeList = await fetch('https://pokeapi.co/api/v2/pokemon');
    const pokeJSON = await pokeList.json();

    console.log("los pokemones", pokeJSON);
    
    return {
      props: {pokemons: pokeJSON.results}, // will be passed to the page component as props
    }
  }

export default list