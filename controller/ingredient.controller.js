const { models } = require('../database/index');

/**
 * Récupération d'un ingrédient par son id
 */
exports.getOne = async (req, res, next) => {
    try 
    {
        const ingredientId     = req.params.id;
        const ingredient       = await models.Ingredient.findByPk(ingredientId);
        
        if (!ingredient) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(ingredient)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Récupération de tout les ingrédients
 */
exports.getAll = async (req, res, next) => {
    try 
    {
        const offset        = req.params.id ? req.params.offset  :  0;
        const limit         = req.params.id ? req.params.limit   :  10;
        const ingredients   = await models.Ingredient.findAll({offset, limit});
        
        if (!ingredients) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(ingredients)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Création d'un ingrédient **ADMIN**
 */
exports.createOne = async (req, res, next) => {
    try 
    {
        const { name, description } = req.body;

        const ingredient = await models.Ingredient.createOne({
            name, 
            description
        });

        if (!ingredient)
        {
            return res.status(400).res('Une erreur est survenu.');
        }

        res.status(201).json(ingredient);
    }
    catch(error)
    {
        next(error);
    }
}

/**
 * Modification d'un ingrédient **ADMIN**
 */
exports.udpateOne = async (req, res, next) => {
    try 
    {
        const ingredientId     = req.params.id;
        const ingredient       = await models.Ingredient.findByPk(ingredientId);
        
        if (!ingredient) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        await ingredient.udpate(req.body);
        await ingredient.save();

        res.status(200).json(ingredient)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Suppression d'un ingrédient **ADMIN**
 */
exports.deleteOne = async (req, res, next) => {
    try 
    {
        const ingredientId     = req.params.id;
        const ingredient       = await models.Ingredient.findByPk(ingredientId);
        
        if (!ingredient) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        await ingredient.destroy();

        res.status(200).json('Ingredient supprimé')    
    }
    catch (error)
    {
        next(error);
    }
}