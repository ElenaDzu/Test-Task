import React from "react";

function Header() {
  return (
    <>
        <header className="header">
            <button className="header__back-button">
                <img className="header__arrow"
                src="arrow.png"
                alt="arrow"/>
            </button>
            <img className="header__logo" src="logo.png"alt="Trood Logo"/>
            <h1 className="header__title">Profile</h1>
        </header>
    </>
  );
}

export default Header;