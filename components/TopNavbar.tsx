import React, { useEffect } from 'react'
import Link from "next/link";
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { listToTree } from '../libs/listToTree';

interface Props {
    paths: string[]
}

const TopNavbar = ({ paths }: Props) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">MarkdownBlog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            listToTree(paths).map(item => (
                                !item.children.length
                                    ? <Link href={"/category/" + item.id} key={item.id}>
                                        <Nav.Link href={"/category/" + item.id}>{item.name}</Nav.Link>
                                    </Link>
                                    : <NavDropdown title={item.name} key={item.id} id="basic-nav-dropdown">
                                        {
                                            item.children.map(childItem => (

                                                <Link href={"/category/" + childItem.id} key={childItem.id}>
                                                    <NavDropdown.Item href={"/category/" + childItem.id}>
                                                        {childItem.name}
                                                    </NavDropdown.Item>
                                                </Link>

                                            ))
                                        }
                                    </NavDropdown>
                            ))
                        }
                    </Nav>

                    <Nav>
                        <Nav.Link href="#">About us</Nav.Link>
                        <Nav.Link href="#">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}




export default TopNavbar



