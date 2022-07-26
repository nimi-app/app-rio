import styled from 'styled-components';

const gap = 28;
export const FormWrapper = styled.form`
  display: flex;
  gap: ${gap}px;
  flex-wrap: wrap;
`;
export const FormGroup = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
`;
export const LinkFormGroup = styled.div`
  width: calc(50% - ${gap / 2}px);
  display: flex;
  flex-direction: column;
`;
