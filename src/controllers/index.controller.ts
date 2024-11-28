import { NextFunction, Request, Response } from "express";

class IndexController {
    public index = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200)
        .json({message: 'Server is running'});
    }
}

export default IndexController;