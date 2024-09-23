import 'dotenv/config';
import express, { Request, Response } from 'express';
import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express';

const app = express();
app.use(clerkMiddleware());

const port = 3000;

// Declare a route and access the auth state for this request
app.get('/', async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;

  return res.json({ user });
});

// Protect a route and return 401 if user is unauthenticated
app.get('/protected', async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(403).send('Unauthorized request.');
  }

  const user = await clerkClient.users.getUser(userId);

  return res.json({ user });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
