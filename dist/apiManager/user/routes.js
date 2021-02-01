"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (_req, res) => {
    res.json({
        message: 'Mensaje desde el API',
    });
});
exports.default = router;
//# sourceMappingURL=routes.js.map