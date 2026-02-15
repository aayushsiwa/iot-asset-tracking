# IoT Asset Tracking

## Overview

**IoT Asset Tracking** is a web-based inventory management system designed to monitor physical IoT devices and hardware assets across multiple locations such as workshops, warehouses, and labs.

The system allows organizations to track asset availability, status (online/offline), and location using a modern full-stack architecture powered by Next.js and Supabase.

This product focuses on clean UI, secure access control, and scalable database design for real-world hardware tracking use cases.

## Features

### 🔐 Authentication & Authorization

- Supabase Auth integration
- Public read access
- Restricted create/update/delete for authenticated users
- Row-Level Security (RLS) enabled

### 📦 Asset Management

- Create, update, and delete assets
- Assign assets to specific locations
- Track asset status (Online / Offline)
- UUID-based asset identification
- Search by name
- Search by UUID using `#` prefix (e.g., `#9767`)
- Status-based filtering
- Responsive grid and table views

### 📍 Location Management

- Create and manage asset locations
- Location codes (e.g., WSHA, WHSA)
- Assign multiple assets to a location
- Structured table view for management

### 📊 Dashboard & Analytics

- Asset statistics summary
- Online / Offline counts
- Dynamic filtering
- Clean visual indicators using Tailwind styles

### 🧠 Smart UI Features

- Dark mode support
- Responsive layout
- Reusable components
- React Query for optimized API calls
- Optimistic UI updates
- Clean separation of hooks and UI logic

## Example Use Cases

This system can be used to track:

- Arduino Boards
- Raspberry Pi Devices
- Industrial PCs
- PLC Controllers
- Network Switches
- Oscilloscopes
- 3D Printers
- Power Supplies
- Sensor Modules

Across locations such as:

- Workshop A / B
- Warehouse A / B
- Electronics Lab
- Testing Room

## Tech Stack

### Frontend

- **Next.js (App Router)**
- **React (TypeScript)**
- **TailwindCSS**
- **Shadcn UI**
- **TanStack React Query**

### Backend / Database

- **Supabase**
  - PostgreSQL
  - Supabase Auth
  - Row Level Security (RLS)

- REST APIs via Next.js Route Handlers

### Database Design

Tables:

- `assets`
- `locations`

Key Fields:

**Assets**

- ID (UUID)
- name
- status (online/offline)
- locationID (FK)
- createdAtUTC
- updatedAtUTC

**Locations**

- ID (UUID)
- name
- code
- createdAtUTC
- updatedAtUTC

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/aayushsiwa/iot-asset-tracking
cd iot-asset-tracking
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Supabase

1. Create a Supabase project.
2. Create schema `iot`.
3. Create tables: `assets`, `locations`.
4. Enable Row Level Security.
5. Configure policies:
   - SELECT for public
   - INSERT/UPDATE/DELETE for authenticated

### 4. Add Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run Development Server

```bash
pnpm dev
```

Then open:

```
http://localhost:3000
```

## Project Structure

```
app/
  api/
  assets/
  locations/
components/
hooks/
lib/
types/
context/
```

- UI and logic separated
- Custom hooks colocated with pages
- Supabase client utilities isolated

## Future Enhancements

- Asset categories
- Soft delete & archive
- Asset activity logs
- Role-based permissions
- QR code asset tags
- Realtime subscriptions
- Bulk asset operations

## Contributions

Contributions are welcome!

1. Fork repository
2. Create feature branch
3. Commit changes
4. Submit pull request

## License

MIT License

---

## Author

Built by Aayush Siwach

GitHub: [https://github.com/aayushsiwa](https://github.com/aayushsiwa)
