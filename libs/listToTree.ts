export const listToTree = (files: any[]) => {
    return (
        files.map(file => file.split('/'))
            .reduce((out, path) => {
                let top = out;
                while (path.length > 0) {
                    let node = path.shift();
                    if (top.findIndex((n: any) => n.text === node) === -1) {
                        top.push({
                            text: node
                        });
                    }

                    if (path.length > 0) {
                        let index = top.findIndex((n: any) => n.text === node);
                        top[index] = top[index] || {};
                        top[index].children = top[index].children || [];
                        top[index].children.push({
                            text: path[0]
                        });
                        top = top[index].children;
                    }
                }
                return out;
            }, [])
    )
}