import React, { useEffect } from 'react'
import Link from "next/link";
import { listToTree } from '../libs/listToTree';

interface Props {
    categoryPaths: string[]
}

interface itemI {
    text: string,
    children?: itemI[]
}

const Navbar = ({ categoryPaths }: Props) => {
    const data = listToTree(categoryPaths);
    return (
        <div>
            {data.map((item:itemI, index:number) => <LinkItem key={index} {...item} />)}
        </div>
    )
}


const LinkItem = (tree:itemI) => {
    const {text, children} = tree;
    return(
        <div>
            <p>{text} {children?"->":""}</p>
            <div style={{marginLeft: "45px"}}>
                {children && children.map((tree, i) => (
                    <LinkItem key={i} {...tree} />
                ))}
            </div>
        </div>
    )
}

export default Navbar


{/* <li key={categoryPath}>
    <Link href={"/category/" + categoryPath}>
        <a>{categoryPath}</a>
    </Link>
</li> */}
