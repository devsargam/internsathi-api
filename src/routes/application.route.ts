import { Router } from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  deleteApplication,
  getApplication,
  getApplications,
  postApplication,
} from '../controllers';

export const applicationRouter = Router();

/**
 * @openapi
 * /api/applications:
 *   get:
 *     summary: Retrieve all applications or applications by internship ID
 *     description: Retrieves a list of applications. Can filter by internship ID if provided.
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Optional internship ID to filter applications
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5ecf1c3d0d0f123456789"
 *                       internshipId:
 *                         type: string
 *                         example: "60d5ecf1c3d0d0f123456788"
 *                       userId:
 *                         type: string
 *                         example: "60d5ecf1c3d0d0f123456787"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       applicantName:
 *                         type: string
 *                         example: "John Doe"
 *       400:
 *         description: Bad request, missing internship ID or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing internship id"
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
applicationRouter.get('/', getApplications);

/**
 * @openapi
 * /api/applications/{id}:
 *   get:
 *     summary: Retrieve a single application by ID
 *     description: Retrieves details of a specific application using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the application to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved application
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 application:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456789"
 *                     internshipId:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456788"
 *                     userId:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456787"
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     applicantName:
 *                       type: string
 *                       example: "John Doe"
 *       404:
 *         description: Application not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Application not found"
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
applicationRouter.get('/:id', getApplication);

/**
 * @openapi
 * /api/applications:
 *   post:
 *     summary: Create a new application
 *     description: Creates a new application for an internship. Requires user authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               internshipId:
 *                 type: string
 *                 example: "60d5ecf1c3d0d0f123456788"
 *               applicantName:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Application created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 application:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456789"
 *                     internshipId:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456788"
 *                     userId:
 *                       type: string
 *                       example: "60d5ecf1c3d0d0f123456787"
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     applicantName:
 *                       type: string
 *                       example: "John Doe"
 *                 message:
 *                   type: string
 *                   example: "Application created successfully"
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
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
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
applicationRouter.post('/', jwtAuth, postApplication);

/**
 * @openapi
 * /api/applications/{id}:
 *   delete:
 *     summary: Delete an application
 *     description: Deletes a specific application by its ID. Requires user authentication and ownership verification.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the application to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application deleted successfully"
 *       401:
 *         description: Unauthorized, user does not have permission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No permission to delete this application"
 *       404:
 *         description: Application not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Application not found"
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
applicationRouter.delete('/:id', jwtAuth, deleteApplication);
