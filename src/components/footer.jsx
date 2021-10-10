import React from "react";
import styled from "styled-components";

export const MyFooter = () => {
  return (
    <Footer>
      <FooterContent>
        <Logo href="#!">
          Sudo<span>Tab © 2021 </span>{" "}
        </Logo>
      </FooterContent>
    </Footer>
  );
};

const Footer = styled.footer`
  text-align: center;
  color: white;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: #343a40;
`;

const FooterContent = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #7b7fda;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;
