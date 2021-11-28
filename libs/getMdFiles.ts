import path from "path";
import fs from "fs";
import glob from "glob";
import { contentDirectory } from "./appConfigs";

export const getMdFiles = (src:string) => {
    const matchedDirs =  glob.sync(src + '/**/*.md');
    return matchedDirs.map(dirFullPath => (
        path.relative(contentDirectory, dirFullPath)
    ))
}
