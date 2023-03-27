import { styled } from 'styled-components';

import { SearchInputRing, stateToColor } from './SearchInputRing';
import { SearchLable } from './SearchLable';
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
  const isNameAvaliable = isNameAvailable === true ? true : isNameAvailable === false ? false : undefined;
  return (
    <SearchGroup>
      <SearchInputRing isSearching={isSearching} isENSNameAvailable={isNameAvailable}>
        <SearchInput
          placeholder="Username.Ethbr.Co"
          value={value}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          isAvailable={isNameAvaliable}
        />
        {value.length !== 0 && (
          <SearchSuggestion>
            {value}
            <Placeholder placeholder=".Ethbr.co" disabled={true} />
          </SearchSuggestion>
        )}

        {isNameAvailable !== undefined && <SearchLable isNameAvaliable={isNameAvaliable} />}
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
     vertical-align: top;
    font-size: 20px;
    padding: 0px 40px;
    color: #bc96d0;
    font-family:Archivo;
    transition: all 0.2s ease-in-out;
  color:transperent;
  
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

    &::placeholder {
      color:#DCD7FE;
     }
  `
);

const SearchSuggestion = styled.div`
  color: transparent;
  display: flex;
  flex-flow: row nowrap;
  line-height: 3em;
  overflow: hidden;
  position: absolute;
  top: 2px;
  bottom: 0;
  left: 1px;
  right: 1em;
  padding: 0 0 0 1em;
  pointer-events: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  white-space: pre;
  font-size: 20px;
  font-weight: 500;
`;
const Placeholder = styled.input`
  background: 0 0;
  border-color: transparent;
  border-left: 0;

  height: 100%;
  padding: 0;
  vertical-align: top;
  width: 100%;

  opacity: 1;
  &::placeholder {
    font-weight: 500;
    font-size: 20px;

    color: #dcd7fe;
  }
`;
