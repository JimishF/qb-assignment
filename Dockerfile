FROM node:16.2-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "8080", "-s", "."]