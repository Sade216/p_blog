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

Since I use local instance of **Postgres**, you'll need to **setup DB connection** in ***.env*** file:
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

This project was created using `bun init` in bun v1.2.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
