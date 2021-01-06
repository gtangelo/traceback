import styled from 'styled-components';

export const TabContainer = styled.div`
  width: 400px;
  height: 100%;
  padding: 15px 25px;
  background-color: #333333;
  color: #e0e0e0;
  overflow: auto;
`;

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
