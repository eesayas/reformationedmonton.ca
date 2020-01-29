const title = 'Reformation Baptist Church of Edmonton';

module.exports = {
    indexPage(req, res, next){
        res.render('index', { title });
    },

    aboutPage(req, res, next){
        res.render('about', { title });
    },

    contactPage(req, res, next){
        res.render('contact', { title });
    },

    visitPage(req, res, next){
        res.render('visit', { title });
    }
}