import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { contentDirectory } from "./appConfigs";
import { getMdFiles } from "./getMdFiles";

export interface articleMetaDataI {
    data: {
        [key: string]: any;
    }
}

const compareDate = (a:articleMetaDataI, b:articleMetaDataI) => {
    if(a.data.date < b.data.date){ return -1 }
    if(a.data.date > b.data.date){ return 1 }
    return 0;
}


const getArticle = async (articleSlug: string): Promise<articleMetaDataI> => {
    const filePath = path.join(contentDirectory, articleSlug);
    return (new Promise((resolve, reject) => {
        try {
            const mdFileContent = fs.readFileSync(filePath, "utf8");
            const { data } = matter(mdFileContent);
            resolve({ data });
        } catch (err) {
            reject;
        }
    }))
}

export const fetchArticleList = async (params: ParsedUrlQuery | undefined): Promise<articleMetaDataI[]> => {
    if (params === undefined) { return ([]) }
    let slugArray: string[] = []
    if (params.slug && Array.isArray(params.slug)) {
        slugArray = params.slug
    } else {
        return ([])
    }

    let mdFileList = getMdFiles(path.join(contentDirectory, params.slug.join("/")))


    let articleList: articleMetaDataI[] = await Promise.all(mdFileList.map(async (filePath) => (
        getArticle(filePath).then(article => ({
            data: article.data,
        }))
    ))).then(contents => contents);

    
    return articleList.sort(compareDate);
}