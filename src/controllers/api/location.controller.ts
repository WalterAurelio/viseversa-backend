import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/errorHandler";

export const getLocations = asyncHandler(async (req: Request, res: Response) => {
  const locations = [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán"
  ];

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Ubicaciones obtenidas correctamente",
    data: locations
  });
});
