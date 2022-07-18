declare namespace Express{
  interface Request{
    user: {
      id: string,
      role: string
    },
    session: {
      jwt: string
    } | null
  }
}