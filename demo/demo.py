"""
Midnight Dark Theme Demo - Python
This file demonstrates the theme's syntax highlighting for Python code
"""

import asyncio
import json
from datetime import datetime
from typing import List, Dict, Optional, Union
from dataclasses import dataclass, field
from enum import Enum
import re


class Status(Enum):
    """Application status enumeration"""
    STOPPED = "stopped"
    STARTING = "starting"
    RUNNING = "running"
    ERROR = "error"


@dataclass
class User:
    """User data class demonstrating the theme's class and decorator highlighting"""
    id: int
    name: str
    email: str
    roles: List[str] = field(default_factory=list)
    profile: Dict[str, Union[str, int]] = field(default_factory=dict)
    created_at: datetime = field(default_factory=datetime.now)
    
    def __post_init__(self):
        """Validate user data after initialization"""
        if not self.email or not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', self.email):
            raise ValueError(f"Invalid email address: {self.email}")
        
        if not self.name.strip():
            raise ValueError("Name cannot be empty")
    
    @property
    def is_admin(self) -> bool:
        """Check if user has admin privileges"""
        return "admin" in self.roles
    
    def to_dict(self) -> Dict:
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'roles': self.roles,
            'profile': self.profile,
            'created_at': self.created_at.isoformat(),
            'is_admin': self.is_admin
        }


class Application:
    """Main application class demonstrating various Python features"""
    
    def __init__(self, name: str = "Midnight Dark Demo"):
        self.name = name
        self.status = Status.STOPPED
        self.users: List[User] = []
        self.config = {
            'debug': True,
            'api_url': 'https://api.example.com',
            'timeout': 5000,
            'max_retries': 3
        }
        self._start_time: Optional[datetime] = None
    
    def __repr__(self) -> str:
        return f"Application(name='{self.name}', status={self.status.value})"
    
    def __str__(self) -> str:
        return f"{self.name} - {self.status.value}"
    
    async def start(self, force: bool = False) -> bool:
        """
        Start the application
        
        Args:
            force: Whether to force start even if already running
            
        Returns:
            bool: True if started successfully, False otherwise
        """
        try:
            print(f"Starting {self.name}...")
            
            # Conditional logic and comparison operators
            if self.status != Status.STOPPED and not force:
                print(f"Application is already {self.status.value}")
                return False
            
            self.status = Status.STARTING
            
            # Await async initialization
            success = await self._initialize()
            
            if success:
                self.status = Status.RUNNING
                self._start_time = datetime.now()
                print(f"Application {self.name} started successfully!")
                return True
            else:
                self.status = Status.ERROR
                return False
                
        except Exception as error:
            print(f"Failed to start application: {error}")
            self.status = Status.ERROR
            return False
    
    async def _initialize(self) -> bool:
        """Initialize the application components"""
        tasks = [
            self._load_configuration(),
            self._connect_to_database(),
            self._setup_routes()
        ]
        
        # List comprehension and async operations
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Check if all tasks completed successfully
        return all(not isinstance(result, Exception) for result in results)
    
    async def _load_configuration(self) -> Dict:
        """Load application configuration"""
        await asyncio.sleep(0.1)  # Simulate async operation
        return {'config': 'loaded'}
    
    async def _connect_to_database(self) -> Dict:
        """Connect to database"""
        await asyncio.sleep(0.2)  # Simulate async operation
        return {'database': 'connected'}
    
    async def _setup_routes(self) -> Dict:
        """Setup application routes"""
        await asyncio.sleep(0.1)  # Simulate async operation
        return {'routes': 'configured'}
    
    def add_user(self, user_data: Dict) -> User:
        """Add a new user to the application"""
        user = User(**user_data)
        self.users.append(user)
        return user
    
    def get_admin_users(self) -> List[User]:
        """Get all users with admin privileges"""
        return [user for user in self.users if user.is_admin]
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """Find user by email address"""
        for user in self.users:
            if user.email == email:
                return user
        return None
    
    def demonstrate_features(self) -> Dict:
        """Demonstrate various Python features and syntax"""
        # Mathematical operations
        pi = 3.14159
        radius = 10
        area = pi * radius ** 2
        
        # String operations and f-strings
        greeting = f"Hello from {self.name}!"
        multiline_string = """
        This is a multiline string
        demonstrating the theme's string highlighting
        across multiple lines.
        """
        
        # List operations
        numbers = [1, 2, 3, 4, 5]
        squared = [n ** 2 for n in numbers if n % 2 == 0]
        
        # Dictionary operations
        user_stats = {
            'total_users': len(self.users),
            'admin_users': len(self.get_admin_users()),
            'active_users': sum(1 for user in self.users if user.profile.get('active', False))
        }
        
        # Set operations
        roles = {role for user in self.users for role in user.roles}
        
        # Tuple unpacking
        coordinates = (10, 20)
        x, y = coordinates
        
        # Lambda functions
        sort_by_name = lambda user: user.name.lower()
        sorted_users = sorted(self.users, key=sort_by_name)
        
        # Exception handling
        try:
            result = 10 / 0
        except ZeroDivisionError as e:
            result = f"Error: {e}"
        finally:
            print("Demonstration completed")
        
        return {
            'area': area,
            'greeting': greeting,
            'squared_numbers': squared,
            'user_stats': user_stats,
            'unique_roles': list(roles),
            'coordinates': {'x': x, 'y': y},
            'sorted_users_count': len(sorted_users),
            'error_demo': result
        }
    
    @staticmethod
    def create_instance(config: Dict) -> 'Application':
        """Create a new application instance"""
        return Application(config.get('name', 'Default App'))
    
    @classmethod
    def from_json(cls, json_data: str) -> 'Application':
        """Create application from JSON configuration"""
        config = json.loads(json_data)
        return cls.create_instance(config)
    
    @property
    def uptime(self) -> Optional[str]:
        """Get application uptime"""
        if self._start_time and self.status == Status.RUNNING:
            delta = datetime.now() - self._start_time
            return str(delta)
        return None


# Decorator example
def log_execution(func):
    """Decorator to log function execution"""
    def wrapper(*args, **kwargs):
        print(f"Executing {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"Completed {func.__name__}")
        return result
    return wrapper


@log_execution
def main():
    """Main function demonstrating the theme"""
    # Create application instance
    app = Application.create_instance({'name': 'Midnight Dark Demo App'})
    
    # Add sample users
    sample_users = [
        {
            'id': 1,
            'name': 'Alice Johnson',
            'email': 'alice@example.com',
            'roles': ['admin', 'user'],
            'profile': {'age': 28, 'location': 'New York'}
        },
        {
            'id': 2,
            'name': 'Bob Smith',
            'email': 'bob@example.com',
            'roles': ['user'],
            'profile': {'age': 32, 'location': 'California'}
        }
    ]
    
    for user_data in sample_users:
        app.add_user(user_data)
    
    # Run async start
    async def run_app():
        await app.start()
        print(f"Application status: {app.status.value}")
        
        # Demonstrate features
        features = app.demonstrate_features()
        print(f"Demo results: {json.dumps(features, indent=2)}")
    
    # Run the application
    asyncio.run(run_app())


if __name__ == "__main__":
    main()