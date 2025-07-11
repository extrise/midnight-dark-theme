-- Midnight Dark Theme Demo - SQL
-- Demonstrates SQL syntax highlighting with various database operations

-- Database and schema creation
CREATE DATABASE IF NOT EXISTS midnight_demo;
USE midnight_demo;

-- Create users table with constraints
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('admin', 'moderator', 'user') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    
    -- Indexes for performance
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active),
    INDEX idx_created (created_at)
);

-- Create posts table with foreign key
CREATE TABLE posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at TIMESTAMP NULL,
    
    -- Foreign key constraint
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_slug (slug),
    INDEX idx_published (published_at)
);

-- Create comments table
CREATE TABLE comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    parent_id BIGINT NULL,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key constraints
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_post_id (post_id),
    INDEX idx_user_id (user_id),
    INDEX idx_parent_id (parent_id),
    INDEX idx_approved (is_approved)
);

-- Insert sample data
INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES
('admin', 'admin@example.com', '$2y$10$hash1', 'Admin', 'User', 'admin'),
('john_doe', 'john@example.com', '$2y$10$hash2', 'John', 'Doe', 'user'),
('jane_smith', 'jane@example.com', '$2y$10$hash3', 'Jane', 'Smith', 'moderator'),
('bob_wilson', 'bob@example.com', '$2y$10$hash4', 'Bob', 'Wilson', 'user');

-- Insert sample posts
INSERT INTO posts (user_id, title, content, slug, status, published_at) VALUES
(1, 'Welcome to Midnight Dark Theme', 'This is a comprehensive demo of our beautiful dark theme...', 'welcome-midnight-dark', 'published', NOW()),
(2, 'Getting Started with SQL', 'Learn the basics of SQL with practical examples...', 'getting-started-sql', 'published', NOW()),
(3, 'Advanced Database Queries', 'Explore complex SQL queries and optimization techniques...', 'advanced-database-queries', 'draft', NULL);

-- Complex SELECT queries with JOINs
SELECT 
    u.username,
    u.email,
    u.first_name,
    u.last_name,
    COUNT(p.id) as post_count,
    MAX(p.created_at) as last_post_date
FROM users u
LEFT JOIN posts p ON u.id = p.user_id AND p.status = 'published'
WHERE u.is_active = TRUE
GROUP BY u.id, u.username, u.email, u.first_name, u.last_name
HAVING post_count > 0
ORDER BY post_count DESC, last_post_date DESC;

-- Subquery example
SELECT 
    p.title,
    p.view_count,
    u.username as author,
    (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id AND c.is_approved = TRUE) as comment_count
FROM posts p
INNER JOIN users u ON p.user_id = u.id
WHERE p.status = 'published'
    AND p.view_count > (
        SELECT AVG(view_count) 
        FROM posts 
        WHERE status = 'published'
    )
ORDER BY p.view_count DESC
LIMIT 10;

-- Window functions example
SELECT 
    u.username,
    p.title,
    p.view_count,
    ROW_NUMBER() OVER (PARTITION BY u.id ORDER BY p.view_count DESC) as rank_in_user_posts,
    RANK() OVER (ORDER BY p.view_count DESC) as overall_rank,
    LAG(p.view_count) OVER (ORDER BY p.created_at) as previous_post_views
FROM posts p
INNER JOIN users u ON p.user_id = u.id
WHERE p.status = 'published';

-- Common Table Expression (CTE)
WITH user_stats AS (
    SELECT 
        u.id,
        u.username,
        COUNT(p.id) as total_posts,
        SUM(p.view_count) as total_views,
        AVG(p.view_count) as avg_views_per_post
    FROM users u
    LEFT JOIN posts p ON u.id = p.user_id
    WHERE u.is_active = TRUE
    GROUP BY u.id, u.username
),
top_users AS (
    SELECT *
    FROM user_stats
    WHERE total_posts >= 2
    ORDER BY total_views DESC
    LIMIT 5
)
SELECT 
    tu.username,
    tu.total_posts,
    tu.total_views,
    ROUND(tu.avg_views_per_post, 2) as avg_views,
    CASE 
        WHEN tu.total_views > 1000 THEN 'High'
        WHEN tu.total_views > 500 THEN 'Medium'
        ELSE 'Low'
    END as engagement_level
FROM top_users tu;

-- Update operations with conditions
UPDATE posts 
SET view_count = view_count + 1 
WHERE id = 1;

UPDATE users 
SET last_login = NOW() 
WHERE username = 'john_doe';

-- Delete operations with safety checks
DELETE FROM comments 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR) 
    AND is_approved = FALSE;

-- Create stored procedure
DELIMITER //
CREATE PROCEDURE GetUserPostStats(IN user_id BIGINT)
BEGIN
    DECLARE total_posts INT DEFAULT 0;
    DECLARE total_views INT DEFAULT 0;
    
    SELECT COUNT(*), COALESCE(SUM(view_count), 0)
    INTO total_posts, total_views
    FROM posts 
    WHERE posts.user_id = user_id AND status = 'published';
    
    SELECT 
        u.username,
        u.email,
        total_posts as post_count,
        total_views as total_view_count,
        CASE 
            WHEN total_posts > 0 THEN ROUND(total_views / total_posts, 2)
            ELSE 0
        END as avg_views_per_post
    FROM users u
    WHERE u.id = user_id;
END //
DELIMITER ;

-- Create view for easy access
CREATE VIEW active_user_posts AS
SELECT 
    u.username,
    u.email,
    p.title,
    p.slug,
    p.view_count,
    p.created_at,
    p.published_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE u.is_active = TRUE 
    AND p.status = 'published'
ORDER BY p.published_at DESC;