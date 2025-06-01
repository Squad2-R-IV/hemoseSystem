import { Router } from "express";
import { container } from "tsyringe";
import { UserToRoleController } from "../controllers/UserToRoleController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const userToRoleController = container.resolve(UserToRoleController);

/**
 * @swagger
 * tags:
 *   name: UserToRole
 *   description: Endpoints para gerenciar associações entre usuários e roles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserToRole:
 *       type: object
 *       required:
 *         - userId
 *         - roleId
 *       properties:
 *         userId:
 *           type: string
 *           description: ID do usuário
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         roleId:
 *           type: string
 *           description: ID do role
 *           example: "550e8400-e29b-41d4-a716-446655440001"
 */

/**
 * @swagger
 * /user-to-role:
 *   get:
 *     summary: Retorna todas as associações usuário-role
 *     tags: [UserToRole]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de associações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserToRole'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("user_role_read"), asyncHandler(userToRoleController.getAll.bind(userToRoleController)));

/**
 * @swagger
 * /user-to-role/roles:
 *   get:
 *     summary: Retorna todos os roles de um usuário específico
 *     tags: [UserToRole]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de roles retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserToRole'
 *       404:
 *         description: Nenhum role encontrado para o usuário
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/roles",
  authMiddleware,
  checkPermission("user_role_read"),
  asyncHandler(userToRoleController.getRolesByUserId.bind(userToRoleController))
);

/**
 * @swagger
 * /user-to-role/users:
 *   get:
 *     summary: Retorna todos os usuários de um role específico
 *     tags: [UserToRole]
 *     parameters:
 *       - in: query
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do role
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserToRole'
 *       404:
 *         description: Nenhum usuário encontrado para o role
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/users",
  authMiddleware,
  checkPermission("user_role_read"),
  asyncHandler(userToRoleController.getUsersByRoleId.bind(userToRoleController))
);

/**
 * @swagger
 * /user-to-role:
 *   post:
 *     summary: Cria uma nova associação usuário-role
 *     tags: [UserToRole]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               roleId:
 *                 type: string
 *                 example: "550e8400-e29b-41d4-a716-446655440001"
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserToRole'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("user_role_create"), asyncHandler(userToRoleController.create.bind(userToRoleController)));

/**
 * @swagger
 * /user-to-role/{userId}/{roleId}:
 *   delete:
 *     summary: Exclui uma associação usuário-role
 *     tags: [UserToRole]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do role
 *     responses:
 *       204:
 *         description: Associação deletada com sucesso
 *       404:
 *         description: Associação não encontrada
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:userId/:roleId", authMiddleware, checkPermission("user_role_delete"), asyncHandler(userToRoleController.delete.bind(userToRoleController)));

export default router;
