import styled from 'styled-components';

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleBase = styled.div`
  color: ${(props) => (props.dark ? '#333333' : '#F2F2F2')};
`;

export const Heading = styled(TitleBase)`
  font-size: 16px;
  font-weight: bolder;
`; 

export const SubHeading = styled(TitleBase)`
  font-size: 14px;
  font-weight: bold;
`;

export const TaskTitle = styled(TitleBase)`
  font-weight: bolder;
  font-size: 12px;
`;