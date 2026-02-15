**IoT-Asset-Tracking**

---

### Overview

This project is an IoT asset tracking solution designed to help businesses monitor the location and status of assets in real-time. It utilizes a combination of hardware sensors, a web application built with NextJS, and a PostgreSQL database hosted on Supabase for storing asset data. Additionally, TailwindCSS and Shadcn UI library are used for styling the frontend interface.

### Features

- **Real-time Tracking**: Track the location and status of assets in real-time.
- **Database Integration**: Utilize PostgreSQL database on Supabase for storing and managing asset data.
- **User Interface**: A responsive and user-friendly interface built with NextJS, TailwindCSS, and Shadcn UI library.
- **Authentication and Authorization**: Secure access to the system with authentication and authorization features.

### Technologies Used

- **NextJS**: A modern JavaScript framework for building user interfaces.
- **PostgreSQL**: An open-source relational database management system.
- **Supabase**: An open-source Firebase alternative with PostgreSQL database.
- **TailwindCSS**: A utility-first CSS framework for building custom designs.
- **Shadcn UI Library**: A UI library for Svelte applications.

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/aayushsiwa/iot-asset-tracking
   ```

2. Navigate to the project directory:

   ```
   cd iot-asset-tracking
   ```

3. Install dependencies:

   ```
   pnpm install
   ```

4. Set up Supabase:
   - Sign up for an account on [Supabase](https://supabase.io/).
   - Create a new project and obtain the PostgreSQL database URL.
   - Set up authentication and create necessary tables for asset tracking.

5. Configure environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

6. Run the application:

   ```
   pnpm dev
   ```

### Usage

1. Access the web application by navigating to the provided URL.

2. Sign in using your credentials.

3. Navigate through the interface to view asset information, track their location, and manage asset data.

### Contributions

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes and commit them (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a pull request.

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Feel free to reach out if you have any questions or need further assistance!
