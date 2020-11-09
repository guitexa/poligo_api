import React, { useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import formatValueCurrency from '../../utils/formatValueCurrency';

import { ServiceOrderData } from '../SearchResults';

import {
  ModalContainer,
  Header,
  Content,
  Background,
  // Description,
  // Value,
} from './styles';

interface ProductViewProps {
  color: string;
  setProductViewOpen(e: boolean): void;
  productToView: ServiceOrderData;
  from: string;
}

const ProductView: React.FC<ProductViewProps> = ({
  color,
  setProductViewOpen,
  productToView,
  from,
}) => {
  const handleCloseWindow = useCallback(() => {
    setProductViewOpen(false);
  }, [setProductViewOpen]);

  return (
    productToView &&
    productToView.product && (
      <>
        <ModalContainer>
          <Header color={color}>
            <strong>{productToView.product.name}</strong>
            <button type="button" onClick={() => handleCloseWindow()}>
              <FaTimes />
            </button>
          </Header>
          <Content>
            <div>
              <strong>Descrição:</strong>
              <p>{productToView.product_description}</p>
            </div>
            {from !== 'TechnicalArea' && (
              <div>
                <strong>Valor:</strong>
                <p>
                  {formatValueCurrency(Number(productToView.product_value))}
                </p>
              </div>
            )}
          </Content>
        </ModalContainer>
        <Background type="button" onClick={() => handleCloseWindow()} />
      </>
    )
  );
};

export default ProductView;
