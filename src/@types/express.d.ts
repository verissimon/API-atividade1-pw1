import UserBody from './data/typeDefinitions'

declare global {
    namespace Express {
      interface Request {
        username?: UserBody.username;
      }
    }
  }
  