import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import { NimiSignatureColor } from '../../theme';

/**
 * Base Button frame
 */
export const StyledButtonStaticBase = styled.div`
  position: relative;
  overflow: hidden;

  background: #5625ff;
  opacity: 0.8;
  border-radius: 8px;

  font-family: inherit;
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;

  user-select: none;
  appearance: none;
  cursor: pointer;
  outline: none;
  border: none;
`;

/**
 * Button frame with hover, focus and disabled state
 */
export const StyledButtonBase = styled(StyledButtonStaticBase)`
  /** Animations */
  animation-timing-function: ease-out;
  animation-duration: 300ms;
  padding: 16px 24px;
  background: #4a1fdc;

  /** States */
  &:hover {
    background: #5625ff;
  }

  &:active,
  &:focus {
    background: #643efc;
  }

  &:disabled {
    background-color: ${({ theme }) => theme?.purple5};
    cursor: not-allowed;
    box-shadow: none;
    outline: none;
  }
`;

export const StyledButtonBaseFrame = styled(StyledButtonBase)`
  padding: 16px 24px;
`;

export const StyledButtonFrame = styled(StyledButtonBaseFrame)`
  padding: 13px 24px;
`;

export const StyledLink = styled(Link)`
  display: inline-block;
`;

/**
 * Inner component for the button.
 */
export const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

export const DottedBorder = css`
  line-height: 32px;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.1em;
  ${NimiSignatureColor};
  border: 2px dotted #4368ea;
  border-radius: 16px;
`;
