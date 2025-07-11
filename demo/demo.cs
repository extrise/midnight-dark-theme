/**
 * Midnight Dark Theme Demo - C#
 * Demonstrates C# syntax highlighting with classes, attributes, and modern features
 */

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MidnightTheme.Demo
{
    /// <summary>
    /// User management system demonstrating C# syntax highlighting
    /// </summary>
    [Serializable]
    public class UserManager
    {
        private readonly List<User> _users;
        private readonly Dictionary<string, object> _config;
        
        public UserManager()
        {
            _users = new List<User>();
            _config = new Dictionary<string, object>
            {
                ["MaxUsers"] = 1000,
                ["EnableLogging"] = true,
                ["DefaultRole"] = UserRole.User
            };
        }
        
        /// <summary>
        /// Add a new user with validation
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<bool> AddUserAsync(string name, string email, UserRole? role = null)
        {
            try
            {
                // Validate input
                if (string.IsNullOrWhiteSpace(name))
                    throw new ArgumentException("Name cannot be empty", nameof(name));
                
                if (!IsValidEmail(email))
                    throw new ArgumentException("Invalid email format", nameof(email));
                
                // Create new user
                var user = new User
                {
                    Id = Guid.NewGuid(),
                    Name = name.Trim(),
                    Email = email.ToLowerInvariant(),
                    Role = role ?? UserRole.User,
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                };
                
                _users.Add(user);
                await LogUserCreationAsync(user);
                
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to add user: {ex.Message}");
                return false;
            }
        }
        
        /// <summary>
        /// Get users by role using LINQ
        /// </summary>
        public IEnumerable<User> GetUsersByRole(UserRole role)
        {
            return _users
                .Where(u => u.Role == role && u.IsActive)
                .OrderBy(u => u.Name)
                .ToList();
        }
        
        /// <summary>
        /// Validate email format
        /// </summary>
        private static bool IsValidEmail(string email)
        {
            return !string.IsNullOrEmpty(email) && 
                   new EmailAddressAttribute().IsValid(email);
        }
        
        /// <summary>
        /// Log user creation asynchronously
        /// </summary>
        private async Task LogUserCreationAsync(User user)
        {
            await Task.Run(() => 
            {
                Console.WriteLine($"User created: {user.Name} ({user.Email})");
            });
        }
    }
    
    /// <summary>
    /// User entity with attributes
    /// </summary>
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        public UserRole Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
    }
    
    /// <summary>
    /// User role enumeration
    /// </summary>
    public enum UserRole
    {
        User,
        Admin,
        Moderator
    }
}