import React, { useState } from 'react';

import { FaCheckCircle, FaRegClock, FaTimes } from 'react-icons/fa';

import Order from '../Order';
import HeaderButton from '../HeaderButton';

import {
  OrderOverlapping,
  Container,
  Content,
  RowResult,
  Date,
  CompanyName,
  Service,
  Seller,
  Value,
  Status,
} from './styles';

interface SearchResultsProps {
  color: string;
  orderOpen: boolean;
  setOrderOpen(e: boolean): void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  color,
  orderOpen,
  setOrderOpen,
}) => {
  const [newServiceOpen, setNewServiceOpen] = useState(true);

  return (
    <>
      {orderOpen && (
        <OrderOverlapping>
          <Order
            color={color}
            newServiceOpen={newServiceOpen}
            setNewServiceOpen={(e) => setNewServiceOpen(e)}
          />
          <HeaderButton
            show={orderOpen && !newServiceOpen}
            handleClick={(e) => setOrderOpen(!e)}
            type="button"
            icon={FaTimes}
            color={color}
          />
        </OrderOverlapping>
      )}
      <Container>
        <Content>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>12/06/2020</Date>
            <CompanyName>
              Distribuidora Triangulina de Veículos Ltda
            </CompanyName>
            <Service>PCA</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>3.575,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>12/06/2020</Date>
            <CompanyName>Hidrovacuo Saneamento LTDA</CompanyName>
            <Service>PCA</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>1.500,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>10/06/2020</Date>
            <CompanyName>Carré - Arte em Mármore e Granito Ltda</CompanyName>
            <Service>Treinamento designado de Cipa</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>200,00</div>
            </Value>
            <Status>
              <FaRegClock className="fa-clock" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>10/06/2020</Date>
            <CompanyName>Mariangela Borges Alves</CompanyName>
            <Service>Adendo PPRA/PCMSO</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>100,00</div>
            </Value>
            <Status>
              <FaTimes className="fa-times" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>09/06/2020</Date>
            <CompanyName>Ergosafety</CompanyName>
            <Service>01 PCMSO</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>150,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>09/06/2020</Date>
            <CompanyName>Resolv Prestadora de Serviços Ltda</CompanyName>
            <Service>PPR</Service>
            <Seller>Tainara</Seller>
            <Value>
              <div>R$</div>
              <div>600,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>04/06/2020</Date>
            <CompanyName>Arko Industria e Comercio de Mineração...</CompanyName>
            <Service>Treinamento designado de Cipa</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>800,00</div>
            </Value>
            <Status>
              <FaRegClock className="fa-clock" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>04/06/2020</Date>
            <CompanyName>Arko Industria e Comercio de Mineração...</CompanyName>
            <Service>Visita técnica</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>600,00</div>
            </Value>
            <Status>
              <FaRegClock className="fa-clock" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>28/05/2020</Date>
            <CompanyName>RCM Engenharia e Construções</CompanyName>
            <Service>Reimpressão de documento</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>100,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>20/05/2020</Date>
            <CompanyName>Supermotos</CompanyName>
            <Service>Treinamento de NR-12</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>600,00</div>
            </Value>
            <Status>
              <FaTimes className="fa-times" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>20/05/2020</Date>
            <CompanyName>Empreiteira Cristal Ltda</CompanyName>
            <Service>Treinamento</Service>
            <Seller>Tainara</Seller>
            <Value>
              <div>R$</div>
              <div>300,00</div>
            </Value>
            <Status>
              <FaRegClock className="fa-clock" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>14/05/2020</Date>
            <CompanyName>Arko Industria e Comercio de Mineração...</CompanyName>
            <Service>Adendo</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>100,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>14/05/2020</Date>
            <CompanyName>
              Rocha Serviços de Limpeza Profissional Eireli
            </CompanyName>
            <Service>Treinamentos</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>500,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>12/06/2020</Date>
            <CompanyName>
              Distribuidora Triangulina de Veículos Ltda
            </CompanyName>
            <Service>PCA</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>3.575,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>12/06/2020</Date>
            <CompanyName>Hidrovacuo Saneamento LTDA</CompanyName>
            <Service>PCA</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>1.500,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>10/06/2020</Date>
            <CompanyName>Carré - Arte em Mármore e Granito Ltda</CompanyName>
            <Service>Treinamento designado de Cipa</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>200,00</div>
            </Value>
            <Status>
              <FaRegClock className="fa-clock" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>10/06/2020</Date>
            <CompanyName>Mariangela Borges Alves</CompanyName>
            <Service>Adendo PPRA/PCMSO</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>100,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>09/06/2020</Date>
            <CompanyName>Ergosafety</CompanyName>
            <Service>01 PCMSO</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>150,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>09/06/2020</Date>
            <CompanyName>Resolv Prestadora de Serviços Ltda</CompanyName>
            <Service>PPR</Service>
            <Seller>Tainara</Seller>
            <Value>
              <div>R$</div>
              <div>600,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>04/06/2020</Date>
            <CompanyName>Arko Industria e Comercio de Mineração...</CompanyName>
            <Service>Treinamento designado de Cipa</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>800,00</div>
            </Value>
            <Status>
              <FaRegClock className="fa-clock" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>04/06/2020</Date>
            <CompanyName>Arko Industria e Comercio de Mineração...</CompanyName>
            <Service>Visita técnica</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>600,00</div>
            </Value>
            <Status>
              <FaRegClock className="fa-clock" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>28/05/2020</Date>
            <CompanyName>RCM Engenharia e Construções</CompanyName>
            <Service>Reimpressão de documento</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>100,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>20/05/2020</Date>
            <CompanyName>Supermotos</CompanyName>
            <Service>Treinamento de NR-12</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>600,00</div>
            </Value>
            <Status>
              <FaTimes className="fa-times" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>20/05/2020</Date>
            <CompanyName>Empreiteira Cristal Ltda</CompanyName>
            <Service>Treinamento</Service>
            <Seller>Tainara</Seller>
            <Value>
              <div>R$</div>
              <div>300,00</div>
            </Value>
            <Status>
              <FaRegClock className="fa-clock" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>14/05/2020</Date>
            <CompanyName>Arko Industria e Comercio de Mineração...</CompanyName>
            <Service>Adendo</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>100,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
          <RowResult
            type="button"
            color={color}
            onClick={() => setOrderOpen(!orderOpen)}
          >
            <Date>14/05/2020</Date>
            <CompanyName>
              Rocha Serviços de Limpeza Profissional Eireli
            </CompanyName>
            <Service>Treinamentos</Service>
            <Seller>Christiane</Seller>
            <Value>
              <div>R$</div>
              <div>500,00</div>
            </Value>
            <Status>
              <FaCheckCircle className="fa-check" />
            </Status>
          </RowResult>
        </Content>
      </Container>
    </>
  );
};

export default SearchResults;
