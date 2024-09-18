import { Router } from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import { checkRole } from '../middleware/checkRole';
import {
  deleteInternship,
  getInternship,
  getInternships,
  postInternship,
  updateInternship,
} from '../controllers';
import { Role } from '../constants';

export const internRouter = Router();

/**
 * @openapi
 * /api/internships:
 *   get:
 *     summary: Retrieve all internships
 *     description: Retrieves a list of all internships. Requires user authentication.
 *     responses:
 *       200:
 *         description: Successfully retrieved internships
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 internships:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5ecf1c3d0d0f123456789"
 *                       title:
 *                         type: string
 *                         example: "Software Engineer Intern"
 *                       company:
 *                         type: string
 *                         example: "Tech Corp"
 *                       salary:
 *                         type: string
 *                         example: "2000 USD"
 *                       position:
 *                         type: string
 *                         example: "Intern"
 *                       qualification:
 *                         type: string
 *                         example: "Pursuing a degree in Computer Science"
 *                       deadline:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-31T23:59:59.000Z"
 *                       status:
 *                         type: string
 *                         example: "open"
 *                       department:
 *                         type: string
 *                         example: "Engineering"
 *                       createdBy:
 *                         type: string
 *                         example: "60d5ecf1c3d0d0f123456788"
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
internRouter.get('/', jwtAuth, getInternships);

/**
 * @openapi
 * /api/internships/{id}:
 *   get:
 *     summary: Retrieve a single internship by ID
 *     description: Retrieves details of a specific internship using its ID. Requires user authentication.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the internship to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved internship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 internship:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456789"
 *                     title:
 *                       type: string
 *                       example: "Software Engineer Intern"
 *                     company:
 *                       type: string
 *                       example: "Tech Corp"
 *                     salary:
 *                       type: string
 *                       example: "2000 USD"
 *                     position:
 *                       type: string
 *                       example: "Intern"
 *                     qualification:
 *                       type: string
 *                       example: "Pursuing a degree in Computer Science"
 *                     deadline:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-31T23:59:59.000Z"
 *                     status:
 *                       type: string
 *                       example: "open"
 *                     department:
 *                       type: string
 *                       example: "Engineering"
 *                     createdBy:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456788"
 *       404:
 *         description: Internship not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internship not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
internRouter.get('/:id', jwtAuth, getInternship);

/**
 * @openapi
 * /api/internships:
 *   post:
 *     summary: Create a new internship
 *     description: Creates a new internship. Requires user authentication and must be performed by a company role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Software Engineer Intern"
 *               company:
 *                 type: string
 *                 example: "Tech Corp"
 *               salary:
 *                 type: string
 *                 example: "2000 USD"
 *               position:
 *                 type: string
 *                 example: "Intern"
 *               qualification:
 *                 type: string
 *                 example: "Pursuing a degree in Computer Science"
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59.000Z"
 *               department:
 *                 type: string
 *                 example: "Engineering"
 *     responses:
 *       201:
 *         description: Internship created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 internship:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456789"
 *                     title:
 *                       type: string
 *                       example: "Software Engineer Intern"
 *                     company:
 *                       type: string
 *                       example: "Tech Corp"
 *                     salary:
 *                       type: string
 *                       example: "2000 USD"
 *                     position:
 *                       type: string
 *                       example: "Intern"
 *                     qualification:
 *                       type: string
 *                       example: "Pursuing a degree in Computer Science"
 *                     deadline:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-31T23:59:59.000Z"
 *                     status:
 *                       type: string
 *                       example: "open"
 *                     department:
 *                       type: string
 *                       example: "Engineering"
 *                     createdBy:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456788"
 *                 message:
 *                   type: string
 *                   example: "Internship created successfully"
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized, user not authenticated or insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not authorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
internRouter.post(
  '/',
  jwtAuth,
  checkRole(Role.COMPANY),
  postInternship
);

/**
 * @openapi
 * /api/internships/{id}:
 *   delete:
 *     summary: Delete an internship
 *     description: Deletes a specific internship by its ID. Requires user authentication and must be performed by a company role.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the internship to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Internship deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internship deleted successfully"
 *       401:
 *         description: Unauthorized, user does not have permission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Internship not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internship not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
internRouter.delete(
  '/:id',
  jwtAuth,
  checkRole(Role.COMPANY),
  deleteInternship
);

/**
 * @openapi
 * /api/internships/{id}:
 *   put:
 *     summary: Update an internship
 *     description: Updates a specific internship by its ID. Requires user authentication and must be performed by a company role.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the internship to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Software Engineer Intern"
 *               company:
 *                 type: string
 *                 example: "Tech Corp"
 *               salary:
 *                 type: string
 *                 example: "2000 USD"
 *               position:
 *                 type: string
 *                 example: "Intern"
 *               qualification:
 *                 type: string
 *                 example: "Pursuing a degree in Computer Science"
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59.000Z"
 *               department:
 *                 type: string
 *                 example: "Engineering"
 *     responses:
 *       200:
 *         description: Internship updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 internship:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456789"
 *                     title:
 *                       type: string
 *                       example: "Software Engineer Intern"
 *                     company:
 *                       type: string
 *                       example: "Tech Corp"
 *                     salary:
 *                       type: string
 *                       example: "2000 USD"
 *                     position:
 *                       type: string
 *                       example: "Intern"
 *                     qualification:
 *                       type: string
 *                       example: "Pursuing a degree in Computer Science"
 *                     deadline:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-31T23:59:59.000Z"
 *                     status:
 *                       type: string
 *                       example: "open"
 *                     department:
 *                       type: string
 *                       example: "Engineering"
 *                     createdBy:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456788"
 *                 message:
 *                   type: string
 *                   example: "Internship updated successfully"
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized, user does not have permission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Internship not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internship not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
internRouter.put(
  '/:id',
  jwtAuth,
  checkRole(Role.COMPANY),
  updateInternship
);
