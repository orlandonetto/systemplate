const router = require('express').Router();
const controller = require('../controllers/account-controller');
const policy = require('../middlewares/account/policy');

router.post('/sign-up', policy.signUp, controller.signUp);
router.post('/sign-in', policy.signIn, controller.signIn);
router.post('/sign-out', policy.authenticated, controller.signOut);
router.post('/refresh-token', policy.refresh, controller.refresh);
router.post('/confirm/email', policy.confirmation, controller.confirmEmail);
router.get('/me', policy.authenticated, controller.getAuthenticatedAccount);

module.exports = router;