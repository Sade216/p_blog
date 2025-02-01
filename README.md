# Bun + Vite

### About:
##### Frontend: Vite | React | React Router | React Suite
##### Backend: Hono | PostgresSQL | DrizzleORM

***

To install dependencies:

```
bun install
```

## Server

To run:
```
bun start
```
Dev mode:
```
bun dev
```

## Frontend

Go to front folder:
```
cd ./frotend/
```

To run:
```
bun start
```

Dev mode:
```
bun dev
```

Build(server need static files):
```
bun run build
```

Since I use local instance of **Postgres**, you'll need to **setup DB connection** in ***.env*** file (in the root directory):
```
DATABASE_URL='your_postgres_database_url'
```

If you change DB schemas. You'll need to generate, migrate and push schemas to DB:
```
bun drizzle-kit generate
```
```
bun drizzle-kit migrate
```
```
bun drizzle-kit push
```

***
# Application appearance:
#### Main page:
<p align="center">
  <img src="https://github.com/user-attachments/assets/aac8257e-3eb4-4508-a755-7760e5793030" width="500">
</p>

#### Update post:
<p align="center">
  <img src="https://github.com/user-attachments/assets/079d393d-b60b-4ed3-a7b0-5c132a973868" width="500">
</p>
#### Create post:
<p align="center">
  <img src="https://github.com/user-attachments/assets/7883a1c6-01f6-400c-b64d-0583704d95d8" width="500">
</p>

***

This project was created using `bun init` in bun v1.2.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
