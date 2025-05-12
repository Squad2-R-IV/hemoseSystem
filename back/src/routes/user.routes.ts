import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers/UserController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, adminOnlyMiddleware } from "../middlewares/auth";
const router = Router();
const userController = container.resolve(UserController);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gerenciar usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do usuário
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           description: Nome do usuário
 *           example: "Maria Oliveira"
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: "maria.oliveira@email.com"
 *         cpf:
 *           type: string
 *           description: CPF do usuário
 *           example: "123.456.789-00"
 *         contato:
 *           type: string
 *           description: Contato do usuário
 *           example: "(81) 98765-4321"
 *         especialidade:
 *           type: string
 *           description: Especialidade do usuário
 *           example: "Cardiologia"
 *         conselho:
 *           type: string
 *           description: Conselho do usuário
 *           example: "CRM"
 *         registro:
 *           type: string
 *           description: Registro do usuário no conselho
 *           example: "123456"
 */

/**
 * @swagger
 * /users/medicos:
 *   get:
 *     summary: Retorna todos os usuários com a role "medico"
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de médicos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
    "/medicos",
    authMiddleware,
    asyncHandler(userController.getMedicos.bind(userController))
);

/**
 * @swagger
 * /users/gestores:
 *   get:
 *     summary: Retorna todos os usuários com a role "gestor"
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de gestores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
    "/gestores",
    authMiddleware,
    asyncHandler(userController.getGestores.bind(userController))
);

/**
 * @swagger
 * /users/enfermeiros:
 *   get:
 *     summary: Retorna todos os usuários com a role "enfermeiro"
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de enfermeiros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
    "/enfermeiros",
    authMiddleware,
    asyncHandler(userController.getEnfermeiros.bind(userController))
);

/**
 * @swagger
 * /users/recepcionistas:
 *   get:
 *     summary: Retorna todos os usuários com a role "recepcionista"
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de recepcionistas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
    "/recepcionistas",
    authMiddleware,
    asyncHandler(userController.getRecepcionistas.bind(userController))
);

/**
 * @swagger
 * /users/dentistas:
 *   get:
 *     summary: Retorna todos os usuários com a role "dentista"
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de dentistas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
    "/dentistas",
    authMiddleware,
    asyncHandler(userController.getDentistas.bind(userController))
);

/**
 * @swagger
 * /users/fisioterapeutas:
 *   get:
 *     summary: Retorna todos os usuários com a role "fisioterapeuta"
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de fisioterapeutas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
    "/fisioterapeutas",
    authMiddleware,
    asyncHandler(userController.getFisioterapeutas.bind(userController))
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *     security:
 *      - bearerAuth: []
 */
router.get(
    "/",
    asyncHandler(userController.getAll.bind(userController))
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, asyncHandler(userController.getById.bind(userController)));

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: "Maria Oliveira"
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: "maria.oliveira@email.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "senhaSegura123"
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *                 example: "123.456.789-00"
 *               contato:
 *                 type: string
 *                 description: Contato do usuário
 *                 example: "(81) 98765-4321"
 *               especialidade:
 *                 type: string
 *                 description: Especialidade do usuário
 *                 example: "Cardiologia"
 *               conselho:
 *                 type: string
 *                 description: Conselho do usuário
 *                 example: "CRM"
 *               registro:
 *                 type: string
 *                 description: Registro do usuário no conselho
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor
 */
router.post("/", asyncHandler(userController.create.bind(userController)));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: "Maria Oliveira"
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: "maria.oliveira@email.com"
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *                 example: "123.456.789-00"
 *               contato:
 *                 type: string
 *                 description: Contato do usuário
 *                 example: "(81) 98765-4321"
 *               especialidade:
 *                 type: string
 *                 description: Especialidade do usuário
 *                 example: "Cardiologia"
 *               conselho:
 *                 type: string
 *                 description: Conselho do usuário
 *                 example: "CRM"
 *               registro:
 *                 type: string
 *                 description: Registro do usuário no conselho
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, asyncHandler(userController.update.bind(userController)));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, adminOnlyMiddleware, asyncHandler(userController.delete.bind(userController)));

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Faz login de um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: "maria.oliveira@email.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "senhaSegura123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de acesso
 *                 refreshToken:
 *                   type: string
 *                   description: Token de atualização
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro no servidor
 */
router.post("/login", asyncHandler(userController.login.bind(userController)));

/**
 * @swagger
 * /users/refreshToken:
 *   post:
 *     summary: Gera um novo token de acesso usando o refresh token
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Novo token de acesso gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Novo token de acesso
 *                   example: "novoTokenDeAcesso"
 *                 refreshToken:
 *                   type: string
 *                   description: Novo refresh token
 *                   example: "novoRefreshToken"
 *       401:
 *         description: Refresh token não informado ou inválido
 *       403:
 *         description: Proibido
 *       500:
 *         description: Erro no servidor
 */
router.post("/refreshToken", asyncHandler(userController.handleRefreshToken.bind(userController)));

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Faz logout do usuário
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: Logout realizado com sucesso
 *       500:
 *         description: Erro no servidor
 *     security:
 *      - bearerAuth: []
 */
router.post("/logout",
    authMiddleware,
    asyncHandler(userController.logout.bind(userController))
);

/**
 * @swagger
 * /users/changeUserRoles:
 *   post:
 *     summary: Altera as roles de um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de roles do usuário
 *                 example: ["admin", "medico","enfermeiro","dentista"]
 *     responses:
 *       200:
 *         description: Roles atualizadas com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/changeUserRoles",
    authMiddleware,
    adminOnlyMiddleware,
    asyncHandler(userController.changeUserRoles.bind(userController))
);


export default router;