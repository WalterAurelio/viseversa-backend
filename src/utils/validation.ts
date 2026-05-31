export const PRODUCT = {
  TITLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
    MIN_LENGTH_MESSAGE: 'El título debe tener al menos 3 caracteres',
    MAX_LENGTH_MESSAGE: 'El título no puede exceder 100 caracteres',
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
    MIN_LENGTH_MESSAGE: 'La descripción debe tener al menos 10 caracteres',
    MAX_LENGTH_MESSAGE: 'La descripción no puede exceder 1000 caracteres',
  },
};

export const USER = {
  NOMBRE_USUARIO: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    MIN_LENGTH_MESSAGE: 'El nombre de usuario debe tener al menos 3 caracteres',
    MAX_LENGTH_MESSAGE: 'El nombre de usuario no puede exceder 30 caracteres',
  },
  NOMBRES: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
    MIN_LENGTH_MESSAGE: 'Los nombres son requeridos',
    MAX_LENGTH_MESSAGE: 'Los nombres no pueden exceder 100 caracteres',
  },
  APELLIDOS: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
    MIN_LENGTH_MESSAGE: 'Los apellidos son requeridos',
    MAX_LENGTH_MESSAGE: 'Los apellidos no pueden exceder 100 caracteres',
  },
  EMAIL: {
    INVALID_MESSAGE: 'Por favor proporciona un email válido',
    REGEX: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  CONTRASEÑA: {
    MIN_LENGTH: 6,
    MIN_LENGTH_MESSAGE: 'La contraseña debe tener al menos 6 caracteres',
  },
  PUNTACION: {
    MIN_VALUE: 0,
    MIN_VALUE_MESSAGE: 'La puntuación no puede ser negativa',
  },
};