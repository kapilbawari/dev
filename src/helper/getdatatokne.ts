import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getdataformToken = (request: NextRequest): string => {
    try {
        // Get the token from cookies
        const token = request.cookies.get("token")?.value || "";

        // If no token is found, throw an error
        if (!token) {
            throw new Error("No token provided");
        }

        // Verify the token using the secret key
        const secretKey = process.env.MONNGOScritykey;
        if (!secretKey) {
            throw new Error("Secret key is missing");
        }

        const decodedToken = jwt.verify(token, secretKey) as { id: string }; // Explicitly define the type for decodedToken

        // Return the user ID from the decoded token
        return decodedToken.id;
    } catch (error) {
        // Check if error is an instance of Error to avoid using `any`
        if (error instanceof Error) {
            throw new Error("Invalid or expired token: " + error.message);
        }
        // Fallback for unexpected errors
        throw new Error("Invalid or expired token: Unknown error");
    }
};
