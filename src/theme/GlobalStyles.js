import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Sigmar+One&display=swap');
    *,*::after,*::before{
        box-sizing:border-box;
    }
    html{
        font-size:62.5%;
    }
    body{
        margin:0;
        font-size:1.6rem;
        font-family: 'Sigmar One', cursive;
        min-height:100vh;
        background:#fafafa;
    }

`;
export default GlobalStyles;
