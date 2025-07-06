// Midnight Dark Theme Demo
// This file demonstrates the theme's syntax highlighting across various JavaScript features

/**
 * Main application class demonstrating the theme's highlighting
 * @class Application
 */
class Application {
  constructor(name = "Midnight Dark Demo") {
    this.name = name;
    this.isRunning = false;
    this.users = [];
    this.config = {
      debug: true,
      apiUrl: "https://api.example.com",
      timeout: 5000,
    };
  }

  /**
   * Starts the application
   * @param {Object} options - Configuration options
   * @returns {Promise<boolean>} Success status
   */
  async start(options = {}) {
    try {
      console.log(`Starting ${this.name}...`);

      // Keywords and operators
      if (!this.isRunning && options.force !== true) {
        const result = await this.initialize();
        this.isRunning = result.success;

        // Template literals
        console.log(`Application ${this.name} started successfully!`);
        return true;
      }

      throw new Error("Application is already running");
    } catch (error) {
      console.error("Failed to start application:", error.message);
      return false;
    }
  }

  /**
   * Initializes the application
   * @private
   */
  async initialize() {
    // Array methods and arrow functions
    const tasks = [
      () => this.loadConfiguration(),
      () => this.connectToDatabase(),
      () => this.setupRoutes(),
    ];

    // Async/await and Promise handling
    const results = await Promise.all(
      tasks.map((task) => task().catch((err) => ({ error: err }))),
    );

    // Destructuring and spread operator
    const [configResult, dbResult, routesResult] = results;

    return {
      success: results.every((r) => !r.error),
      results: { ...configResult, ...dbResult, ...routesResult },
    };
  }

  /**
   * Demonstrates various data types and operations
   */
  demonstrateFeatures() {
    // Numbers and mathematical operations
    const pi = 3.14159;
    const radius = 10;
    const area = pi * radius ** 2;

    // Boolean operations
    const isValid = area > 0 && radius > 0;
    const status = isValid ? "valid" : "invalid";

    // Regular expressions
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testEmail = "user@example.com";

    // Object destructuring and methods
    const user = {
      id: 1,
      name: "John Doe",
      email: testEmail,
      roles: ["admin", "user"],
      profile: {
        age: 30,
        location: "New York",
      },
    };

    // Array methods chaining
    const adminUsers = this.users
      .filter((u) => u.roles.includes("admin"))
      .map((u) => ({ ...u, isAdmin: true }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // ES6 features
    const {
      name,
      email,
      profile: { age },
    } = user;
    const userInfo = `${name} (${email}) - Age: ${age}`;

    return {
      area,
      status,
      isValidEmail: emailPattern.test(email),
      userInfo,
      adminCount: adminUsers.length,
    };
  }

  /**
   * Event handling demonstration
   */
  setupEventHandlers() {
    // Event listeners and callbacks
    document.addEventListener("DOMContentLoaded", () => {
      console.log("DOM loaded");

      // Query selectors and DOM manipulation
      const button = document.querySelector("#start-button");
      const output = document.getElementById("output");

      button?.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
          const result = await this.start();
          output.textContent = result ? "Started!" : "Failed to start";
          output.className = result ? "success" : "error";
        } catch (error) {
          console.error("Event handler error:", error);
        }
      });
    });
  }

  /**
   * Utility methods and static functionality
   */
  static createInstance(config) {
    return new Application(config.name || "Default App");
  }

  // Getter and setter
  get status() {
    return this.isRunning ? "running" : "stopped";
  }

  set debugging(enabled) {
    this.config.debug = Boolean(enabled);
  }
}

// Export for module usage
export default Application;
export { Application };

// Usage example
(async () => {
  const app = Application.createInstance({
    name: "Midnight Dark Demo App",
  });

  await app.start({ force: false });
  console.log("Application status:", app.status);
})();
