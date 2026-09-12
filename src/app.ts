import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { AppError } from "./errors/AppError";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/api/auth.routes";
import commentRoutes from "./routes/comment.routes";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";
import testRoutes from "./routes/api/test.routes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Servidor en funcionamiento",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test", testRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  throw AppError.notFound(`Ruta no encontrada: ${req.method} ${req.path}`);
});

app.use(errorHandler);

export default app;
