module.exports = async (objectPagination,query,countProduct) => {
    if(query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    const totalPage = Math.ceil(countProduct/objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    console.log(totalPage);
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    return objectPagination;
}