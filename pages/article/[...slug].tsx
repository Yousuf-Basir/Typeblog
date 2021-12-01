import React from 'react';
import { contentDirectory } from '../../libs/appConfigs';
import { getDirectories } from '../../libs/getDirectories';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getMdFiles } from '../../libs/getMdFiles';
import { articleI, fetchArticle } from '../../libs/fetchArticle';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import dateFormat from "dateformat";


interface Props {
    categories: string[],
    title: string,
    date: string,
    cover: string
    contentMdx: any
}


const Article = ({ categories, title, date, cover, contentMdx }: Props) => {
    return (
        <Layout categoryPaths={categories}>
            <div>
                <h1>{title}</h1>
                <small className="text-muted date-text">
                    {dateFormat(date, "dddd, mmmm dS, yyyy")}
                </small>
                <div>
                    <MDXRemote {...contentMdx} />
                </div>
            </div>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    let mdFiles = getMdFiles(contentDirectory);
    return {
        paths: mdFiles.map((filePath) => (
            { params: { slug: [filePath] } }
        )),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const categories = getDirectories(contentDirectory);
    const article = await fetchArticle(params);
    const msxSource = await serialize(article.content);
    return ({
        props: {
            categories: categories,
            title: article.data.title,
            date: article.data.date,
            cover: article.data.cover,
            contentMdx: msxSource
        }
    })
}

export default Article
