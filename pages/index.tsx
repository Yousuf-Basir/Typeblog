import type { GetStaticProps, NextPage } from 'next'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import { contentDirectory } from '../libs/appConfigs'
import { getDirectories } from '../libs/getDirectories'

interface Props {
  categories: string[]
}
const Home: NextPage<Props> = ({categories}: Props) => {
  return (
    <Layout categoryPaths={categories}>
      <h1>Hello</h1>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const categories = getDirectories(contentDirectory);
  return({
    props: {categories: categories}
  })
}

export default Home
