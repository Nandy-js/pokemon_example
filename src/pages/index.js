import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/component/Layout";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { debounce } from "lodash";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "beige",
  "&:hover": {
    backgroundColor: "beige",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  backgroundColor: "beige",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Home({ pokemon }) {
  const [filteredPokemon, setFilteredPokemom] = useState(pokemon);
  const handleSearch = debounce((event) => {
    console.log("**************************************");
    const filtered = pokemon.filter((pokeman) =>
      pokeman.name.includes(event.target.value)
    );
    setFilteredPokemom(filtered);
  }, 1000);

  return (
    <Layout title="Pokemon App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
              }}
            >
              <h1 className="heading">Pokemon</h1>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="inputFields">
        <TextField
          id="outlined-basic"
          placeholder="Search"
          onChange={handleSearch}
          variant="outlined"
          size="small"
        />
      </div>
      <div className="entries">
        {filteredPokemon.map((pokeman, index) => {
          return (
            <div key={index} className="images">
              <Link className="nameStyle" href={`/pokemon?id=${index + 1}`}>
                <div className="articles">
                  <Box sx={{ width: "100%" }}>
                    <Grid container rowSpacing={1} columnSpacing={{ sm: 2 }}>
                      <Grid item xs="auto" sm="auto" md="auto">
                        <Image
                          width={150}
                          height={150}
                          src={pokeman.image}
                          alt={pokeman.name}
                          className="articleImage"
                        />
                        <div className="articleName">
                          <p className="name">{pokeman.name}</p>
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();

    const pokemon = results.map((pokeman, index) => {
      const pokemonId = ("00" + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`;
      return { ...pokeman, image };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
