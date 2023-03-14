import { styled } from 'styled-components';

import { SearchInputRing, stateToColor } from './SearchInputRing';
import SearchIcon from '../../../assets/svg/search.svg';

interface SearchProps {
  isSearching: boolean;
  isNameAvailable: boolean | undefined;
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOnFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleOnBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const SearchInputSelect = ({
  isSearching,
  isNameAvailable,
  value,
  handleOnChange,
  handleKeyDown,
  handleOnFocus,
  handleOnBlur,
}: SearchProps) => {
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
          isAvailable={isNameAvailable === true ? true : isNameAvailable === false ? false : undefined}
        />
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
    ::placeholder {
      background: linear-gradient(101.14deg, #7e7ddf -1.8%, #bc96d0 73.16%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
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
