const { models } = require('../database/index');

/**
 * Récupération d'un article par son id
 */
exports.getOne = async (req, res, next) => {
    try 
    {
        const userId     = req.params.id;
        const user       = await models.User.findByPk(userId);
        
        if (!user) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(user)    
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
        const users      = await models.User.findAll({offset, limit});
        
        if (!users) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(users)    
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
        const { firstname, lastname, email, password } = req.body;

        const user = await models.User.createOne({
            firstname, 
            lastname, 
            email, 
            password 
        });

        if (!user)
        {
            return res.status(400).res('Une erreur est survenu.');
        }

        res.status(201).json(user);
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
        const userId     = req.params.id;
        const user       = await models.User.findByPk(userId);
        
        if (!user) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        await user.update(req.body);
        await user.save();

        res.status(200).json(user)    
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