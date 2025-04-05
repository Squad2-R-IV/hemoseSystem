import { Router } from "express";
import { container } from "tsyringe";
import { CondutaController } from "../controllers/CondutaController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const condutaController = container.resolve(CondutaController);

/**
 * @swagger
 * tags:
 *   name: Conduta
 *   description: Endpoints para gerenciar condutas médicas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Conduta:
 *       type: object
 *       required:
 *         - id_prescricao
 *         - id_funcionario
 *         - conduta
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da conduta
 *         id_prescricao:
 *           type: integer
 *           description: ID da prescrição relacionada
 *         id_funcionario:
 *           type: string
 *           description: ID do funcionário que registrou a conduta
 *         dt_conduta:
 *           type: string
 *           format: date-time
 *           description: Data e hora da conduta
 *         conduta:
 *           type: string
 *           description: Descrição da conduta médica
 */

router.get("/", authMiddleware, checkPermission("conduta_read"), asyncHandler(condutaController.getAll.bind(condutaController)));
router.get("/:id", authMiddleware, checkPermission("conduta_read"), asyncHandler(condutaController.getById.bind(condutaController)));
router.post("/", authMiddleware, checkPermission("conduta_create"), asyncHandler(condutaController.create.bind(condutaController)));
router.put("/:id", authMiddleware, checkPermission("conduta_update"), asyncHandler(condutaController.update.bind(condutaController)));
router.delete("/:id", authMiddleware, checkPermission("conduta_delete"), asyncHandler(condutaController.delete.bind(condutaController)));

export default router;
