import React from 'react';
import { contentDirectory } from '../../libs/appConfigs';
import { getDirectories } from '../../libs/getDirectories';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getMdFiles } from '../../libs/getMdFiles';

interface Props {
    categories: string[],
    data: string
}

const Article = ({categories, data}: Props) => {
    return (
        <Layout categoryPaths={categories}>
            <h1>{data}</h1>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    let mdFiles = getMdFiles(contentDirectory);
    console.log(mdFiles)
    return {
        paths: mdFiles.map((filePath)=>(
            {params: { slug: [filePath] }}
        )),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const categories = getDirectories(contentDirectory);
    return ({
        props: {
            categories: categories,
            data: params?params.slug:""
        }
    })
}

export default Article
