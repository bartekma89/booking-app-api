FROM node:25.1-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 4000

CMD ["pnpm", "dev"]