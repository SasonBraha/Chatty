import { injectGlobal } from 'styled-components';

injectGlobal`
  @import url(https://fonts.googleapis.com/earlyaccess/opensanshebrew.css);
  *,
  ::before,
  ::after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
    font-family: inherit;
    font-size: inherit;
  }
  
  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Open Sans Hebrew', sans-serif;
    box-sizing: border-box;
    height: 100%;
    background: -webkit-linear-gradient(left, #3931af, #00c6ff);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }
`