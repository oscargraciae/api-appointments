"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    return next();
};
//# sourceMappingURL=isAuth.js.map