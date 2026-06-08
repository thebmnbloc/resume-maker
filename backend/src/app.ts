
import express from 'express'
import cors from 'cors';

// routes imports
import authRoutes from './routes/authRoute'
import templatesRoutes from './routes/templatesRoute'
import adminRoutes from './routes/adminRoute'

const app = express()

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templatesRoutes);
app.use('/api/admin', adminRoutes);


app.get('/api/welcome', (req, res) => {
  res.json({"message": "Welcome to Express"});
});


// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

export default app