# Admin Dashboard Components

This package contains the Vue 3 admin dashboard. Run with:

```bash
npm run admin:dev
```

### Design decisions

- Layout wrapped with `AdminLayout` using existing header and navigation.
- Members table and invite form are split into standalone components for reusability and easier testing.
- Table features are implemented client-side with simple search, sort and pagination.

### Extending

Add new table columns or actions inside `MembersTable.vue`. Storybook stories are colocated with components for visual testing. Run Storybook with:

```bash
npm run storybook
```
