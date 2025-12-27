# Laravel 12 + React Base Structure

A modern Laravel 12 application with React frontend using Inertia.js, TypeScript, and Tailwind CSS.

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL or other database

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel-12-base-structure-react
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure your database**
   
   Edit the `.env` file and set your database credentials:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Seed database (optional)**
   ```bash
   php artisan db:seed
   ```

## Build and Development

### Development Mode

1. **Start the Laravel development server**
   ```bash
   php artisan serve
   ```
   The application will be available at `http://localhost:8000`

2. **Start Vite development server (in a separate terminal)**
   ```bash
   npm run dev
   ```

### Production Build

1. **Build frontend assets**
   ```bash
   npm run build
   ```

2. **Build with SSR support (if needed)**
   ```bash
   npm run build:ssr
   ```

3. **Optimize application**
   ```bash
   php artisan optimize
   ```

## Code Quality Tools

- **Format code**: `npm run format`
- **Check formatting**: `npm run format:check`
- **Lint code**: `npm run lint`
- **Type checking**: `npm run types`
- **PHP linting**: `composer pint`

## Testing

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=DashboardTest

# Run tests with coverage
php artisan test --coverage
```

## Creating New Modules

### Laravel Artisan Commands

#### Create a new controller
```bash
php artisan make:controller <ControllerName>

# With resource methods
php artisan make:controller <ControllerName> --resource

# API controller
php artisan make:controller <ControllerName> --api
```

#### Create a new model
```bash
php artisan make:model <ModelName>

# With migration
php artisan make:model <ModelName> -m

# With migration, factory, and seeder
php artisan make:model <ModelName> -mfs

# With controller
php artisan make:model <ModelName> -c
```

#### Create a new migration
```bash
php artisan make:migration create_<table_name>_table

# Add columns to existing table
php artisan make:migration add_<column_name>_to_<table_name>_table
```

#### Create a new request
```bash
php artisan make:request <RequestName>
```

#### Create a new middleware
```bash
php artisan make:middleware <MiddlewareName>
```

#### Create a new seeder
```bash
php artisan make:seeder <SeederName>
```

#### Create a new factory
```bash
php artisan make:factory <FactoryName>
```

#### Create a new action (custom command)
```bash
php artisan make:action <ActionName>
```

#### Create a new test
```bash
# Pest test (Feature)
php artisan make:test <TestName>

# Pest test (Unit)
php artisan make:test <TestName> --unit

# PHPUnit test
php artisan make:test <TestName> --phpunit
```

#### Create a new custom artisan command
```bash
php artisan make:command <CommandName>
```

### React Component Structure

Create new React components in `resources/js/components/`:

```bash
# Example structure
resources/js/components/
├── ui/              # Reusable UI components
├── forms/           # Form components
└── layout/          # Layout components
```

### Inertia Pages

Create new pages in `resources/js/pages/`:

```bash
# Example structure
resources/js/pages/
├── Auth/
├── Settings/
└── Dashboard.tsx
```

## Project Structure

```
├── app/                    # Laravel application code
│   ├── Actions/           # Custom actions
│   ├── Http/              # Controllers, Middleware, Requests
│   └── Models/            # Eloquent models
├── config/                # Configuration files
├── database/              # Migrations, seeders, factories
├── resources/
│   ├── css/              # Styles
│   └── js/               # React components and pages
│       ├── components/   # Reusable React components
│       ├── pages/        # Inertia pages
│       ├── types/        # TypeScript types
│       └── utils/        # Utility functions
├── routes/               # Route definitions
└── tests/                # Test files
```

## Common Tasks

### Clear cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Run queue worker
```bash
php artisan queue:work
```

### Storage link
```bash
php artisan storage:link
```

### Fresh migration (WARNING: drops all tables)
```bash
php artisan migrate:fresh --seed
```

## Deployment

1. Set `APP_ENV=production` in `.env`
2. Run `composer install --optimize-autoloader --no-dev`
3. Run `npm run build`
4. Run `php artisan optimize`
5. Run `php artisan migrate --force`
6. Configure your web server to point to `/public` directory

## Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## License

This project is open-sourced software licensed under the MIT license.
