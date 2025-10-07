module.exports = function createTree(arr, parentId = "") {
    const tree = [];

    arr.forEach((item) => {
        if (String(item.parent_id || "") === String(parentId || "")) {
            const newItem = item.toObject ? item.toObject() : item;
            const children = createTree(arr, item._id);

            if (children.length > 0) {
                newItem.children = children;
            }

            tree.push(newItem);
        }
    });

    return tree;
}
