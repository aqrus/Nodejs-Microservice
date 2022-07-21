import { cleanEnv, str } from 'envalid';

const validateEnv = ()=>{
  cleanEnv(process.env,{
    NODE_ENV: str(),
    MONGODB_URI: str(),
    JWT_TOKEN_SECRET: str(),
    JWT_TOKEN_EXPIRES_IN: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    NATS_CLIENT_ID: str(),
    NATS_URL: str(),
    NATS_CLUSTER_ID: str()
  })
}

export default validateEnv;