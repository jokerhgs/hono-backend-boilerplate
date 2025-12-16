# Hono Boilerplate - Modular Monolithic API

A clean, minimal boilerplate for building modular monolithic REST APIs with Hono, TypeScript, Prisma, and Zod validation.

## Features

- **Modular Architecture**: Organized by feature modules
- **Type Safety**: Full TypeScript support with Zod schema validation
- **Database**: Prisma ORM for database management
- **Testing**: Comprehensive test coverage with Vitest
- **Hot Reload**: Development server with auto-reload

## Project Structure

```
src/
├── modules/
│   └── tasks/                   # Example module
│       ├── tasks-schema.ts      # Zod schemas and types
│       ├── tasks-service.ts     # Business logic
│       ├── tasks-controller.ts  # Request handlers
│       ├── tasks-routes.ts      # Route definitions
│       └── tasks.test.ts        # Unit tests
├── index.ts                     # Application entry point
prisma/
└── schema.prisma                # Database schema
```

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Setup Database

1. Configure your database URL in `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

2. Create and run migrations:
```bash
pnpm prisma migrate dev --name init
```

3. Generate Prisma Client:
```bash
pnpm prisma generate
```

### Run Development Server

```bash
pnpm dev
```

Server will start at `http://localhost:3000`

### Run Tests

```bash
pnpm test
```

### Build for Production

```bash
pnpm build
pnpm start
```

## API Endpoints

### Tasks API (Example)

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
  ```json
  {
    "title": "Task title",
    "completed": false
  }
  ```
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Hono
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Validation**: Zod
- **Testing**: Vitest
- **Dev Tools**: tsx (for hot reload)

## Adding New Modules

To add a new module, create a new directory under `src/modules/` with the following files:

1. `{module}-schema.ts` - Define Zod schemas and TypeScript types
2. `{module}-service.ts` - Implement business logic
3. `{module}-controller.ts` - Create request handlers
4. `{module}-routes.ts` - Define routes
5. `{module}.test.ts` - Write tests

Then register the router in `src/index.ts`:

```typescript
import moduleRouter from './modules/{module}/{module}-routes.js';
app.route('/{module}', moduleRouter);
```

## Prisma Commands

```bash
# Create a migration
pnpm prisma migrate dev --name migration_name

# Generate Prisma Client
pnpm prisma generate

# Open Prisma Studio
pnpm prisma studio

# Reset database
pnpm prisma migrate reset
```

## Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests with Vitest
