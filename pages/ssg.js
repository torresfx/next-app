import axios from "axios";
import { useState, useEffect } from "react";

const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
const headers = {
  "Cache-Control": "no-cache",
};

const StaticSide = (props) => {
  return props.pokemon.map((poke) => {
    return (
      <div key={poke.id}>
        <img src={poke.imgUrl} />
        <hr />
        <p>{poke.name}</p>
      </div>
    );
  });
};
export const getStaticProps = async () => {
  const response = await axios.get(url, { headers });
  const promises = response.data.results.map((result) => {
    return axios.get(result.url, { headers });
  });
  const responses = await Promise.all(promises);
  console.log(responses);
  const pokeData = responses.map((r) => {
    // filter data into desired properties
    return {
      id: r.data.id,
      name: r.data.name,
      imgUrl: r.data.sprites.front_default,
    };
  });
  return {
    props: {
      pokemon: pokeData,
    },
  };
};

export default StaticSide;
