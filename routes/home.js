const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.send("Homepage")
    } catch (err) {
        return({ message: err})
    }
})

module.exports = router;