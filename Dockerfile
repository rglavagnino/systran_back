FROM node:18-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# copiamos el header del codigo
COPY package*.json /usr/src/app/
# instalamos npm
RUN npm install 

# copiamos todo el codigos
COPY . .
RUN ls
#Compilamos el codigo
RUN npm run build
# exponemos el puerto dentro del docker con el del servidor
EXPOSE 5000

# iniciamos el servicio
CMD  ["node","/usr/src/app/dist/main.js"]