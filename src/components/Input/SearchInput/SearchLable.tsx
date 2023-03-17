import { styled } from 'styled-components';

/**
 * A label component for the search input
 * @param props
 * @param props.isError - If the input is in error state
 * @param props.isAvailable - If the ENS name is available
 */
export function SearchLable(props: { isNameAvaliable?: boolean; isTooShort?: boolean }) {
  return (
    <SearchLableText isError={!props.isNameAvaliable || props.isTooShort} isAvailable={props.isNameAvaliable}>
      {props.isTooShort ? 'Too short' : props.isNameAvaliable ? 'Avaliable' : 'Taken'}
    </SearchLableText>
  );
}

const SearchLableText = styled.div<{
  isError?: boolean;
  isAvailable?: boolean;
}>`
  width: fit-content !important;
  height: auto !important;
  position: absolute;
  right: 16px;
  top: 27px;
  padding: 3.5px 10.8672px 2.50006px 9px;
  background: rgba(249, 231, 231, 0.910379);
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  font-family: 'Archivo', sans-serif;
  ${(props) => (props.isError ? 'color:#C52F1BE8;' : props.isAvailable ? 'color:#1DAF8390;' : '')}
  ${(props) =>
    props.isError
      ? 'background:rgba(249, 231, 231, 0.910379);'
      : props.isAvailable
      ? 'background: rgba(231, 244, 239, 0.563468);'
      : ''}
`;
