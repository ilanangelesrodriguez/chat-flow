# 🚀 Chat-Flow

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.4+-green.svg)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-v4.0+-blue.svg)](https://socket.io/)

Chat-Flow es una aplicación de chat en tiempo real potente y flexible, construida con Node.js, MongoDB y Socket.IO. Permite a los usuarios comunicarse de manera instantánea, crear grupos y gestionar sus perfiles.

## ✨ Características

- 💬 Chat en tiempo real
- 👥 Creación y gestión de grupos
- 🔐 Autenticación de usuarios

## 🛠️ Tecnologías Utilizadas

- Node.js
- MongoDB
- Socket.IO
- ES Modules

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ilanangelesrodriguez/chat-flow.git
   ```

2. Instala las dependencias:
   ```bash
   cd chat-flow
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:
   ```
   MONGODB_URI=tu_uri_de_mongodb
   PORT=3000
   ```

4. Inicia la aplicación:
   ```bash
   npm start
   ```

## 📚 Estructura de la Base de Datos

Chat-Flow utiliza MongoDB para almacenar los datos. Aquí está la estructura de las colecciones:

- **usuarios**: Almacena información de los usuarios.
- **grupos**: Contiene detalles de los grupos de chat.
- **miembros_grupo**: Gestiona la relación entre usuarios y grupos.
- **mensajes**: Almacena todos los mensajes enviados.

## 🤝 Contribuir

Las contribuciones son siempre bienvenidas! Por favor, lee el [documento de contribución](CONTRIBUTING.md) para saber cómo empezar.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Ilan Angeles Rodriguez - [@ilanangelesrodriguez](https://www.linkedin.com/in/ilanangelesrodriguez/) - ilanangelesrodriguez@gmail.com

Enlace del proyecto: [https://github.com/ilanangelesrodriguez/chat-flow](https://github.com/ilanangelesrodriguez/chat-flow)

---