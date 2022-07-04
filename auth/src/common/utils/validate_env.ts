import { cleanEnv, str } from 'envalid';

const validateEnv = ()=>{
  cleanEnv(process.env,{
    NODE_ENV: str(),
    MONGODB_URI: str(),
    JWT_TOKEN_SECRET: str(),
    JWT_EXPIRESTIME: str(),
  })
}

export default validateEnv;