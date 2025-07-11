// Midnight Dark Theme Demo - Go
// Demonstrates Go syntax highlighting with functions, types, and modern features

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"time"
)

// User represents a user in the system
type User struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Role      UserRole  `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	IsActive  bool      `json:"is_active"`
}

// UserRole defines user permission levels
type UserRole string

const (
	RoleUser      UserRole = "user"
	RoleAdmin     UserRole = "admin"
	RoleModerator UserRole = "moderator"
)

// UserManager manages user operations
type UserManager struct {
	users  []User
	config map[string]interface{}
}

// NewUserManager creates a new user manager instance
func NewUserManager() *UserManager {
	return &UserManager{
		users: make([]User, 0),
		config: map[string]interface{}{
			"maxUsers":     1000,
			"enableLogging": true,
			"defaultRole":  RoleUser,
		},
	}
}

// AddUser adds a new user with validation
func (um *UserManager) AddUser(name, email string, role UserRole) error {
	// Validate input
	if strings.TrimSpace(name) == "" {
		return fmt.Errorf("name cannot be empty")
	}
	
	if !isValidEmail(email) {
		return fmt.Errorf("invalid email format: %s", email)
	}
	
	// Create new user
	user := User{
		ID:        generateID(),
		Name:      strings.TrimSpace(name),
		Email:     strings.ToLower(email),
		Role:      role,
		CreatedAt: time.Now(),
		IsActive:  true,
	}
	
	um.users = append(um.users, user)
	
	if um.config["enableLogging"].(bool) {
		log.Printf("User created: %s (%s)", user.Name, user.Email)
	}
	
	return nil
}

// GetUsersByRole returns users filtered by role
func (um *UserManager) GetUsersByRole(role UserRole) []User {
	var result []User
	
	for _, user := range um.users {
		if user.Role == role && user.IsActive {
			result = append(result, user)
		}
	}
	
	return result
}

// ToJSON converts user manager to JSON
func (um *UserManager) ToJSON() ([]byte, error) {
	return json.MarshalIndent(um.users, "", "  ")
}

// isValidEmail validates email format
func isValidEmail(email string) bool {
	return strings.Contains(email, "@") && strings.Contains(email, ".")
}

// generateID generates a simple ID
func generateID() string {
	return fmt.Sprintf("user_%d", time.Now().UnixNano())
}

// main demonstrates the user manager
func main() {
	um := NewUserManager()
	
	// Add sample users
	users := []struct {
		name  string
		email string
		role  UserRole
	}{
		{"John Doe", "john@example.com", RoleAdmin},
		{"Jane Smith", "jane@example.com", RoleUser},
		{"Bob Wilson", "bob@example.com", RoleModerator},
	}
	
	for _, u := range users {
		if err := um.AddUser(u.name, u.email, u.role); err != nil {
			log.Printf("Error adding user: %v", err)
		}
	}
	
	// Get admin users
	adminUsers := um.GetUsersByRole(RoleAdmin)
	fmt.Printf("Found %d admin users\n", len(adminUsers))
	
	// Print JSON representation
	if jsonData, err := um.ToJSON(); err == nil {
		fmt.Println("Users JSON:")
		fmt.Println(string(jsonData))
	}
}