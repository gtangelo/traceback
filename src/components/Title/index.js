import styled from 'styled-components';

const TitleBase = styled.div`
  color: ${(props) => (props.dark ? '#333333' : '#bdbdbd')};
`;

export const Heading = styled(TitleBase)`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bolder;
`; 

export const SubHeading = styled(TitleBase)`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const TaskTitle = styled(TitleBase)`
  font-weight: bolder;
  font-size: 14px;
`;