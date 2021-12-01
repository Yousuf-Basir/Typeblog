import path from "path";
import fs from "fs";
import fg from "fast-glob";
import { contentDirectory } from "./appConfigs";

export const getDirectories = (src:string) => {
    const matchedDirs =  fg.sync(src + '/**/*', {onlyDirectories: true, deep: 2});
    
    return matchedDirs.map(dirFullPath => (
        path.relative(contentDirectory, dirFullPath)
    ))
}


