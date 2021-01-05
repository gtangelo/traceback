import styled from 'styled-components';

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ItemNameSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: auto;

  &:hover {
    cursor: ${props => props.hover ? "pointer": "default"};
  }
`;

export const ItemButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
`;
