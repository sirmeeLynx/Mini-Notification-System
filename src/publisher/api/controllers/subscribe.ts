import { RequestHandler } from 'express';
import { subscribeToTopicService } from '../../services';

interface responseType {
  message?: string;
  url: string;
  topic: string;
}

enum NonSuccessResponseStatus {
    ALREADY_EXIST = 409,
    INTERNAL_ERROR = 501
};

const statusMessages = {
    [NonSuccessResponseStatus.ALREADY_EXIST]: "Url already subscribed.",
    [NonSuccessResponseStatus.INTERNAL_ERROR]: "An error occured during this process, please try again later!",
}

const subscribeToTopicController: RequestHandler = async (req, res) => {
    let status = 201;
    let response: responseType;
    const { topic } = req.params;
    const { url } = req.body;

    try {
        const subscriptionObj = await subscribeToTopicService({topic, url});
        console.log("subscription Object => ", subscriptionObj);
        const { isNew, err, ...resObj } = subscriptionObj;
        response = resObj;

        if (err){
            throw new Error(err);
        }
        
        if (!isNew){
            status = NonSuccessResponseStatus.ALREADY_EXIST;
            response.message = statusMessages[NonSuccessResponseStatus.ALREADY_EXIST];
        }

    }
    catch (err) {
        console.log("error thrown");
        console.error(err);
        status = NonSuccessResponseStatus.INTERNAL_ERROR;
        response = {
            message: statusMessages[NonSuccessResponseStatus.INTERNAL_ERROR],
            topic, url
        };
    }

    res.status(status);
    res.send(response);
};

export default subscribeToTopicController;
