Updated Implementation Plan
Summary
Transform the static Next.js teleradiology site into a fully functional dynamic application with user authentication, MySQL database integration for blog management, Docker-based local development, and Plesk deployment compatibility.

Implementation Steps
1. Install Required Dependencies
Add next-auth@v5 (Auth.js) for authentication
Add @auth/mysql-adapter for MySQL integration
Add mysql2 for database connectivity
Add database migration tool (e.g., drizzle-kit or direct SQL scripts)
Add form validation libraries for admin panel
2. Docker MySQL Setup for Local Development
Create docker-compose.yml with MySQL 8.0 container
Configure MySQL with:
Root password
Database name
User credentials
Port mapping (3306)
Volume persistence for data
Add .dockerignore file
Create database initialization scripts
3. Database Schema Setup
Create MySQL database schema with tables for:
NextAuth.js tables (users, accounts, sessions, verification_tokens)
Blog posts table (id, slug, title, excerpt, category, author, date, reading_minutes, image, image_alt, content, created_at, updated_at)
Create database migration scripts
Add seed script to migrate existing static blog content to MySQL
Support both local Docker and production Plesk MySQL connections
4. Database Connection Configuration
Create lib/db.ts with environment-aware database connection
Local development: Connect to Docker MySQL (localhost:3306)
Production: Connect to Plesk MySQL (production credentials)
Add connection pooling configuration
Add error handling and reconnection logic
5. Authentication System
Set up NextAuth.js configuration with MySQL adapter
Create API route at /app/api/auth/[...nextauth]/route.ts
Add authentication environment variables
Integrate with existing contact form for user registration/subscription
Create login page at /app/login/page.tsx
Create registration page at /app/register/page.tsx
Add session management components
Protect admin routes with middleware
6. Blog Management System
Create database API routes for blog CRUD operations:
GET /app/api/blog/route.ts - List all posts
POST /app/api/blog/route.ts - Create new post
GET /app/api/blog/[slug]/route.ts - Get single post
PUT /app/api/blog/[slug]/route.ts - Update post
DELETE /app/api/blog/[slug]/route.ts - Delete post
Update existing blog pages to fetch from MySQL instead of static content
Migrate existing 3 blog posts from blog.ts to database
7. Admin Panel
Create protected admin dashboard at /app/admin/page.tsx
Build blog post management interface with:
List view of all blog posts
Create/edit forms with rich text editor
Delete functionality
Image upload handling
Add admin layout with navigation
Create admin-specific components (BlogPostForm, BlogPostList)
8. Environment Configuration
Update .env.example with variables for both environments:
Local Development: Docker MySQL credentials
Production: Plesk MySQL credentials
NextAuth.js (NEXTAUTH_SECRET, NEXTAUTH_URL)
Database connection strings
Add environment variable validation
Add NODE_ENV detection for automatic environment switching
9. Plesk Deployment Configuration
Remove Vercel-specific configurations from .gitignore (.vercel)
Update next.config.ts for generic deployment
Create Plesk deployment script or documentation
Add Node.js compatibility checks
Ensure build output is compatible with Plesk Node.js hosting
Add production database migration instructions
10. Documentation Updates
Update README.md with:
Local development setup with Docker MySQL
Database setup instructions for both environments
Admin panel usage guide
Plesk deployment steps (replacing Vercel instructions)
Updated environment variables list
Build and run instructions for both local and production
Docker Compose usage instructions
11. Code Annotations
Add TODO comments in team.ts for leadership photos (pending issue)
Add TODO comments in site.ts for social URLs (pending issue)
Document existing placeholder content
12. Verification
Run npm run build to ensure zero errors/warnings
Test all new functionality locally with Docker MySQL
Verify database connections in both environments
Test authentication flow
Test admin panel functionality
Files to Modify
package.json - Add new dependencies
.env.example - Add MySQL and NextAuth.js variables for both environments
next.config.ts - Update for generic deployment
.gitignore - Remove .vercel entry, add .docker/ if needed
README.md - Comprehensive update with Docker setup and Plesk deployment
team.ts - Add TODO comment for leadership photos
site.ts - Add TODO comment for social URLs
blog.ts - Keep as reference, mark as deprecated
New Files to Create
docker-compose.yml - Docker MySQL container configuration
.dockerignore - Docker ignore file
database/schema.sql - MySQL schema
database/seed.sql - Seed existing blog data
database/init/ - Database initialization scripts
app/api/auth/[...nextauth]/route.ts - NextAuth.js API route
app/api/auth/config.ts - Auth configuration
app/login/page.tsx - Login page
app/register/page.tsx - Registration page
app/admin/page.tsx - Admin dashboard
app/admin/blog/page.tsx - Blog management
app/admin/blog/new/page.tsx - Create blog post
app/admin/blog/[slug]/edit/page.tsx - Edit blog post
app/api/blog/route.ts - Blog API endpoints
app/api/blog/[slug]/route.ts - Single blog API endpoints
lib/db.ts - Database connection utility (environment-aware)
lib/auth.ts - Auth utilities
middleware.ts - Route protection middleware
components/admin/ - Admin-specific components
Files to Update
page.tsx - Fetch from MySQL instead of static content
page.tsx - Fetch from MySQL instead of static content
actions.ts - Integrate with user registration
page.tsx - Add registration/subscription option
Docker Configuration Details
The docker-compose.yml will include:

yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    container_name: hakimerad_mysql
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: hakimerad_db
      MYSQL_USER: hakimerad_user
      MYSQL_PASSWORD: hakimerad_pass
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/init:/docker-entrypoint-initdb.d
volumes:
  mysql_data:
Environment Variables Structure
Local Development (.env.local):

DATABASE_URL="mysql://hakimerad_user:hakimerad_pass@localhost:3306/hakimerad_db"
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=hakimerad_user
MYSQL_PASSWORD=hakimerad_pass
MYSQL_DATABASE=hakimerad_db
Production (Plesk):

DATABASE_URL="mysql://production_user:production_pass@plesk-host:3306/production_db"
MYSQL_HOST=production-plesk-host
MYSQL_PORT=3306
MYSQL_USER=production_user
MYSQL_PASSWORD=production_password
MYSQL_DATABASE=production_db
Verification
npm run build completes without errors or warnings
Docker MySQL container starts successfully
Database schema creates successfully in Docker
Seed script migrates existing blog content
Authentication flow works locally (register → login → session)
Admin panel accessible only to authenticated users
Blog CRUD operations work in admin panel
Public blog pages display MySQL data correctly
Contact form integration with user registration works
Environment variables validated via .env.example
Database connection switching works between local and production
Plesk deployment instructions tested
Risks/Considerations
Database Security: MySQL credentials must be properly secured in environment variables
Docker Dependency: Local development requires Docker to be installed
Migration Complexity: Existing static content needs smooth migration to MySQL
Authentication Complexity: NextAuth.js v5 may require specific configuration for MySQL adapter
Plesk Compatibility: Need to ensure Node.js version compatibility and build process works on Plesk
Environment Switching: Database connection logic must reliably detect environment
Image Handling: Admin panel needs proper image upload/storage strategy for blog images
Session Management: Need to configure session storage (MySQL vs. memory) for production
Backup Strategy: Database backup strategy needed for production deployment
Began implementing Plan
Transform the static Next.js teleradiology site into a fully functional dynamic application with:

Authentication System: NextAuth.js v5 with MySQL adapter for user registration/subscription
Blog Management: MySQL database backend with full admin panel for CRUD operations
Docker MySQL: Docker Compose configuration for local development with MySQL 8.0 container
Plesk Deployment: Replace Vercel configuration with generic Plesk-compatible setup

Environment-Aware DB: Automatic connection switching between local Docker MySQL and production Plesk MySQL
Documentation: Comprehensive README with Docker setup, database setup, admin usage, and Plesk deployment instructions
Code Annotations: Mark leadership photos and social URLs as pending issues
Key additions include Docker Compose for local MySQL, environment-aware database connections, admin panel at /admin, authentication pages, blog API endpoints, and updated environment configuration.