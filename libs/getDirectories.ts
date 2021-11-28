import path from "path";
import fs from "fs";
import glob from "glob";
import { contentDirectory } from "./appConfigs";

export const getDirectories = (src:string) => {
    const matchedDirs =  glob.sync(src + '/**/*/');
    return matchedDirs.map(dirFullPath => (
        path.relative(contentDirectory, dirFullPath)
    ))
}
