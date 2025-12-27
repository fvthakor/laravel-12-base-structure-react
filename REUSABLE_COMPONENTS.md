# Reusable AG Grid Components

This document explains how to use the reusable AG Grid components in your application.

## Components

### 1. AgGridTable Component

A flexible, themeable data table component powered by AG Grid.

**Location**: `resources/js/components/ag-grid-table.tsx`

**Basic Usage**:

```tsx
import { AgGridTable } from '@/components/ag-grid-table';
import { type ColDef } from 'ag-grid-community';
import { useMemo } from 'react';

export function MyPage({ data }) {
  const columnDefs: ColDef[] = useMemo(() => [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
    },
  ], []);

  return (
    <AgGridTable
      rowData={data}
      columnDefs={columnDefs}
      height="500px"
      noRowsTemplate="No data found"
    />
  );
}
```

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rowData` | `T[]` | Required | Array of data to display |
| `columnDefs` | `ColDef[]` | Required | AG Grid column definitions |
| `height` | `string` | `'500px'` | Table height (CSS value) |
| `rowHeight` | `number` | `44` | Row height in pixels |
| `headerHeight` | `number` | `40` | Header height in pixels |
| `noRowsTemplate` | `string` | `'No data found'` | Empty state message |
| `pagination` | `boolean` | `false` | Enable pagination |
| `pageSize` | `number` | `10` | Rows per page |
| `suppressCellFocus` | `boolean` | `true` | Disable cell focus |
| `suppressMovableColumns` | `boolean` | `true` | Prevent column reordering |
| `suppressScrollOnNewData` | `boolean` | `true` | Don't auto-scroll on data update |
| `animateRows` | `boolean` | `true` | Animate row changes |
| `onRowClick` | `(data: T) => void` | `undefined` | Row click handler |

**Features**:

- ✅ Automatic dark/light theme detection and switching
- ✅ Radix Design System colors
- ✅ Fully responsive and customizable
- ✅ TypeScript support
- ✅ No additional setup required

### 2. ThemeSwitcher Component

A dropdown component for switching between light, dark, and system themes.

**Location**: `resources/js/components/theme-switcher.tsx`

**Basic Usage**:

```tsx
import { ThemeSwitcher } from '@/components/theme-switcher';

export function Header() {
  return (
    <div className="flex items-center gap-2">
      <ThemeSwitcher size="sm" />
      {/* Other header content */}
    </div>
  );
}
```

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Button size |

**Features**:

- ✅ Three theme options: Light, Dark, System
- ✅ Shows current theme with appropriate icon
- ✅ Persists preference to localStorage and cookies
- ✅ Integrates with `useAppearance` hook

## Complete Example

```tsx
import { AgGridTable } from '@/components/ag-grid-table';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { type ColDef, type ICellRendererParams } from 'ag-grid-community';
import { useMemo } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export function UsersPage({ users }: { users: User[] }) {
  const ActionsCellRenderer = (props: ICellRendererParams<User>) => {
    const user = props.data;
    return user ? (
      <div className="flex gap-2">
        <Button variant="ghost" size="sm">
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="text-destructive">
          Delete
        </Button>
      </div>
    ) : null;
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'created_at',
        headerName: 'Joined',
        flex: 1,
        minWidth: 150,
        cellRenderer: (props: ICellRendererParams<User>) => {
          return new Date(props.value).toLocaleDateString();
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 0.5,
        minWidth: 100,
        sortable: false,
        filter: false,
        cellRenderer: ActionsCellRenderer,
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <ThemeSwitcher size="sm" />
      </div>

      <AgGridTable
        rowData={users}
        columnDefs={columnDefs}
        height="600px"
        noRowsTemplate="No users found"
      />
    </div>
  );
}
```

## Styling

The components automatically apply the correct theme colors based on the current dark/light mode. The styling uses:

- **Radix Design System colors** for consistency
- **CSS custom properties** for theme switching
- **Tailwind CSS classes** for additional styling

Colors are defined in `resources/css/ag-grid-custom.css`.

## How It Works

1. **Theme Detection**: `AgGridTable` monitors the `dark` class on the `html` element
2. **Dynamic Styling**: When theme changes, the component key triggers a re-render
3. **CSS Variables**: AG Grid uses CSS custom properties for color theming
4. **Persistence**: `ThemeSwitcher` uses `useAppearance` hook which handles localStorage/cookie persistence

## Best Practices

1. **Memoize column definitions** to prevent unnecessary re-renders:
   ```tsx
   const columnDefs = useMemo(() => [...], []);
   ```

2. **Use cell renderers for custom formatting**:
   ```tsx
   cellRenderer: (props) => formatDate(props.value)
   ```

3. **Set appropriate row heights** for your data:
   ```tsx
   <AgGridTable rowHeight={48} />
   ```

4. **Provide custom `noRowsTemplate`** for context:
   ```tsx
   <AgGridTable noRowsTemplate="No users found. Create one?" />
   ```

5. **Handle row clicks** with the `onRowClick` callback:
   ```tsx
   <AgGridTable onRowClick={(row) => navigate(`/user/${row.id}`)} />
   ```

## TypeScript

Both components are fully typed with TypeScript support:

```tsx
import { AgGridTable } from '@/components/ag-grid-table';
import { ThemeSwitcher } from '@/components/theme-switcher';

// Type-safe row data
interface Product {
  id: number;
  name: string;
  price: number;
}

// Type-safe props
<AgGridTable<Product>
  rowData={products}
  columnDefs={columnDefs}
/>
```

## Migration Guide

To migrate from inline AG Grid usage to reusable components:

**Before**:
```tsx
import { AgGridReact } from 'ag-grid-react';
// ... lots of setup code
<AgGridReact rowData={data} columnDefs={cols} {...props} />
```

**After**:
```tsx
import { AgGridTable } from '@/components/ag-grid-table';
<AgGridTable rowData={data} columnDefs={cols} />
```

Much cleaner! 🎉
