import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { contentDirectory } from '../../libs/appConfigs';
import { getDirectories } from '../../libs/getDirectories';

interface Props {
    data: string
}

const Category = (props: Props) => {
    return (
        <div>
            <h1>{props.data}</h1>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    let directories = getDirectories(contentDirectory);
    console.log(directories)
    return {
        paths: directories.map(dirPath => (
            {params: { slug: [dirPath] }}
        )),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    return ({
        props: {
            data: params?params.slug:""
        }
    })
}

export default Category
