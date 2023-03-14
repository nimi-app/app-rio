import { styled } from 'styled-components';

/**
 * A label component for the search input
 * @param props
 * @param props.isError - If the input is in error state
 * @param props.isAvailable - If the ENS name is available
 */
export function SearchLable(props: { isNameAvaliable?: boolean; isTooShort?: boolean; isAvailable?: boolean }) {
  return (
    <SearchLableContainer>
      <SearchLableText isError={props.isNameAvaliable} isAvailable={props.isAvailable}>
        {props.isTooShort ? 'Too short' : props.isAvailable ? 'Avaliable' : 'Taken'}
      </SearchLableText>
    </SearchLableContainer>
  );
}

const SearchLableContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
`;
const SearchLableText = styled.div<{
  isError?: boolean;
  isAvailable?: boolean;
}>`
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  ${(props) => (props.isError ? 'color:#C52F1BE8' : props.isAvailable ? 'color:#1DAF8390' : '')}
`;
