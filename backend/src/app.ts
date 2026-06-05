import express from "express";
import cors from "cors";


const app = express();


// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.json({message: "Hello, world!"});
});

app.get("/login", (req, res) => {
  res.json({status: "user logged in"});
});

{/* 

// GET /api/users/me/templates — fetch all resumes for the authenticated user
app.get('/api/users/me/templates', authenticate, async (req, res) => {
  const templates = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      resumeTemplates: {
        include: {
          profile: true,
          contact: true,
          educations: true,
          experiences: { include: { achievements: true } },
          expertises: { include: { items: true } },
          languages: true,
          certifications: true,
          references: true,
        }
      }
    }
  });
  
  res.json(templates?.resumeTemplates ?? []);
});

*/}

export default app;