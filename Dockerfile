FROM node:10 as builder

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY . /app
RUN npm run-script postinstall
RUN npm run-script build

FROM nginx:mainline
EXPOSE 80
COPY --from=builder /app/www /usr/share/nginx/html
