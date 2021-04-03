import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-white mt-5 p-4 text-center m-b-0 footer">
        Copyright &copy; {new Date().getFullYear()}
      </footer>
    );
  }
}
export default Footer;
