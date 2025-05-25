import { Router } from "express";
import { container } from "tsyringe";
import { PacienteController } from "../controllers/PacienteController";
import { asyncHandler } from "../middlewares/asyncHandler";
import { authMiddleware, checkPermission } from "../middlewares/auth";

const router = Router();
const pacienteController = container.resolve(PacienteController);

/**
 * @swagger
 * tags:
 *   name: Paciente
 *   description: Endpoints para gerenciar pacientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       required:
 *         - nome_paciente
 *         - dt_nascimento
 *         - sexo
 *         - estado_civil
 *         - endereco
 *         - cpf
 *         - cpf_acompanhante
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do paciente
 *           example: 1
 *         nome_paciente:
 *           type: string
 *           description: Nome do paciente
 *           example: "João da Silva"
 *         dt_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do paciente
 *           example: "1980-01-01"
 *         sexo:
 *           type: string
 *           enum: [M, F, O]
 *           description: "Sexo do paciente (M: Masculino, F: Feminino, O: Outro)"
 *           example: "M"
 *         estado_civil:
 *           type: string
 *           enum: [S, C, D, V]
 *           description: "Estado civil do paciente (S: Solteiro(a), C: Casado(a), D: Divorciado(a), V: Viúvo(a))"
 *           example: "C"
 *         raca:
 *           type: string
 *           enum: [P, O, B, A, I, N]
 *           description: "Raça/Cor do paciente (P: Preta, O: Parda, B: Branca, A: Amarela, I: Indígena, N: Não informada)"
 *           example: "B"
 *         naturalidade:
 *           type: string
 *           description: Naturalidade do paciente
 *           example: "Recife"
 *         nacionalidade:
 *           type: string
 *           description: Nacionalidade do paciente
 *           example: "Brasileira"
 *         nm_pai:
 *           type: string
 *           description: Nome do pai
 *           example: "José da Silva"
 *         nm_mae:
 *           type: string
 *           description: Nome da mãe
 *           example: "Maria da Silva"
 *         cpf:
 *           type: string
 *           description: CPF do paciente
 *           example: "12345678901"
 *         rg_num:
 *           type: string
 *           description: Número do RG
 *           example: "1234567"
 *         rg_org:
 *           type: string
 *           description: Órgão emissor do RG
 *           example: "SSP"
 *         cns:
 *           type: string
 *           description: Cartão Nacional de Saúde
 *           example: "123456789012345"
 *         dt_cadastro:
 *           type: string
 *           format: date-time
 *           description: Data de cadastro do paciente
 *           example: "2024-05-01T12:00:00Z"
 *         endereco:
 *           type: string
 *           description: Endereço do paciente
 *           example: "Rua das Flores"
 *         numero:
 *           type: string
 *           description: Número do endereço
 *           example: "123"
 *         bairro:
 *           type: string
 *           description: Bairro do paciente
 *           example: "Centro"
 *         cidade:
 *           type: string
 *           description: Cidade do paciente
 *           example: "Recife"
 *         uf:
 *           type: string
 *           description: UF do paciente
 *           example: "PE"
 *         cep:
 *           type: string
 *           description: CEP do paciente
 *           example: "50000000"
 *         celular_i:
 *           type: string
 *           description: Celular principal
 *           example: "(81)99999-9999"
 *         celular_ii:
 *           type: string
 *           description: Celular secundário
 *           example: "(81)98888-8888"
 *         email:
 *           type: string
 *           description: E-mail do paciente
 *           example: "joao@email.com"
 *         abo:
 *           type: string
 *           description: Tipo sanguíneo ABO
 *           example: "O+"
 *         tem_alergia:
 *           type: string
 *           description: Indica se o paciente tem alergia (Sim/Não)
 *           example: "Sim"
 *         qual_alergia:
 *           type: string
 *           description: Qual alergia o paciente possui
 *           example: "Dipirona"
 *         cpf_acompanhante:
 *           type: string
 *           description: CPF do acompanhante do paciente
 *           example: "10987654321"
 *         agendamentos:
 *           type: array
 *           description: Lista de agendamentos do paciente
 *           items:
 *             $ref: '#/components/schemas/Agendamento'
 */

