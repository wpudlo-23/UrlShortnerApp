import * as React from 'react';
import { Navbar, Container } from 'react-bootstrap';

interface IHeaderProps {
    title: string
}

const Header: React.FunctionComponent<IHeaderProps> = ({title}) => {
    return (
        <Navbar expand="lg" variant="dark" bg="dark">
            <Container>
                <Navbar.Brand href="#">{ title }</Navbar.Brand>
            </Container>
        </Navbar>
  );
};

export default Header;
