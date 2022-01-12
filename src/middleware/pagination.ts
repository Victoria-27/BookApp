import { Request, Response, NextFunction } from "express";
export function pagination(model: any){
    return async function paginate(req: Request, res: any, next: NextFunction){
        const params: string = req.query.page as string;
        const params__: string = req.query.limit as string;
        const page = parseInt(params);
        const limit = parseInt(params__);
        if (!page && !limit) {
          const result = await model.find().exec();
          // console.log(result)
          if(result.length === 0){
            res.status(404).send({
              status: "Failed",
              result
            });
            return;
          }
          res.status(200).send({
            status: "success",
            result,
          });
          return;
        }
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result: { [key: string]: { [key: string]: number } } = {};
        if (endIndex < (await model.countDocuments().exec())) {
          result.next = {
            page: page + 1,
            limit: limit,
          };
        }
        if (startIndex > 0) {
          result.previous = {
            page: page - 1,
            limit: limit,
          };
        }
        try {
          result.users = await model.find().limit(limit).skip(startIndex);
        //   res.status(200).send(result);
            res.paginatedResult = result
            next()
        } catch (err) {
          res.status(404).json({
            status: "fail",
            message: err,
          });
        }
    }
}