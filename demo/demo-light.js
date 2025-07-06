// Midnight Light Theme Demo
// This file demonstrates the theme's syntax highlighting in light mode

/**
 * Main application class demonstrating the light theme's highlighting
 * @class LightApplication
 */
class LightApplication {
  constructor(name = "Midnight Light Demo") {
    this.name = name;
    this.isRunning = false;
    this.users = [];
    this.config = {
      debug: true,
      apiUrl: "https://api.example.com",
      timeout: 5000,
      theme: "light",
    };
  }

  /**
   * Starts the application in light mode
   * @param {Object} options - Configuration options
   * @returns {Promise<boolean>} Success status
   */
  async start(options = {}) {
    try {
      console.log(`Starting ${this.name} in light mode...`);

      // Keywords and operators in light theme
      if (!this.isRunning && options.force !== true) {
        const result = await this.initialize();
        this.isRunning = result.success;

        // Template literals with light theme colors
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
   * Demonstrates light theme color palette
   */
  demonstrateLightColors() {
    // Numbers and constants in light theme
    const lightColors = {
      background: "#fafafa",
      foreground: "#2e3440",
      purple: "#7c3aed", // Functions, variables
      cyan: "#0ea5e9", // Keywords, operators
      green: "#059669", // Constants, types
      pink: "#be185d", // Strings
      gray: "#6b7280", // Comments
    };

    // String literals in light theme
    const welcomeMessage = "Welcome to Midnight Light Theme!";
    const description = `A beautiful light variant with ${Object.keys(lightColors).length} carefully chosen colors`;

    // Array methods and operations
    const features = [
      "Clean white background",
      "High contrast text",
      "Vibrant accent colors",
      "Excellent readability",
    ];

    // Object destructuring
    const { background, foreground, purple } = lightColors;

    return {
      colors: lightColors,
      message: welcomeMessage,
      description,
      features: features.map((f) => f.toUpperCase()),
      primaryColors: { background, foreground, purple },
    };
  }

  /**
   * Light theme specific functionality
   */
  lightThemeFeatures() {
    // Boolean and conditional logic
    const isDarkMode = false;
    const isLightMode = !isDarkMode;

    // Mathematical operations
    const contrastRatio = 21; // Perfect contrast for light theme
    const readabilityScore = 95.5;

    // Regular expressions
    const colorPattern = /^#[0-9A-Fa-f]{6}$/;
    const testColor = "#7c3aed";

    // ES6 features in light theme
    const themeConfig = {
      name: "Midnight Light",
      type: "light",
      accessibility: {
        contrast: contrastRatio,
        readability: readabilityScore,
        wcagCompliant: true,
      },
    };

    return {
      mode: isLightMode ? "light" : "dark",
      isValidColor: colorPattern.test(testColor),
      config: { ...themeConfig },
      performance: `${readabilityScore}% readable`,
    };
  }
}

// Export for module usage
export default LightApplication;
export { LightApplication };

// Usage example with light theme
(async () => {
  const lightApp = new LightApplication("Midnight Light Demo");

  await lightApp.start({ theme: "light" });

  const colors = lightApp.demonstrateLightColors();
  const features = lightApp.lightThemeFeatures();

  console.log("Light Theme Demo:", { colors, features });
})();