/**
 * @swagger
 * /paciente/cpf/{cpf}:
 *   get:
 *     summary: Retorna um paciente pelo CPF
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         description: CPF do paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get(
    "/cpf/:cpf",
    authMiddleware,
    checkPermission("paciente_read"),
    asyncHandler(pacienteController.findPacienteByCpf.bind(pacienteController))
  );
/**
 * @swagger
 * /paciente:
 *   get:
 *     summary: Retorna todos os pacientes
 *     tags: [Paciente]
 *     parameters:
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Lista de pacientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, checkPermission("paciente_read"), asyncHandler(pacienteController.getAll.bind(pacienteController)));

/**
 * @swagger
 * /paciente/{id}:
 *   get:
 *     summary: Retorna um paciente pelo ID
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *       - in: query
 *         name: includeRelations
 *         schema:
 *           type: boolean
 *         description: Incluir relações no resultado
 *     responses:
 *       200:
 *         description: Paciente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, checkPermission("paciente_read"), asyncHandler(pacienteController.getById.bind(pacienteController)));

/**
 * @swagger
 * /paciente:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Paciente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome_paciente
 *               - dt_nascimento
 *               - sexo
 *               - estado_civil
 *               - endereco
 *               - cpf
 *               - cpf_acompanhante
 *             properties:
 *               nome_paciente:
 *                 type: string
 *                 example: "João da Silva"
 *               dt_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "1980-01-01"
 *               sexo:
 *                 type: string
 *                 enum: [M, F, O]
 *                 example: "M"
 *               estado_civil:
 *                 type: string
 *                 enum: [S, C, D, V]
 *                 example: "C"
 *               endereco:
 *                 type: string
 *                 example: "Rua das Flores, 123"
 *               cpf:
 *                 type: string
 *                 example: "12345678901"
 *               cpf_acompanhante:
 *                 type: string
 *                 example: "10987654321"
 *               raca:
 *                 type: string
 *                 enum: [P, O, B, A, I, N]
 *                 example: "B"
 *               naturalidade:
 *                 type: string
 *                 example: "Recife"
 *               nacionalidade:
 *                 type: string
 *                 example: "Brasileira"
 *               nm_pai:
 *                 type: string
 *                 example: "José da Silva"
 *               nm_mae:
 *                 type: string
 *                 example: "Maria da Silva"
 *               rg_num:
 *                 type: string
 *                 example: "1234567"
 *               rg_org:
 *                 type: string
 *                 example: "SSP"
 *               cns:
 *                 type: string
 *                 example: "123456789012345"
 *               dt_cadastro:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-05-01T12:00:00Z"
 *               numero:
 *                 type: string
 *                 example: "123"
 *               bairro:
 *                 type: string
 *                 example: "Centro"
 *               cidade:
 *                 type: string
 *                 example: "Recife"
 *               uf:
 *                 type: string
 *                 example: "PE"
 *               cep:
 *                 type: string
 *                 example: "50000000"
 *               celular_i:
 *                 type: string
 *                 example: "(81)99999-9999"
 *               celular_ii:
 *                 type: string
 *                 example: "(81)98888-8888"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               abo:
 *                 type: string
 *                 example: "O+"
 *               tem_alergia:
 *                 type: string
 *                 example: "Sim"
 *               qual_alergia:
 *                 type: string
 *                 example: "Dipirona"
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, checkPermission("paciente_create"), asyncHandler(pacienteController.create.bind(pacienteController)));

/**
 * @swagger
 * /paciente/{id}:
 *   put:
 *     summary: Atualiza um paciente existente
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome_paciente
 *               - dt_nascimento
 *               - sexo
 *               - estado_civil
 *               - endereco
 *               - cpf
 *               - cpf_acompanhante
 *             properties:
 *               nome_paciente:
 *                 type: string
 *                 example: "João da Silva"
 *               dt_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "1980-01-01"
 *               sexo:
 *                 type: string
 *                 enum: [M, F, O]
 *                 example: "M"
 *               estado_civil:
 *                 type: string
 *                 enum: [S, C, D, V]
 *                 example: "C"
 *               endereco:
 *                 type: string
 *                 example: "Rua das Flores, 123"
 *               cpf:
 *                 type: string
 *                 example: "12345678901"
 *               cpf_acompanhante:
 *                 type: string
 *                 example: "10987654321"
 *               raca:
 *                 type: string
 *                 enum: [P, O, B, A, I, N]
 *                 example: "B"
 *               naturalidade:
 *                 type: string
 *                 example: "Recife"
 *               nacionalidade:
 *                 type: string
 *                 example: "Brasileira"
 *               nm_pai:
 *                 type: string
 *                 example: "José da Silva"
 *               nm_mae:
 *                 type: string
 *                 example: "Maria da Silva"
 *               rg_num:
 *                 type: string
 *                 example: "1234567"
 *               rg_org:
 *                 type: string
 *                 example: "SSP"
 *               cns:
 *                 type: string
 *                 example: "123456789012345"
 *               dt_cadastro:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-05-01T12:00:00Z"
 *               numero:
 *                 type: string
 *                 example: "123"
 *               bairro:
 *                 type: string
 *                 example: "Centro"
 *               cidade:
 *                 type: string
 *                 example: "Recife"
 *               uf:
 *                 type: string
 *                 example: "PE"
 *               cep:
 *                 type: string
 *                 example: "50000000"
 *               celular_i:
 *                 type: string
 *                 example: "(81)99999-9999"
 *               celular_ii:
 *                 type: string
 *                 example: "(81)98888-8888"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               abo:
 *                 type: string
 *                 example: "O+"
 *               tem_alergia:
 *                 type: string
 *                 example: "Sim"
 *               qual_alergia:
 *                 type: string
 *                 example: "Dipirona"
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkPermission("paciente_update"), asyncHandler(pacienteController.update.bind(pacienteController)));

/**
 * @swagger
 * /paciente/{id}:
 *   delete:
 *     summary: Exclui um paciente pelo ID
 *     tags: [Paciente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       204:
 *         description: Paciente deletado com sucesso
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro no servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, checkPermission("paciente_delete"), asyncHandler(pacienteController.delete.bind(pacienteController)));


export default router;