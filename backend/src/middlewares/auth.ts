import { Request, Response, NextFunction } from 'express'

class AuthMiddleware {
  static validateApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key']
    if (apiKey !== '%7M!$)Y7A(Md25T@y2XXM0$ce$b4(k648mD%j0g%ptp(*UgA12')
      return res.sendStatus(403)
    next()
  }
}

export { AuthMiddleware }