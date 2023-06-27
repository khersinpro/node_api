const { models } = require('../database/index');

/**
 * Récupération d'un role par son nom 
 */
exports.getOne = async (req, res, next) => {
    try 
    {
        const roleName     = req.params.id;
        const role         = await models.Roles.findByPk(roleName);
        
        if (!role) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(role)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Récupération de tout les roles **ADMIN**
 */
exports.getAll = async (req, res, next) => {
    try 
    {
        const offset     = req.params.id ? req.params.offset  :  0;
        const limit      = req.params.id ? req.params.limit   :  10;
        const roles      = await models.Roles.findAll({offset, limit});
        
        if (!roles) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(roles)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Création d'un role **ADMIN**
 */
exports.createOne = async (req, res, next) => {
    try 
    {
        const { name, description } = req.body;

        const role = await models.Roles.create({
            name, 
            description
        });

        if (!role)
        {
            return res.status(400).res('Une erreur est survenu.');
        }

        res.status(201).json(role);
    }
    catch(error)
    {
        next(error);
    }
}

/**
 * Modification d'un role **ADMIN**
 */
exports.udpateOne = async (req, res, next) => {
    try 
    {
        const roleName     = req.params.id;
        const role         = await models.Roles.findByPk(roleName);
        
        if (!role) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        await role.update(req.body);
        await role.save();

        res.status(200).json(role)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Suppression d'un role **ADMIN**
 */
exports.deleteOne = async (req, res, next) => {
    try 
    {
        const roleName     = req.params.id;
        const role         = await models.Roles.findByPk(roleName);
        
        if (!role) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        await role.destroy();

        res.status(200).json('Role supprimé');    
    }
    catch (error)
    {
        next(error);
    }
}