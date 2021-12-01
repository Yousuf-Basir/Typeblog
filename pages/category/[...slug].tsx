import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { contentDirectory } from '../../libs/appConfigs';
import { getDirectories } from '../../libs/getDirectories';
import Layout from '../../components/Layout';
import { fetchArticleList } from '../../libs/fetchArticleList';
import { Card, Col, Row, Button, Container } from 'react-bootstrap';
import dateFormat from "dateformat";
import Link from "next/link";


interface article {
    data: {
        title: string,
        fileName: string,
        date: number,
        cover: string,
        shortDescription: string
    }
}
interface Props {
    categories: string[],
    slug: string,
    articleList: string
}

const Category = ({ categories, slug, articleList }: Props) => {
    const articles = JSON.parse(articleList);
    return (
        <Layout categoryPaths={categories}>
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={10}>
                        <Row xs={1} md={2} className="g-4">
                            {
                                articles.map((article: article) => (
                                    <Col key={article.data.date}>
                                        <Card>
                                            <Card.Img variant="top" src={article.data.cover} />
                                            <Card.Body>
                                                <small className="text-muted date-text">
                                                    {dateFormat(article.data.date, "dddd, mmmm dS, yyyy")}
                                                </small>
                                                <Card.Title>{article.data.title}</Card.Title>
                                                <Card.Text>
                                                    {article.data.shortDescription}
                                                </Card.Text>


                                                <Link href={"/article/" + slug + "/" + article.data.fileName}>
                                                    <a>Read more</a>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    let directories = getDirectories(contentDirectory);
    console.log(directories)
    return {
        paths: directories.map(dirPath => (
            { params: { slug: [dirPath] } }
        )),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const categories = getDirectories(contentDirectory);
    const articleList = await fetchArticleList(params);
    return ({
        props: {
            slug: params && params.slug && Array.isArray(params.slug) ? params.slug.join("/") : "",
            categories: categories,
            articleList: JSON.stringify(articleList)
        }
    })
}

export default Category
