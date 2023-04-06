import { Request, Response, NextFunction, Router} from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
// import useragent from 'express-useragent'

const filter = Router()
const secretKey = process.env.SECRET_KEY

// 필터되지않을 url
const permit = new Set(['/', '/login', '/login/admin'])

declare global{
    namespace Express{
        interface Request{
            userid: string
        }
    }
} 

filter.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.url)
    console.log(req.header('Authorization'))
    console.log(req.query)
    try{
        if(permit.has(req.url) || req.url.includes('/signup')){ // 상관없는 url이면 필터를 거치지 않음
            console.log(`${req.url} 패스됨`)
            return next()
        }

        if('Authorization' in req.query){
            const token = req.query.Authorization as string
            const verifiedToken: JwtPayload = jwt.verify(token, secretKey!) as JwtPayload
            if(verifiedToken){
                console.log(verifiedToken)
                req.userid = verifiedToken.id
                return next()
            }
        }
        
        if(req.header('Authorization')){
            const verifiedToken: JwtPayload = jwt.verify(req.header('Authorization')!, secretKey!) as JwtPayload
            if(verifiedToken){
                console.log(verifiedToken)
                req.userid = verifiedToken.id
                return next()
            }
        }
        
        // 토큰이 없거나 불량 토큰일 경우
        return res.status(401).send("로그인이 필요한 서비스입니다.")
    }
    catch(e){
        return next(e)
    }
})

export default filter