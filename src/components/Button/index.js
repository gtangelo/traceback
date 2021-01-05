import styled, { css } from 'styled-components';
import { Tooltip } from '@material-ui/core';

const removeDefaultButton = css`
  border: 0;
  padding: 0;
  font-family: inherit;
  font-weight: normal;
  background: unset;
  box-sizing: border-box;
  outline: none;
`;

const BaseButton = styled.button`
  ${removeDefaultButton}
  cursor: pointer;
  padding: 0 5px;
  height: 25px;
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    360deg,
    rgba(208, 208, 208, 1) 0%,
    rgba(249, 249, 249, 1) 100%
  );
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  color: #333333;
`;

export const CircleButton = styled(BaseButton)`
  width: 25px;
  border-radius: 25px;
  padding: 0;
`;

export const TaskButton = styled(BaseButton)`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  padding: 0;
  background: ${(props) => props.colour};
`;

export const LongButton = styled(BaseButton)`
  width: 100px;
`;

export const AddButton = styled(BaseButton)`
  height: 30px;
  background: linear-gradient(180deg, #bb6bd9 0%, #9144d8 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
  font-size: 15px;
`;

export const ColourButton = styled(TaskButton)`
  width: ${(props) => (props.selected === true ? '25px' : '20px')};
  height: ${(props) => (props.selected === true ? '25px' : '20px')};
  border-radius: ${(props) => (props.selected === true ? '25px' : '20px')};
`;

export const TooltipButton = ({button: Button, title, colour, children, onClick}) => {
  return (
    <Tooltip title={title} arrow placement='top'>
      <Button colour={colour} onClick={onClick}>
        {children}
      </Button>
    </Tooltip>
  );
};