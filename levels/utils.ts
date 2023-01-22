export const parse = (map) => {
    let id = 1;

    return map.reduce((acc, row, y) => {
        return row ? row.reduce((acc, entry, x) => {
            return entry ? acc.concat({
                id: id++,
                position: { x, y },
                type: entry,
            }) : acc;
        }, acc) : acc;
    }, []);
};
