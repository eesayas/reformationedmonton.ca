const title = 'Reformation Baptist Church of Edmonton';

module.exports = {
    newLog(req, res, next){
        res.render('visitors-log/new', { title });
    }
}