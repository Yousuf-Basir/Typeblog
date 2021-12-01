export const listToTree = (paths: string[]) => {
    interface itemI {
        name: string,
        id: string,
        children: itemI[]
    }
    const result:itemI[] = []
    const levels = { result }

    paths.forEach(path => {
        let id = '';

        path.split('/').reduce((r:any, name, i, a) => {
            id += (id ? '/' : '') + name;

            if (!r[name]) {
                r[name] = { result: [] }
                r.result.push({ name, id, children: r[name].result })
            }

            return r[name]
        }, levels)
    })

    return result;
}