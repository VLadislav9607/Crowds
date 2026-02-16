# Network Structure

## Entity Hierarchy

```
organizations_network (top-level grouping)
├── brands (visual identity grouping)
│   ├── office (operational unit, country_code=US)
│   │   ├── office_location (informational, multiple per office)
│   │   └── office_location
│   ├── office (operational unit, country_code=UA)
│   └── office (operational unit, country_code=GB)
│       └── office_control → controls another office within same brand
└── brands
    └── office (operational unit, country_code=DE)
```

## Tables & Their Purpose

### `organizations_network`

- **Purpose**: Abstract top-level container that groups offices and brands together.
- **Columns**: `id`, `created_at`
- **Has no business logic** — exists only as a grouping mechanism.

### `brands`

- **Purpose**: Informational grouping — offices under the same brand share the brand name and logo.
- **Columns**: `id`, `name`, `logo_path`, `organization_network_id`, `created_at`
- **FK**: `organization_network_id` → `organizations_network.id`
- **Has no business logic** — purely informational (name + logo).

### `offices`

- **Purpose**: The main operational unit. All business logic revolves around offices.
- **Columns**: `id`, `brand_id`, `country_code`, `office_role`, `organization_network_id`, `created_at`
- **FKs**:
  - `brand_id` → `brands.id`
  - `organization_network_id` → `organizations_network.id`

**Constraints**:

- An office belongs to exactly 1 brand.
- An office has exactly 1 `country_code`.
- Within the same brand, no two offices can have the same `country_code` (unique per brand).

**`office_role`** (enum `OfficeRole`: `"HQ"` | `"MAIN_OPERATIONAL"` | `"BRANCH"`):

- Purely informational label.
- Does NOT affect permissions, control hierarchy, or any business logic.

### `office_control`

- **Purpose**: Defines which office controls which. One-level hierarchy only (no recursion).
- **Columns**: `controlled_office_id`, `controller_office_id`, `created_at`
- **FKs**:
  - `controlled_office_id` → `offices.id` (one-to-one — an office can be controlled by at most 1 other office)
  - `controller_office_id` → `offices.id` (one-to-many — an office can control multiple offices)

**Rules**:

1. Control is only possible within the same brand — both offices must share the same `brand_id`.
2. A controlled office cannot control other offices (no recursive/nested control).
3. An office can be independent (not in this table at all).
4. A controller office can control many offices.
5. A controlled office has exactly 1 controller.

**What control means in practice**:

- Superadmins of the controller office have full control over the controlled office's events.
- Admins in controlled offices are assigned by the controller office.

### `office_location`

- **Purpose**: Physical locations belonging to an office. Purely informational.
- **FK**: `office_id` → `offices.id`
- An office can have multiple locations.
- No business logic — informational only.

## Key Rules Summary

| Rule                              | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| 1 office → 1 brand                | An office always belongs to exactly one brand           |
| 1 brand + 1 country_code = unique | No duplicate country codes within a brand               |
| Control = same brand only         | Controller and controlled offices must share `brand_id` |
| Max 1 level of control            | Controlled offices cannot control other offices         |
| 1 controlled → 1 controller       | A controlled office has exactly one controller          |
| 1 controller → many controlled    | A controller can manage multiple offices                |
| `office_role` is informational    | HQ / MAIN_OPERATIONAL / BRANCH have no effect on logic  |
| `brands` is informational         | Only provides name + logo for grouped offices           |

## Related Documentation

- Admin structure and permissions: see `ADMIN_STRUCTURE.md`
