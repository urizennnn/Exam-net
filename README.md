# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Admin Panel

To start the admin interface run:

```bash
npm run admin:dev
```

### How It Works

All member accounts are created from the admin portal. From the **Members** page administrators can invite new users by entering their name, email and role. The dashboard sends a `POST /admin/invite` request which triggers an email using `templates/member-invitation.html`.

The members list is retrieved via `GET /admin/members` and follows this shape:

```ts
{
  id: string;
  name: string;
  email: string;
  role: string;
  invitedAt: string;
  isOnline: boolean;
}
```

Deleting a member uses `DELETE /admin/members/:id`.

Email templates are located in the `templates/` folder. Integrate them with your mailer by loading the HTML file and replacing the placeholders with dynamic data before sending.
