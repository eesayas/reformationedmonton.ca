const title = 'Reformation Baptist Church of Edmonton';

module.exports = {
    indexSermons(req, res, next){
        res.render('sermons/index', { title });
    },

    showSermon(req, res, next){
        res.render('sermons/show', { title });
    }
}