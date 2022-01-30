import type { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
      <>
    <Title>T04435.dev</Title>
  <Link href={'/tools/QR'}>
    <a href="">QR</a>
  </Link>
      </>
  )
}

const Title = styled.h1`
  color: ${(props) => props.theme.palette.primary};
`;

export default Home
