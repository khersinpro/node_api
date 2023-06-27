const { models } = require('../database/index');
const {createJwtToken, sendJwtCookie}    = require('../middleware/auth/auth');

/**
 * Récupération d'un utilisateur par son id
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
 * Récupération de tout les utilisateurs
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
 * Création d'un utilisateur **ADMIN**
 */
exports.signup = async (req, res, next) => {
    try 
    {
        console.log(req.body);
        const { firstName, lastName, email, password } = req.body;

        const user = await models.User.create({
            firstName, 
            lastName, 
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
 * Connexion d'un utilisateur 
 */
exports.signin = async (req, res, next) => {
    try 
    {
        const { email, password } = req.body;

        const user = await models.User.findOne({where: {email: email}});

        if (!user)
        {
            return res.status(400).res('Une erreur est survenu.');
        }

        if (!user.checkPassword(password))
        {
            res.status(403).json('Mot de passe incorrect');
        }

        const token = createJwtToken(user.id);
        sendJwtCookie(token, res);

        res.status(201).json(user);
    }
    catch(error)
    {
        next(error);
    }
}

/**
 * Modification d'un utilisateur 
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

        res.status(200).json(user);   
    }
    catch (error)
    {
        next(error);
    }
}

/**
 * Suppression d'un utilisateur **ADMIN**
 */
exports.deleteOne = async (req, res, next) => {
    try 
    {
        const userId     = req.params.id;
        const user       = await models.User.findByPk(userId);
        
        if (!user) 
        {
            return res.status(404).json('Aucun resultat.');
        }

        await user.destroy();

        res.status(200).json('Utilisateur supprimé');    
    }
    catch (error)
    {
        next(error);
    }
}