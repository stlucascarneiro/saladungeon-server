import { ApolloError } from "apollo-server";
import { FeedbackModel } from "../models/Feedback"
import { IFeedback } from "../models/interfaces/IFeedback";
import { FeedbackTypes } from "../models/types/Feedback";

export class FeedbackMiddlewares {
    public static throwException(feedback: FeedbackTypes): void {
        throw new ApolloError(FeedbackModel[feedback].message, String(FeedbackModel[feedback].statusCode))
    }
    public static getFeedback(feedback: FeedbackTypes): IFeedback {
        return {
            message: FeedbackModel[feedback].message,
            statusCode: FeedbackModel[feedback].statusCode
        }
    }
    public static hadleJWTError(message: string) {
        switch (message) {
            case 'jwt expired':
                this.throwException('jwtExpiredError')
                break;
            case 'invalid signature':
                this.throwException('jwtSignatureError')
                break;
            default:
                this.throwException('jwtGenericError')
                break;
        }
    }
}