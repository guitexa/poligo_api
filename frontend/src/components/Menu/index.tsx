import React from 'react';
import { Link } from 'react-router-dom';

import IconTechnicalArea from '../../assets/icons/icon-technical-area.svg';
import IconComercial from '../../assets/icons/icon-comercial.svg';
import IconBilling from '../../assets/icons/icon-billing.svg';
import IconExit from '../../assets/icons/icon-exit.svg';

import { Container } from './styles';

const Menu: React.FC = () => {
  return (
    <Container>
      <div id="sub-menu">
        <Link id="comercial" to="/Comercial">
          <img src={IconComercial} alt="" />
          <div>
            <strong>Comercial</strong>
            <p>
              Gerencie as propostas
              <br />
              enviadas, e serviços
              <br />
              vendidos
            </p>
          </div>
        </Link>
        <Link id="technical-area" to="/TechnicalArea">
          <img src={IconTechnicalArea} alt="" />
          <div>
            <strong>Área Técnica</strong>
            <p>
              Controle os serviços
              <br />
              pendentes e realizados
              <br />
              da área técnica.
            </p>
          </div>
        </Link>
        <Link id="billing" to="/Billing">
          <img src={IconBilling} alt="" />
          <div>
            <strong>Faturamento</strong>
            <p>
              Gerencie o<br />
              faturamento dos
              <br />
              pedidos do comercial
            </p>
          </div>
        </Link>
      </div>
    </Container>
  );
};

export default Menu;
