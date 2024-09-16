import { styled } from 'styled-components';

/**
 * A label component for the search input
 * @param props
 * @param props.isError - If the input is in error state
 * @param props.isAvailable - If the ENS name is available
 */

interface SearchLabelProps {
  isNameAvaliable?: boolean;
}

export function SearchLable({ isNameAvaliable }: SearchLabelProps) {
  return <SearchLableText isNameAvaliable={isNameAvaliable}>{isNameAvaliable ? 'Avaliable' : 'Taken'}</SearchLableText>;
}

const SearchLableText = styled.div<{
  isNameAvaliable?: boolean;
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
  ${(props) => (props.isNameAvaliable ? 'color:#1DAF8390;' : 'color:#C52F1BE8;')}
  ${(props) =>
    props.isNameAvaliable ? 'background: rgba(231, 244, 239, 0.563468);' : 'background:rgba(249, 231, 231, 0.910379);'}
`;
