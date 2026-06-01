export function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    next(error);
    return;
  }

  const status = error.statusCode || 500;
  response.status(status).json({
    erro: error.message || 'Erro interno do servidor.',
    codigo: error.code || 'INTERNAL_ERROR',
  });
}
