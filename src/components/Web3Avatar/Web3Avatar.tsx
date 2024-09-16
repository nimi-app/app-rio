import { useState } from 'react';
import { styled } from 'styled-components';

export const StyledWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 24px;
  width: 24px;
  min-width: 24px;
  border-radius: 50%;
`;

const StyledAvatarPlaceholder = styled.div`
  border: 2px solid #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

interface ENSAvatarProps {
  url?: string;
  alt?: string;
}

export function Web3Avatar({ url, alt }: ENSAvatarProps) {
  const [loading, setLoading] = useState(true);

  if (url) {
    const prependedImage = new Image(1, 1);
    prependedImage.src = url;
    prependedImage.onload = () => {
      setLoading(false);
    };
  }

  return <StyledWrapper>{!loading ? <StyledImage src={url} alt={alt} /> : <StyledAvatarPlaceholder />}</StyledWrapper>;
}
