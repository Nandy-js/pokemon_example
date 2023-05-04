import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import Layout from "@/component/Layout";

import Chart from "@/component/chart";

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

export default function pokemon({ pokeman }) {
  const base = pokeman?.stats.map((val) => val.base_stat);
  console.log("1", base);

  return (
    <Layout>
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
              <h1 className="heading">Pokeman Details</h1>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="main">
        <div className="pokeman">
          <Box sx={{ width: "100%" }}>
            <Grid container rowSpacing={1} columnSpacing={{ sm: 2 }}>
              <Grid item xs="auto" sm="auto" md="auto">
                <main className="mainClass" title={pokeman.name}>
                  <h2 className="pokemanHeading">{pokeman.name}</h2>
                  <Image
                    className="pokemanImages"
                    src={pokeman.image}
                    alt={pokeman.name}
                    width={150}
                    height={150}
                  />
                  <p className="heightWeight">
                    <span>Height: </span>
                    {pokeman.height}
                  </p>
                  <p className="heightWeight">
                    <span>Weight: </span>
                    {pokeman.weight}
                  </p>

                  <h2 className="types">Types</h2>
                  {pokeman.types.map((type, index) => (
                    <p className="typeName" key="index">
                      {type.type.name}
                    </p>
                  ))}
                  <Chart base={base} />
                  <p className="home">
                    <Link href="/">Home</Link>
                  </p>
                </main>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const pokemanId = ("00" + id).slice(-3);
    pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemanId}.png`;
    return {
      props: { pokeman },
    };
  } catch (err) {
    console.error(err);
  }
}
