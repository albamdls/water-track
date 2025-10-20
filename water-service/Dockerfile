# Imagen base de Python
FROM python:3.10-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos dependencias e instalamos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto de archivos
COPY . .

# Exponemos el puerto del servicio Flask
EXPOSE 5000

# Comando por defecto
CMD ["python", "app.py"]