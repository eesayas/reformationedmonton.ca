const title = 'Reformation Baptist Church of Edmonton';

module.exports = {
    indexEvents(req, res, next){
        res.render('events/index', {title});
    },

    showEvent(req, res, next){
        console.log('hello');
        res.render('events/show', {title});
    }
}