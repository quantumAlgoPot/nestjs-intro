FROM node:14 
WORKDIR /nest-architecture
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm build
EXPOSE 3000
CMD ["npm" ,"run" ,"start:dev"]