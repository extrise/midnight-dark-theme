#!/usr/bin/env node

/**
 * Build script for Midnight Dark VS Code theme
 * This script validates the theme configuration and prepares for packaging
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ANSI color codes for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

/**
 * Log messages with colors
 */
function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Validate theme JSON structure
 */
function validateThemeJson() {
  log("🔍 Validating theme JSON...", "blue");

  try {
    const themePath = path.join(
      __dirname,
      "..",
      "themes",
      "midnight-dark-color-theme.json",
    );
    const themeContent = fs.readFileSync(themePath, "utf8");
    const theme = JSON.parse(themeContent);

    // Check required properties
    const requiredProps = ["name", "type", "colors", "tokenColors"];
    for (const prop of requiredProps) {
      if (!theme[prop]) {
        throw new Error(`Missing required property: ${prop}`);
      }
    }

    // Validate theme type
    if (theme.type !== "dark") {
      throw new Error(`Invalid theme type: ${theme.type}. Expected 'dark'`);
    }

    // Validate colors object
    const colorCount = Object.keys(theme.colors).length;
    if (colorCount < 50) {
      log(`⚠️  Warning: Only ${colorCount} UI colors defined`, "yellow");
    }

    // Validate tokenColors array
    if (!Array.isArray(theme.tokenColors)) {
      throw new Error("tokenColors must be an array");
    }

    if (theme.tokenColors.length < 10) {
      log(
        `⚠️  Warning: Only ${theme.tokenColors.length} token color rules defined`,
        "yellow",
      );
    }

    log("✅ Theme JSON validation passed", "green");
    return true;
  } catch (error) {
    log(`❌ Theme JSON validation failed: ${error.message}`, "red");
    return false;
  }
}

/**
 * Validate package.json
 */
function validatePackageJson() {
  log("🔍 Validating package.json...", "blue");

  try {
    const packagePath = path.join(__dirname, "..", "package.json");
    const packageContent = fs.readFileSync(packagePath, "utf8");
    const packageJson = JSON.parse(packageContent);

    // Check required VS Code extension properties
    const requiredProps = [
      "name",
      "displayName",
      "description",
      "version",
      "engines",
      "contributes",
    ];
    for (const prop of requiredProps) {
      if (!packageJson[prop]) {
        throw new Error(`Missing required property: ${prop}`);
      }
    }

    // Check VS Code engine version
    if (!packageJson.engines.vscode) {
      throw new Error("Missing vscode engine specification");
    }

    // Check theme contribution
    if (
      !packageJson.contributes.themes ||
      !Array.isArray(packageJson.contributes.themes)
    ) {
      throw new Error("Missing or invalid themes contribution");
    }

    if (packageJson.contributes.themes.length === 0) {
      throw new Error("No themes defined in contribution");
    }

    // Validate theme paths
    for (const theme of packageJson.contributes.themes) {
      const themePath = path.join(__dirname, "..", theme.path);
      if (!fs.existsSync(themePath)) {
        throw new Error(`Theme file not found: ${theme.path}`);
      }
    }

    log("✅ Package.json validation passed", "green");
    return true;
  } catch (error) {
    log(`❌ Package.json validation failed: ${error.message}`, "red");
    return false;
  }
}

/**
 * Check for required files
 */
function checkRequiredFiles() {
  log("🔍 Checking required files...", "blue");

  const requiredFiles = [
    "README.md",
    "LICENSE",
    "CHANGELOG.md",
    "themes/midnight-dark-color-theme.json",
  ];

  let allFilesExist = true;

  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, "..", file);
    if (!fs.existsSync(filePath)) {
      log(`❌ Missing required file: ${file}`, "red");
      allFilesExist = false;
    } else {
      log(`✅ Found: ${file}`, "green");
    }
  }

  return allFilesExist;
}

/**
 * Generate theme statistics
 */
function generateStats() {
  log("📊 Generating theme statistics...", "blue");

  try {
    const themePath = path.join(
      __dirname,
      "..",
      "themes",
      "midnight-dark-color-theme.json",
    );
    const themeContent = fs.readFileSync(themePath, "utf8");
    const theme = JSON.parse(themeContent);

    const stats = {
      name: theme.name,
      type: theme.type,
      uiColors: Object.keys(theme.colors).length,
      tokenRules: theme.tokenColors.length,
      totalScopes: theme.tokenColors.reduce((total, rule) => {
        return total + (Array.isArray(rule.scope) ? rule.scope.length : 1);
      }, 0),
    };

    log("📈 Theme Statistics:", "cyan");
    log(`   Name: ${stats.name}`, "bright");
    log(`   Type: ${stats.type}`, "bright");
    log(`   UI Colors: ${stats.uiColors}`, "bright");
    log(`   Token Rules: ${stats.tokenRules}`, "bright");
    log(`   Total Scopes: ${stats.totalScopes}`, "bright");

    return stats;
  } catch (error) {
    log(`❌ Failed to generate statistics: ${error.message}`, "red");
    return null;
  }
}

/**
 * Clean build artifacts
 */
function clean() {
  log("🧹 Cleaning build artifacts...", "blue");

  try {
    const artifactsToClean = ["*.vsix", "node_modules/.cache", ".vscode-test"];

    for (const pattern of artifactsToClean) {
      try {
        execSync(`rm -rf ${pattern}`, { cwd: path.join(__dirname, "..") });
      } catch (error) {
        // Ignore errors for non-existent files
      }
    }

    log("✅ Clean completed", "green");
  } catch (error) {
    log(`❌ Clean failed: ${error.message}`, "red");
  }
}

/**
 * Main build function
 */
function build() {
  log("🚀 Building Midnight Dark Theme...", "magenta");
  log("=" * 50, "magenta");

  let success = true;

  // Clean previous builds
  clean();

  // Run validations
  if (!validatePackageJson()) success = false;
  if (!validateThemeJson()) success = false;
  if (!checkRequiredFiles()) success = false;

  // Generate statistics
  const stats = generateStats();

  if (success) {
    log("", "reset");
    log("✅ Build completed successfully!", "green");
    log("", "reset");
    log("Next steps:", "cyan");
    log('  1. Run "npm run package" to create .vsix file', "bright");
    log('  2. Run "npm run publish" to publish to marketplace', "bright");
    log("  3. Test the theme in VS Code Extension Development Host", "bright");
  } else {
    log("", "reset");
    log("❌ Build failed! Please fix the errors above.", "red");
    process.exit(1);
  }
}

// Run the build if this script is executed directly
if (require.main === module) {
  build();
}

module.exports = {
  build,
  validateThemeJson,
  validatePackageJson,
  checkRequiredFiles,
  generateStats,
  clean,
};
