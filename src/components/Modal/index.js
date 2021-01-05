import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BaseModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f2f2f2;
  z-index: 1;
  width: 400px;
  padding: 20px;
  color: #333333;
`;

export const InfoModal = styled(BaseModal)`
  height: auto;
`;

export const FormModal = styled(BaseModal)`
  max-height: 300px;
  overflow: auto;
`;