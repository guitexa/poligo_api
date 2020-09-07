import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import IconTechnicalArea from '../../assets/icons/icon-technical-area.svg';
import IconComercial from '../../assets/icons/icon-comercial.svg';
import IconBilling from '../../assets/icons/icon-billing.svg';
import IconExit from '../../assets/icons/icon-exit.svg';

import { useAuth } from '../../hooks/auth';

import { Container, Content, Menu, Title, Cover } from './styles';

interface HeaderProps {
  title: string;
  color: string;
}

const Header: React.FC<HeaderProps> = ({ title, color, children }) => {
  const { signOut } = useAuth();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuMouseEnter = useCallback(() => {
    setMenuIsOpen(true);
  }, []);

  const handleMenuMouseLeave = useCallback(() => {
    setMenuIsOpen(false);
  }, []);

  return (
    <>
      <Container color={color}>
        <Content>
          <Menu
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <div id="sub-menu">
              <Link id="comercial" to="/Comercial">
                <img src={IconComercial} alt="" />
                <div>
                  <p className="title">Comercial</p>
                  <p className="text">Gerencie as propostas</p>
                  <p className="text">enviadas, e serviços</p>
                  <p className="text">vendidos</p>
                </div>
              </Link>
              <Link id="technical-area" to="/TechnicalArea">
                <img src={IconTechnicalArea} alt="" />
                <div>
                  <p className="title">Área Técnica</p>
                  <p className="text">Controle os serviços</p>
                  <p className="text">pendentes e realizados</p>
                  <p className="text">da área técnica.</p>
                </div>
              </Link>
              <Link id="billing" to="/Billing">
                <img src={IconBilling} alt="" />
                <div>
                  <p className="title">Faturamento</p>
                  <p className="text">Gerencie o</p>
                  <p className="text">faturamento dos</p>
                  <p className="text">pedidos do comercial</p>
                </div>
              </Link>
              <button type="button" id="exit" onClick={signOut}>
                <img src={IconExit} alt="" />
                <p className="title">Sair</p>
              </button>
            </div>
          </Menu>
          <Title>{title}</Title>
        </Content>
        {children}
      </Container>
      <Cover menuIsOpen={menuIsOpen} />
    </>
  );
};

export default Header;
