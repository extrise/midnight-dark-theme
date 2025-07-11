// Midnight Dark Theme Demo - Rust
// Demonstrates Rust syntax highlighting with structs, enums, and modern features

use std::collections::HashMap;
use std::fmt;
use std::time::SystemTime;

/// User role enumeration
#[derive(Debug, Clone, PartialEq)]
pub enum UserRole {
    User,
    Admin,
    Moderator,
}

impl fmt::Display for UserRole {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            UserRole::User => write!(f, "User"),
            UserRole::Admin => write!(f, "Admin"),
            UserRole::Moderator => write!(f, "Moderator"),
        }
    }
}

/// User struct with validation
#[derive(Debug, Clone)]
pub struct User {
    pub id: String,
    pub name: String,
    pub email: String,
    pub role: UserRole,
    pub created_at: SystemTime,
    pub is_active: bool,
}

impl User {
    /// Create a new user with validation
    pub fn new(name: String, email: String, role: UserRole) -> Result<Self, String> {
        if name.trim().is_empty() {
            return Err("Name cannot be empty".to_string());
        }
        
        if !Self::is_valid_email(&email) {
            return Err(format!("Invalid email format: {}", email));
        }
        
        Ok(User {
            id: Self::generate_id(),
            name: name.trim().to_string(),
            email: email.to_lowercase(),
            role,
            created_at: SystemTime::now(),
            is_active: true,
        })
    }
    
    /// Validate email format
    fn is_valid_email(email: &str) -> bool {
        email.contains('@') && email.contains('.')
    }
    
    /// Generate a simple ID
    fn generate_id() -> String {
        format!("user_{}", SystemTime::now()
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_nanos())
    }
}

/// User manager with configuration
pub struct UserManager {
    users: Vec<User>,
    config: HashMap<String, String>,
}

impl UserManager {
    /// Create a new user manager
    pub fn new() -> Self {
        let mut config = HashMap::new();
        config.insert("max_users".to_string(), "1000".to_string());
        config.insert("enable_logging".to_string(), "true".to_string());
        
        UserManager {
            users: Vec::new(),
            config,
        }
    }
    
    /// Add a user to the manager
    pub fn add_user(&mut self, name: String, email: String, role: UserRole) -> Result<(), String> {
        let user = User::new(name, email, role)?;
        
        if self.config.get("enable_logging") == Some(&"true".to_string()) {
            println!("User created: {} ({})", user.name, user.email);
        }
        
        self.users.push(user);
        Ok(())
    }
    
    /// Get users by role
    pub fn get_users_by_role(&self, role: &UserRole) -> Vec<&User> {
        self.users
            .iter()
            .filter(|user| &user.role == role && user.is_active)
            .collect()
    }
    
    /// Get total user count
    pub fn user_count(&self) -> usize {
        self.users.len()
    }
}

// Macro for creating users easily
macro_rules! create_user {
    ($name:expr, $email:expr, $role:expr) => {
        User::new($name.to_string(), $email.to_string(), $role)
    };
}

/// Main function demonstrating the user manager
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut user_manager = UserManager::new();
    
    // Add sample users
    let users = vec![
        ("John Doe", "john@example.com", UserRole::Admin),
        ("Jane Smith", "jane@example.com", UserRole::User),
        ("Bob Wilson", "bob@example.com", UserRole::Moderator),
    ];
    
    for (name, email, role) in users {
        match user_manager.add_user(name.to_string(), email.to_string(), role) {
            Ok(_) => println!("Successfully added user: {}", name),
            Err(e) => eprintln!("Error adding user {}: {}", name, e),
        }
    }
    
    // Get admin users
    let admin_users = user_manager.get_users_by_role(&UserRole::Admin);
    println!("Found {} admin users", admin_users.len());
    
    // Print user statistics
    println!("Total users: {}", user_manager.user_count());
    
    Ok(())
}