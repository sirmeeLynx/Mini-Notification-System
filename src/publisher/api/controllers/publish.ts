import { RequestHandler } from 'express';
import { publishMessage } from '../../services';

interface responseType {
  message?: string;
}

enum NonSuccessResponseStatus {
    INTERNAL_ERROR = 501
};

const statusMessages = {
    [NonSuccessResponseStatus.INTERNAL_ERROR]: "An error occured during this process, please try again later!",
}

const publishMessageController: RequestHandler = async (req, res) => {
    let status = 200;
    let response: responseType;
    const { topic } = req.params;
    const data = req.body;

    try {
        const publishResponse = await publishMessage({topic, data});
        const { err, ...resObj } = publishResponse;
        response = resObj;
        
        if (err){
            throw new Error(err);
        }
        
    }
    catch (err) {
        console.error(err);
        status = NonSuccessResponseStatus.INTERNAL_ERROR;
        response = {
            message: statusMessages[NonSuccessResponseStatus.INTERNAL_ERROR],
        };
    }

    res.status(status);
    res.send(response);
};

export default publishMessageController;
