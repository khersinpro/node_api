const { models } = require('../database/index');

/**
 * Récupération d'une commande par son id
 */
exports.getOne = async (req, res, next) => {
    try 
    {
        const orderId     = req.params.id;
        const order       = await models.Order.findByPk(orderId);
        
        if (!order) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(order)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Récupération de tout les commandes
 */
exports.getAll = async (req, res, next) => {
    try 
    {
        const offset     = req.params.id ? req.params.offset  :  0;
        const limit      = req.params.id ? req.params.limit   :  10;
        const orders     = await models.Order.findAll({offset, limit});
        
        if (!orders) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        res.status(200).json(orders)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Création d'une commande **ADMIN**
 */
exports.createOne = async (req, res, next) => {
    try 
    {
        const { nb_articles, article_id, purchaseoder_id } = req.body;

        const purchaseorder = await models.Purchaseorder.createOne({
            nb_articles, 
            article_id, 
            purchaseoder_id
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
 * Modification d'une commande **ADMIN**
 */
exports.udpateOne = async (req, res, next) => {
    try 
    {
        const orderId     = req.params.id;
        const order       = await models.Order.findByPk(orderId);
        
        if (!order) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        await order.udpate(req.body);
        await order.save();

        res.status(200).json(order)    
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Suppression d'une commande **ADMIN**
 */
exports.deleteOne = (req, res, next) => {

}