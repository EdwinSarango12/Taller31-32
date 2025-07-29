import {Router} from 'express'
import { eliminartratamiento, listartratamiento, pagarTratamiento, registrarTratamiento } from '../controllers/tratamiento_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'
const router = Router()


router.post('/tratamiento/registro', verificarTokenJWT,registrarTratamiento)
router.get('/tratamientos', verificarTokenJWT,listartratamiento)
router.delete('/tratamiento/:id', verificarTokenJWT,eliminartratamiento)
router.post('/tratamiento/pago', verificarTokenJWT, pagarTratamiento)



export default router
