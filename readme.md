# 💧 WaterTrack

Aplicación desarrollada como proyecto práctico para el módulo de **Cloud Computing y AWS**, basada en una **arquitectura de microservicios**.  
El objetivo de **WaterTrack** es registrar el consumo diario de agua de los usuarios y generar feedback automático en función de su progreso.  

---

## 🚀 Descripción del proyecto

WaterTrack está construida con una arquitectura **Dockerizada** y desplegable en la nube mediante **AWS ECS Fargate**.  
El sistema está compuesto por dos microservicios principales que se comunican entre sí mediante **API REST** y variables de entorno.

### 🧩 Microservicios
- **Water Service** → recibe y gestiona los registros de consumo de agua del usuario.
- **Feedback Service** → genera mensajes de motivación o advertencia según el nivel de consumo.

Ambos microservicios están **contenedorizados con Docker** y se comunican a través de una red interna definida en `docker-compose.yml`.

---

## 🛠️ Tecnologías utilizadas

| Categoría | Tecnologías |
|------------|-------------|
| Lenguaje de programación | Python 3.10 |
| Contenedores | Docker & Docker Compose |
| Orquestación y despliegue | AWS ECS Fargate |
| Registro de imágenes | Amazon ECR |
| Exposición pública | Amazon API Gateway |
| Balanceo de carga | Elastic Load Balancer (interno) |
| Versionado | Git & GitHub |

---

## ⚙️ Estructura del proyecto

```
water-track/
│
├── water-service/
│   ├── Dockerfile
│   ├── app.py
│   ├── requirements.txt
│   └── feedback.json
│
├── feedback-service/
│   ├── Dockerfile
│   ├── app.py
│   ├── requirements.txt
│   ├── /static
|   |    └── /js
|   |         └── main.js
|   |    └── style.css
│   └── /templates
|       └── index.html
└── docker-compose.yml
```

---

## 🧱 Arquitectura

Cada microservicio se ejecuta de forma independiente dentro de su contenedor.  
La comunicación entre ambos se realiza mediante HTTP requests internas (por nombre del contenedor).

**Ejemplo:**
```
FEEDBACK_SERVICE_URL=http://feedback-service:5001/feedback
```

---

## 🐳 Dockerización local

### 🔹 1. Construcción y ejecución
```bash
docker-compose up --build
```

### 🔹 2. Acceso a los servicios
- Water Service → [http://localhost:5000](http://localhost:5000)
- Feedback Service → [http://localhost:5001](http://localhost:5001)

### 🔹 3. Parar los contenedores
```bash
docker-compose down
```

---

## ☁️ Despliegue en AWS

### 1️⃣ Publicación de imágenes en **Amazon ECR**
- Cada microservicio se sube como una imagen Docker individual.
- Se utiliza `aws ecr get-login-password` para autenticarse y `docker push` para publicar.

### 2️⃣ Despliegue en **ECS Fargate**
- Se crean dos tareas (una por microservicio).
- Ambas se ejecutan en un **Cluster ECS** gestionado por Fargate (sin servidores).
- La red de los contenedores se define mediante **VPC + Subnets + Security Groups**.

### 3️⃣ Exposición mediante **API Gateway**
- El **API Gateway** actúa como punto de entrada único para las peticiones HTTP.
- Redirige las solicitudes al servicio correspondiente dentro de ECS.

---

## 🔐 Comunicación entre contenedores

Los servicios se comunican internamente dentro de la red Docker o, en AWS, mediante un **Load Balancer interno**.  
Esto evita exponer directamente los contenedores al público y mejora la seguridad.

---

## 📊 Estimación de costes

La estimación de costes se realizó con **AWS Pricing Calculator**, considerando:
- ECS Fargate (2 microservicios)
- ECR (almacenamiento de imágenes)
- API Gateway
- CloudWatch (monitoreo)
- Tráfico estimado bajo

👉 Coste mensual aproximado: **$10 - $15 USD**

---

## 🧠 Lecciones aprendidas

- Cómo **diseñar una arquitectura de microservicios**.
- Cómo **dockerizar** una aplicación multi-servicio.
- Cómo **subir imágenes a Amazon ECR**.
- Cómo **desplegar en ECS Fargate** sin administrar servidores.
- Cómo **usar API Gateway y Load Balancers** para enrutar tráfico y mejorar la seguridad.
- Integración entre contenedores mediante variables de entorno y redes internas.

---

## 👩‍💻 Autora

**Alba Mora de la Sen**  
📚 Proyecto académico AWS Cloud Practitioner  
🌐 [https://github.com/albamdls](https://github.com/albamdls)

---

## 🪪 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.  
Consulta el archivo `LICENSE` para más información.

---