<?php
/**
 * Midnight Dark Theme Demo - PHP
 * Demonstrates PHP syntax highlighting with classes, functions, and modern features
 */

namespace MidnightTheme\Demo;

use DateTime;
use Exception;

/**
 * User management class demonstrating PHP syntax highlighting
 */
class UserManager
{
    private array $users = [];
    private string $dbConnection;
    
    public function __construct(string $connection)
    {
        $this->dbConnection = $connection;
    }
    
    /**
     * Add a new user with validation
     */
    public function addUser(array $userData): bool
    {
        try {
            // Validate required fields
            if (empty($userData['email']) || empty($userData['name'])) {
                throw new Exception('Email and name are required');
            }
            
            // Create user object
            $user = [
                'id' => uniqid(),
                'name' => trim($userData['name']),
                'email' => filter_var($userData['email'], FILTER_VALIDATE_EMAIL),
                'created_at' => new DateTime(),
                'roles' => $userData['roles'] ?? ['user'],
                'active' => true
            ];
            
            // Hash password if provided
            if (!empty($userData['password'])) {
                $user['password'] = password_hash($userData['password'], PASSWORD_DEFAULT);
            }
            
            $this->users[] = $user;
            return true;
            
        } catch (Exception $e) {
            error_log("Failed to add user: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Find users by role with filtering
     */
    public function getUsersByRole(string $role): array
    {
        return array_filter($this->users, function($user) use ($role) {
            return in_array($role, $user['roles']) && $user['active'];
        });
    }
}

// Usage example
$userManager = new UserManager('mysql://localhost:3306/demo');

$newUser = [
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'password' => 'secure123',
    'roles' => ['admin', 'user']
];

if ($userManager->addUser($newUser)) {
    echo "User created successfully!\n";
} else {
    echo "Failed to create user.\n";
}

// Demonstrate array operations and string interpolation
$adminUsers = $userManager->getUsersByRole('admin');
echo "Found " . count($adminUsers) . " admin users\n";

foreach ($adminUsers as $user) {
    echo "Admin: {$user['name']} ({$user['email']})\n";
}
?>