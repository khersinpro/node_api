const jwt        = require('jsonwebtoken');
const { models } = require('../../database/index');
require('dotenv').config();

/**
 * Controle si l'utilisateur est connecté ou non
 */
exports.guard = (req, res, next) => {
    if (req.user) 
    {
        next();
    } else 
    {
        res.status(403).json('Vous n\'etes pas autorisé a aller sur cette page.');
    }
}

/**
 * Controle si l'utilisateur a le statut administrateur
 */
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role_name === "ROLE_ADMIN") 
    {
        next();
    } else 
    {
        res.status(403).json('Vous n\'etes pas autorisé a aller sur cette page.');
    }
}

/**
 * Retourne un nouveau jsonwebtoken
 */
exports.createJwtToken = (userId) => {
    return jwt.sign({
        userId: userId,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 14)
    }, process.env.JWT_PWD);
};

/**
 * Ajoute a la réponse un cookie jwt avec un jsonwebtoken et une expiration de 14 jours
 */
exports.sendJwtCookie = (token, res) => {
        return res.cookie('jwt', token, {
        httOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000
    });
};

/**
 * Controle l'expiration d'un token
 * Si le token est valid ou est expiré depuis moins de 24h, on retourne un token
 * Sinon on trhow une erreur
 */
exports.checkTokenExpiration = (token, response) => {
    const tokenExpiration       =   token.exp;                              
    const acutalDateInSeconds   =   Math.floor(Date.now() / 1000);     

    if (acutalDateInSeconds <= tokenExpiration) 
    {                              
        return token;
    } 
    else if (acutalDateInSeconds > tokenExpiration && ((acutalDateInSeconds - tokenExpiration) < 60 * 60 * 24) ) 
    { 
        const refreshedToken      =   createJwtToken(token.userId);
        this.sendJwtCookie(refreshedToken, response);
        return jwt.verify(refreshedToken, process.env.JWT_PWD)
    } 
    else 
    {                                                                
      throw new Error('Le token est expiré');
    }
};

/**
 * Extrait l'utilisateur du cookie 'jwt' grace a son userId puis place l'objet utilisateur dans la requête
 */
exports.extractUserFromToken = async (req, res, next) => {
    try 
    {
        const token = req.cookies.jwt;
    
        if (!token || token === undefined || token === null) 
        { 
            return next(); 
        };
    
        let decodedToken    =   jwt.verify(token, process.env.JWT_PWD, { ignoreExpiration: true }); 
        decodedToken        =   this.checkTokenExpiration(decodedToken, res); 
        const user          =   await models.User.findByPk(decodedToken.userId, {
            attributes: ['id', 'firstName', 'lastName', 'email', 'role_name'],
            // include: [
            //     {
            //         model: models.Roles,
            //         attributes: ['name'],
            //         // as: 'role',
            //     }   
            // ] 
        });

        console.log(user);
        if (user) 
        {
            req.user = user;
            next();
        } 
        else
        {
            throw new Error('Le Token n\'est pas valide.')
        } 
    }
    catch(error)
    {
        res.clearCookie('jwt');
        next(error);
    }
};