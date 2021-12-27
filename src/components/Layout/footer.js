/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Facebook from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const icons = css`
  color: white;
  font-size: 3rem;
`;

const Footer = () => {
  return (
    <footer
      css={(theme) => ({
        width: "100%",
        background: theme.palette.primary.main,
        marginTop:'15rem'
      })}
    >
      
      <Grid container justifyContent={"center"} css={{position: 'relative'}}>
        <Grid
          item
          container
          justifyContent="center"
          columnSpacing={1}
          css={{ margin: "2rem 0" }}
        >
          <Grid item>
            <Facebook css={icons} />
          </Grid>
          <Grid item>
            <TwitterIcon css={icons} />
          </Grid>
          <Grid item>
            {" "}
            <InstagramIcon css={icons} />
          </Grid>
        </Grid>

        <Grid item >
          <Typography variant="h6" color={"white"}>
            <span css={{ color: "white",marginRight:'0.2rem',position:'relative',top:2 }}>©</span>
            2021 Project Manager
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
