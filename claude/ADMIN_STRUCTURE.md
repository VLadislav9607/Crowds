# Admin Structure

## Entity Hierarchy

```
org_users (user profile)
└── office_members (membership in a specific office)
    ├── is_super_admin = true → full access to office + its controlled offices
    └── is_super_admin = false → access defined by office_member_capabilities
        └── office_member_capabilities (join table)
            └── capabilities (specific permission)
```

## Tables & Their Purpose

### `org_users`

- **Purpose**: Profile of a user who registered to be an organization member.
- **Columns**: `id`, `email`, `first_name`, `last_name`, `gender`, `username`, `position`, `onboarding_copleted_step`, `deleted_at`, `created_at`
- **Contains only profile info** — does NOT determine which office the user belongs to or what permissions they have.

### `office_members`

- **Purpose**: Defines that a user is a member (admin) of a specific office.
- **Columns**: `id`, `user_id`, `office_id`, `organization_network_id`, `is_super_admin`, `created_at`
- **FKs**:
  - `office_id` → `offices.id`
  - `organization_network_id` → `organizations_network.id`

**`is_super_admin` flag**:

- `true` — the member can perform ANY action within this office, regardless of `office_member_capabilities`. Also has full control over all controlled offices (see `office_control` in `NETWORK_STRUCTURE.md`).
- `false` — the member's permissions are determined entirely by `office_member_capabilities`.

### `office_member_capabilities`

- **Purpose**: Join table that assigns specific permissions to a non-superadmin office member.
- **Columns**: `office_member_id`, `capability_id`, `created_at`
- **FKs**:
  - `office_member_id` → `office_members.id`
  - `capability_id` → `capabilities.id`
- Only relevant when `office_members.is_super_admin = false`.

### `capabilities`

- **Purpose**: Dictionary of available permissions.
- **Columns**: `id`, `name`, `code`, `capability_category`, `sort_order`
- **`capability_category`** (enum `СapabilityСategory`): `"talent"` | `"events"` | `"checkins"` | `"settings"` | `"financial"` | `"master"`

## Permission Rules

| Rule                               | Description                                                                                                    |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Superadmin = full access           | `is_super_admin = true` bypasses all capability checks for that office                                         |
| Superadmin + control               | Superadmin of a controller office has full access to all its controlled offices                                |
| Non-superadmin = capabilities only | `is_super_admin = false` — permissions come exclusively from `office_member_capabilities`                      |
| Superadmin invites admins          | Only superadmins can invite new members to the office                                                          |
| Controller assigns admins          | Superadmin of controller office can assign/remove superadmins and admins in controlled offices                 |
| No cross-office access             | Superadmin of a controlled office has NO access to the controller office (unless they are also a member there) |

## Related Documentation

- Network structure (offices, brands, control): see `NETWORK_STRUCTURE.md`
