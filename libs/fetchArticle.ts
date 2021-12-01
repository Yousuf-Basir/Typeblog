import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { contentDirectory } from "./appConfigs";

type articleContent = {
    data: {
      [key: string]: any;
    },
    content: string
  }

export interface articleI {
    error: boolean,
    data: {
        [key: string]: any;
    },
    content: string
}

const getArticle = async(articleSlug: string):Promise<articleContent> => {
    return (new Promise((resolve, reject) => {
        const filePath = path.join(contentDirectory, articleSlug);
        try{
          const mdFileContent = fs.readFileSync(filePath, "utf8");
          const { data, content } = matter(mdFileContent);
          resolve({ data, content });
        }catch(err){
          reject;
        }
      }))
}

export const fetchArticle = async (params: ParsedUrlQuery | undefined):Promise<articleI> => {
    if(params === undefined){ return({error: true, data: {}, content: ""}) }
    let slugArray:string[] = []
    if(params.slug && Array.isArray(params.slug)){
        slugArray = params.slug
    }else{
        return({error: true, data: {}, content: ""})
    }

    return getArticle(params.slug.join("/")).then(article => {
        return({
            error: false,
            data: article.data,
            content: article.content
        })
    }).catch(err => {
        return({error: true, data: {}, content: ""})
    })
}