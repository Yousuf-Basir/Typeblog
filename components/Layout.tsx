import React, { ReactElement } from 'react'
import Navbar from './Navbar'

interface Props {
    children: ReactElement,
    categoryPaths: string[]
}

const Layout = ({children, categoryPaths}: Props) => {
    return (
        <div>
            <Navbar categoryPaths={categoryPaths} />
            {children}
        </div>
    )
}

export default Layout
