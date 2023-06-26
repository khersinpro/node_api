const { models } = require('../database/index');

/**
 * Récupération d'un article par son id
 */
exports.getOne = async (req, res, next) => {
    try 
    {
        const articleId     = req.params.id;
        const article       = await models.Article.findByPk(articleId);
        
        if (!article) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(article)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Récupération de tout les articles
 */
exports.getAll = async (req, res, next) => {
    try 
    {
        const offset     = req.params.id ? req.params.offset  :  0;
        const limit      = req.params.id ? req.params.limit   :  10;
        const articles   = await models.Article.findAll({offset, limit});
        
        if (!articles) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(articles)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Création d'un article **ADMIN**
 */
exports.createOne = async (req, res, next) => {
    try 
    {
        const {name, description, price} = req.body;

        const article = await models.Article.createOne({
            name,
            description,
            price
        });

        if (!article)
        {
            return res.status(400).res('Une erreur est survenu.');
        }

        res.status(201).json(article);
    }
    catch(error)
    {
        next(error);
    }
}

/**
 * Modification d'un article **ADMIN**
 */
exports.udpateOne = async (req, res, next) => {
    try 
    {
        const articleId     = req.params.id;
        const article       = await models.Article.findByPk(articleId);
        
        if (!article) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        await article.update(req.body);
        await article.save();

        res.status(200).json(article)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Suppression d'un article **ADMIN**
 */
exports.deleteOne = (req, res, next) => {

}