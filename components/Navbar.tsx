import React from 'react'
import Link from "next/link";

interface Props {
    categoryPaths: string[]
}

const Navbar = ({ categoryPaths }: Props) => {
    return (
        <div>
            <ul>
                {
                    categoryPaths.map(categoryPath => (
                        <li>
                            <Link href={"/category/" + categoryPath}>
                                <a>{categoryPath}</a>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Navbar
