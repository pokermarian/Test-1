import 'dotenv/config';
import express from 'express';
import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express';

const app = express();
const PORT = 3000;

app.use(clerkMiddleware());

// Use getAuth() to protect this route
// and get the user's User object
app.get('/', async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await clerkClient.users.getUser(userId);

  return res.json({ user });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
