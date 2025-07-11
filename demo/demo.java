/**
 * Midnight Dark Theme Demo - Java
 * Demonstrates Java syntax highlighting with classes, annotations, and modern features
 */

package com.midnighttheme.demo;

import java.util.*;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

/**
 * User management system demonstrating Java syntax highlighting
 */
@Entity
@Table(name = "users")
public class UserManager {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private List<User> users;
    private Map<String, Object> config;
    
    public UserManager() {
        this.users = new ArrayList<>();
        this.config = new HashMap<>();
        initializeConfig();
    }
    
    /**
     * Initialize default configuration
     */
    private void initializeConfig() {
        config.put("maxUsers", 1000);
        config.put("enableLogging", true);
        config.put("defaultRole", "USER");
    }
    
    /**
     * Add a new user with validation
     */
    @Transactional
    public boolean addUser(String name, String email, UserRole role) {
        try {
            // Validate input
            if (name == null || name.trim().isEmpty()) {
                throw new IllegalArgumentException("Name cannot be empty");
            }
            
            if (!isValidEmail(email)) {
                throw new IllegalArgumentException("Invalid email format");
            }
            
            // Create new user
            User user = User.builder()
                .name(name.trim())
                .email(email.toLowerCase())
                .role(role != null ? role : UserRole.USER)
                .createdAt(LocalDateTime.now())
                .active(true)
                .build();
            
            users.add(user);
            return true;
            
        } catch (Exception e) {
            System.err.println("Failed to add user: " + e.getMessage());
            return false;
        }
    }
    
    /**
     * Get users by role using streams
     */
    public List<User> getUsersByRole(UserRole role) {
        return users.stream()
            .filter(user -> user.getRole() == role)
            .filter(User::isActive)
            .sorted(Comparator.comparing(User::getName))
            .collect(Collectors.toList());
    }
    
    /**
     * Validate email format
     */
    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
    
    // Enum for user roles
    public enum UserRole {
        ADMIN("Administrator"),
        USER("Regular User"),
        MODERATOR("Moderator");
        
        private final String displayName;
        
        UserRole(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
}