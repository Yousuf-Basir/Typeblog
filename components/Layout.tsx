import React, { ReactElement } from 'react'
import TopNavbar from './TopNavbar'

interface Props {
    children: ReactElement,
    categoryPaths: string[]
}

const Layout = ({children, categoryPaths}: Props) => {
    return (
        <div>
            <TopNavbar paths={categoryPaths} />
            {children}
        </div>
    )
}

export default Layout
