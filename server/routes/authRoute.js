import express from "express";
import {
    loginController,
    testController,
    registerController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController
} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

//routing
//REGISTER || POST method
router.post('/register', registerController);

//LOGIN || POST method
router.post('/login', loginController)


//FORGOT password || POST
router.post("/forgot-password", forgotPasswordController)

//test routes
router.get('/test', requireSignIn, isAdmin, testController);


//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})


//protected auth route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})


router.put('/profile', requireSignIn, updateProfileController)

router.get('/orders', requireSignIn, getOrdersController)

router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)
export default router;