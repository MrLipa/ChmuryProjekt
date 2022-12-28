import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  fontColor: "#333"
};

export const darkTheme = {
  body: "#333",
  fontColor: "#fff"
};

export const GlobalStyles = createGlobalStyle`

  * {
    color: ${(props) => props.theme.fontColor}!important;
  }
  .dropdown-menu{
    background-color: ${(props) => props.theme.body}!important;
  }
	body {
		background-color: ${(props) => props.theme.body}!important;
	}
  input {
    color:  #333 !important;
  }
  .nav-links:hover {
    color: ${(props) => props.theme.body} !important;
  }
  .dropdown-link:hover {
    color: ${(props) => props.theme.body} !important;
  }
  .nav-menu.active {
    background: ${(props) => props.theme.body} !important;
  }
  #profile
  {
    background: linear-gradient(to bottom,  #d9534f 0%,${(props) => props.theme.body} 100%) !important;
  }
  #subject
  {
    background: linear-gradient(to bottom,  #0275d8 0%,${(props) => props.theme.body} 100%) !important;
  }
  #lecturer
  {
    background: linear-gradient(to bottom,  #5cb85c 0%,${(props) => props.theme.body} 100%) !important;
  }
  .item-link
  {
    color: rgb(0, 0, 0) !important;
  }
`;