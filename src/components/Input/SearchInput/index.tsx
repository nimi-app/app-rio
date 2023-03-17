import { styled } from 'styled-components';

import { SearchInputRing, stateToColor } from './SearchInputRing';
import { SearchLable } from './SearchLable';
import SearchIcon from '../../../assets/svg/search.svg';

interface SearchProps {
  isSearching: boolean;
  isNameAvailable: boolean | undefined;
  isTooShort: boolean | undefined;
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOnFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleOnBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const SearchInputSelect = ({
  isSearching,
  isTooShort,
  isNameAvailable,
  value,
  handleOnChange,
  handleKeyDown,
  handleOnFocus,
  handleOnBlur,
}: SearchProps) => {
  const isNameAvaliable = isNameAvailable === true ? true : isNameAvailable === false ? false : undefined;
  return (
    <SearchGroup>
      <SearchInputRing isSearching={isSearching} isENSNameAvailable={isNameAvailable}>
        <SearchInput
          placeholder="Search for an ENS"
          value={value}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          isAvailable={isNameAvaliable}
        />
        {isNameAvailable === undefined ||
          (isTooShort === false && <SearchLable isTooShort={isTooShort} isNameAvaliable={isNameAvaliable} />)}
      </SearchInputRing>
    </SearchGroup>
  );
};

const SearchGroup = styled.div`
  position: relative;

  height: 74px;
  background: #fff;
  margin-top: 32px;
  margin-bottom: 61px;
  border-radius: 20px;
  color: #fff;
  & * {
    font-family: 'Archivo', sans-serif;
    width: 100%;
    height: 100%;
  }
`;

const SearchInput = styled.input<{
  isAvailable?: boolean;
}>(
  (props) => `
    background-color: #ffffff;
    font-weight: 500;
    font-size: 20px;
    padding: 0px 40px;
    color: #bc96d0;
    transition: all 0.2s ease-in-out;
    ${props.isAvailable === true ? `color: ${stateToColor.available.start};` : ''}
    ${props.isAvailable === false ? `color: ${stateToColor.notAvailable.start}` : ''}
    /** Add a gradiant to the placeholder text */
    &::placeholder {
     color:#DCD7FE
    }
  
    &,
    &:focus,
    &:active {
      border: none;
      outline: none;
      border-radius: 15px;
    }
    /* Add a search button */
    background-repeat: no-repeat;
    background-image: url(${SearchIcon});
    background-size: 20px 20px;
    background-position: 12px center;
    /** Hide the search icon when the input is not empty, is focused or active */
    &:focus,
    &:active,
    &:not(:placeholder-shown) {
      padding: 0px 20px;
      background-position: -20px center;
    }
  `
);
