module.exports.createPost =  (req, res,next) => {
    if(!req.body.title) {
        req.flash('error','Tiêu đề sản phẩm không được để trống');
        const referer = req.get('referer')
        res.redirect(referer);
        return;
    }
    next();
}