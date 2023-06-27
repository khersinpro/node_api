const { models } = require('../database/index');

/**
 * Récupération d'un bon de commande par son id 
 */
exports.getOne = async (req, res, next) => {
    try 
    {
        const purchaseorderId     = req.params.id;
        const purchaseorder       = await models.Purchaseorder.findByPk(purchaseorderId);
        
        if (!purchaseorder) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(purchaseorder)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Récupération de tout les bon de commandes **ADMIN**
 */
exports.getAll = async (req, res, next) => {
    try 
    {
        const offset            = req.params.id ? req.params.offset  :  0;
        const limit             = req.params.id ? req.params.limit   :  10;
        const purchaseorders    = await models.Purchaseorder.findAll({offset, limit});
        
        if (!purchaseorders) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(purchaseorders)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Création d'un bon de commande **ADMIN**
 */
exports.createOne = async (req, res, next) => {
    try 
    {
        const { price, user_id } = req.body;

        const purchaseorder = await models.Purchaseorder.createOne({
            price,
            user_id
        });

        if (!purchaseorder)
        {
            return res.status(400).res('Une erreur est survenu.');
        }

        res.status(201).json(purchaseorder);
    }
    catch(error)
    {
        next(error);
    }
}

/**
 * Modification d'un bon de commande **ADMIN**
 */
exports.udpateOne = async (req, res, next) => {
    try 
    {
        const purchaseorderId     = req.params.id;
        const purchaseorder       = await models.Purchaseorder.findByPk(purchaseorderId);
        
        if (!purchaseorder) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        await purchaseorder.udpate(req.body);
        await purchaseorder.save();

        res.status(200).json(purchaseorder)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Suppression d'un bon de commande **ADMIN**
 */
exports.deleteOne = async (req, res, next) => {
    try 
    {
        const purchaseorderId     = req.params.id;
        const purchaseorder       = await models.Purchaseorder.findByPk(purchaseorderId);
        
        if (!purchaseorder) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        await purchaseorder.destroy();
        
        res.status(200).json("Bon de commande supprimé")    
    }
    catch (error)
    {
        next(error);
    }
}