#!/usr/bin/env node

/**
 * Comprehensive test suite for Midnight Dark VS Code theme
 * This script runs various tests to ensure theme quality, success/failed rate
 */

const fs = require("fs");
const path = require("path");

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
 * Test JSON syntax and structure
 */
function testJsonSyntax() {
  log("📝 Testing JSON syntax...", "blue");

  try {
    const themePath = path.join(
      __dirname,
      "..",
      "themes",
      "midnight-dark-color-theme.json",
    );

    if (!fs.existsSync(themePath)) {
      throw new Error("Theme file not found");
    }

    const themeContent = fs.readFileSync(themePath, "utf8");

    // Check for common JSON syntax issues
    if (themeContent.includes("//")) {
      throw new Error("JSON contains invalid comments (// style)");
    }

    if (themeContent.includes("/*")) {
      throw new Error("JSON contains invalid comments (/* */ style)");
    }

    // Parse JSON to check for syntax errors
    const theme = JSON.parse(themeContent);

    // Validate basic structure
    if (!theme.name || typeof theme.name !== "string") {
      throw new Error("Missing or invalid theme name");
    }

    if (!theme.type || theme.type !== "dark") {
      throw new Error("Missing or invalid theme type");
    }

    if (!theme.colors || typeof theme.colors !== "object") {
      throw new Error("Missing or invalid colors object");
    }

    if (!theme.tokenColors || !Array.isArray(theme.tokenColors)) {
      throw new Error("Missing or invalid tokenColors array");
    }

    // Check if JSON is properly formatted
    const formatted = JSON.stringify(theme, null, 2);
    const normalizedOriginal = themeContent.replace(/\r\n/g, "\n").trim();
    const normalizedFormatted = formatted.replace(/\r\n/g, "\n").trim();

    if (normalizedOriginal !== normalizedFormatted) {
      log("   ⚠️  JSON formatting could be improved", "yellow");
    } else {
      log("   ✅ JSON is properly formatted", "green");
    }

    log("✅ JSON syntax test passed", "green");
    return true;
  } catch (error) {
    log(`❌ JSON syntax test failed: ${error.message}`, "red");
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

    if (!fs.existsSync(packagePath)) {
      throw new Error("package.json not found");
    }

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
      if (!theme.path) {
        throw new Error("Theme missing path property");
      }

      const themePath = path.join(__dirname, "..", theme.path);
      if (!fs.existsSync(themePath)) {
        throw new Error(`Theme file not found: ${theme.path}`);
      }

      if (!theme.label) {
        throw new Error("Theme missing label property");
      }

      if (!theme.uiTheme) {
        throw new Error("Theme missing uiTheme property");
      }
    }

    // Check publisher
    if (!packageJson.publisher) {
      log("   ⚠️  Publisher not specified", "yellow");
    }

    // Check author
    if (!packageJson.author) {
      log("   ⚠️  Author not specified", "yellow");
    }

    log("✅ Package.json validation passed", "green");
    return true;
  } catch (error) {
    log(`❌ Package.json validation failed: ${error.message}`, "red");
    return false;
  }
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
      log(
        `   ⚠️  Only ${colorCount} UI colors defined (recommended: 50+)`,
        "yellow",
      );
    } else {
      log(`   ✅ ${colorCount} UI colors defined`, "green");
    }

    // Validate tokenColors array
    if (!Array.isArray(theme.tokenColors)) {
      throw new Error("tokenColors must be an array");
    }

    if (theme.tokenColors.length < 10) {
      log(
        `   ⚠️  Only ${theme.tokenColors.length} token color rules defined (recommended: 10+)`,
        "yellow",
      );
    } else {
      log(
        `   ✅ ${theme.tokenColors.length} token color rules defined`,
        "green",
      );
    }

    // Validate each token color rule
    for (let i = 0; i < theme.tokenColors.length; i++) {
      const rule = theme.tokenColors[i];

      if (!rule.name) {
        throw new Error(`Token color rule ${i} missing name`);
      }

      if (!rule.scope) {
        throw new Error(`Token color rule "${rule.name}" missing scope`);
      }

      if (!rule.settings) {
        throw new Error(`Token color rule "${rule.name}" missing settings`);
      }

      if (!rule.settings.foreground) {
        log(
          `   ⚠️  Token color rule "${rule.name}" missing foreground color`,
          "yellow",
        );
      }
    }

    log("✅ Theme JSON validation passed", "green");
    return true;
  } catch (error) {
    log(`❌ Theme JSON validation failed: ${error.message}`, "red");
    return false;
  }
}

// ↓ NEW helper
function getThemePaths() {
  // package.json lives one level above scripts/
  const pkgPath = path.join(__dirname, "..", "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

  // returns ["themes/midnight-dark-color-theme.json", ...]
  return pkg.contributes.themes.map((t) => t.path);
}

/**
 * Check for required files
 */
function checkRequiredFiles() {
  log("🔍 Checking required files...", "blue");

  const requiredFiles = [
    ...new Set([
      "README.md",
      "LICENSE",
      "CHANGELOG.md",
      ...getThemePaths(), // ← all three JSON files now included
      "package.json",
      // "icon.png", ".gitignore", "DEVELOP.md", // make mandatory if you prefer
    ]),
  ];

  const optionalFiles = ["icon.png", ".gitignore", "DEVELOP.md"];

  let allRequiredExist = true;

  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, "..", file);
    if (!fs.existsSync(filePath)) {
      log(`❌ Missing required file: ${file}`, "red");
      allRequiredExist = false;
    } else {
      log(`   ✅ Found: ${file}`, "green");
    }
  }

  for (const file of optionalFiles) {
    const filePath = path.join(__dirname, "..", file);
    if (!fs.existsSync(filePath)) {
      log(`   ⚠️  Optional file missing: ${file}`, "yellow");
    } else {
      log(`   ✅ Found: ${file}`, "green");
    }
  }

  log(
    allRequiredExist
      ? "✅ Required files check passed"
      : "❌ Required files check failed",
    allRequiredExist ? "green" : "red",
  );

  return allRequiredExist;
}

/**
 * Test color contrast ratios
 */
function testColorContrast() {
  log("🎨 Testing color contrast...", "blue");

  try {
    const themePath = path.join(
      __dirname,
      "..",
      "themes",
      "midnight-dark-color-theme.json",
    );
    const themeContent = fs.readFileSync(themePath, "utf8");
    const theme = JSON.parse(themeContent);

    // Helper function to convert hex to RGB
    function hexToRgb(hex) {
      if (!hex || typeof hex !== "string") return null;

      // Remove alpha channel if present
      hex = hex.replace(/[^#0-9A-Fa-f]/g, "");
      if (hex.length > 7) hex = hex.substring(0, 7);

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }

    // Helper function to calculate relative luminance
    function relativeLuminance(rgb) {
      if (!rgb) return 0;
      const { r, g, b } = rgb;
      const [rs, gs, bs] = [r, g, b].map((c) => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    // Helper function to calculate contrast ratio
    function contrastRatio(rgb1, rgb2) {
      if (!rgb1 || !rgb2) return 0;
      const lum1 = relativeLuminance(rgb1);
      const lum2 = relativeLuminance(rgb2);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }

    const backgroundColor = hexToRgb(
      theme.colors["editor.background"] || "#1a1b26",
    );
    const foregroundColor = hexToRgb(
      theme.colors["editor.foreground"] || "#c0caf5",
    );

    if (backgroundColor && foregroundColor) {
      const ratio = contrastRatio(backgroundColor, foregroundColor);
      log(`   📊 Background vs Foreground: ${ratio.toFixed(2)}:1`, "bright");

      if (ratio >= 7) {
        log("   ✅ AAA compliance (excellent)", "green");
      } else if (ratio >= 4.5) {
        log("   ✅ AA compliance (good)", "green");
      } else {
        log("   ⚠️  Below AA compliance (consider improving)", "yellow");
      }
    } else {
      log("   ⚠️  Could not parse background or foreground colors", "yellow");
    }

    // Test other important color combinations
    const testPairs = [
      ["activityBar.background", "activityBar.foreground"],
      ["sideBar.background", "sideBar.foreground"],
      ["statusBar.background", "statusBar.foreground"],
      ["tab.activeBackground", "tab.activeForeground"],
    ];

    let passedPairs = 0;
    for (const [bg, fg] of testPairs) {
      const bgColor = hexToRgb(theme.colors[bg]);
      const fgColor = hexToRgb(theme.colors[fg]);

      if (bgColor && fgColor) {
        const ratio = contrastRatio(bgColor, fgColor);
        if (ratio >= 4.5) {
          passedPairs++;
        }
      }
    }

    log(
      `   📈 UI contrast pairs: ${passedPairs}/${testPairs.length} passed`,
      "bright",
    );

    log("✅ Color contrast test completed", "green");
    return true;
  } catch (error) {
    log(`❌ Color contrast test failed: ${error.message}`, "red");
    return false;
  }
}

/**
 * Test theme completeness
 */
function testThemeCompleteness() {
  log("🔍 Testing theme completeness...", "blue");

  try {
    const themePath = path.join(
      __dirname,
      "..",
      "themes",
      "midnight-dark-color-theme.json",
    );
    const themeContent = fs.readFileSync(themePath, "utf8");
    const theme = JSON.parse(themeContent);

    // Essential UI colors that should be defined
    const essentialColors = [
      "editor.background",
      "editor.foreground",
      "editor.selectionBackground",
      "editor.lineHighlightBackground",
      "sideBar.background",
      "sideBar.foreground",
      "activityBar.background",
      "activityBar.foreground",
      "statusBar.background",
      "statusBar.foreground",
      "tab.activeBackground",
      "tab.activeForeground",
      "tab.inactiveBackground",
      "tab.inactiveForeground",
    ];

    let missingColors = [];
    for (const color of essentialColors) {
      if (!theme.colors[color]) {
        missingColors.push(color);
      }
    }

    if (missingColors.length > 0) {
      log(
        `   ⚠️  Missing essential colors: ${missingColors.join(", ")}`,
        "yellow",
      );
    } else {
      log("   ✅ All essential UI colors defined", "green");
    }

    // Check for common language scopes
    const commonScopes = [
      "comment",
      "keyword",
      "string",
      "constant",
      "entity.name.function",
      "variable",
    ];

    let missingScopes = [];
    for (const scope of commonScopes) {
      const found = theme.tokenColors.some((rule) => {
        if (Array.isArray(rule.scope)) {
          return rule.scope.some((s) => s.includes(scope));
        } else {
          return rule.scope && rule.scope.includes(scope);
        }
      });

      if (!found) {
        missingScopes.push(scope);
      }
    }

    if (missingScopes.length > 0) {
      log(
        `   ⚠️  Missing common scopes: ${missingScopes.join(", ")}`,
        "yellow",
      );
    } else {
      log("   ✅ All common syntax scopes covered", "green");
    }

    // Check for language-specific scopes
    const languageScopes = [
      "entity.name.function.decorator.python",
      "variable.language.this.js",
      "support.type.property-name.css",
      "markup.heading",
    ];

    let foundLanguageScopes = 0;
    for (const scope of languageScopes) {
      const found = theme.tokenColors.some((rule) => {
        if (Array.isArray(rule.scope)) {
          return rule.scope.includes(scope);
        } else {
          return rule.scope === scope;
        }
      });

      if (found) {
        foundLanguageScopes++;
      }
    }

    log(
      `   📊 Language-specific scopes: ${foundLanguageScopes}/${languageScopes.length} found`,
      "bright",
    );

    log("✅ Theme completeness test completed", "green");
    return true;
  } catch (error) {
    log(`❌ Theme completeness test failed: ${error.message}`, "red");
    return false;
  }
}

/**
 * Test for color consistency
 */
function testColorConsistency() {
  log("🎯 Testing color consistency...", "blue");

  try {
    const themePath = path.join(
      __dirname,
      "..",
      "themes",
      "midnight-dark-color-theme.json",
    );
    const themeContent = fs.readFileSync(themePath, "utf8");
    const theme = JSON.parse(themeContent);

    // Define the expected theme colors
    const expectedColors = {
      primary: "#c792ea", // Purple
      secondary: "#89ddff", // Cyan
      accent: "#c3e88d", // Green
      strings: "#f07178", // Pink
      comments: "#5c6370", // Gray
      background: "#1a1b26", // Dark blue
    };

    // Extract all unique colors from the theme
    const usedColors = new Set();

    // Add colors from UI
    Object.values(theme.colors).forEach((color) => {
      if (typeof color === "string" && color.startsWith("#")) {
        // Remove alpha channel for comparison
        const baseColor = color.length > 7 ? color.substring(0, 7) : color;
        usedColors.add(baseColor.toLowerCase());
      }
    });

    // Add colors from token colors
    theme.tokenColors.forEach((rule) => {
      if (rule.settings && rule.settings.foreground) {
        const color = rule.settings.foreground;
        if (typeof color === "string" && color.startsWith("#")) {
          const baseColor = color.length > 7 ? color.substring(0, 7) : color;
          usedColors.add(baseColor.toLowerCase());
        }
      }
    });

    // Check if expected colors are being used
    let consistencyScore = 0;
    const totalExpected = Object.keys(expectedColors).length;

    for (const [name, color] of Object.entries(expectedColors)) {
      if (usedColors.has(color.toLowerCase())) {
        consistencyScore++;
        log(`   ✅ ${name} color (${color}) is used`, "green");
      } else {
        log(`   ⚠️  ${name} color (${color}) is not used`, "yellow");
      }
    }

    const percentage = (consistencyScore / totalExpected) * 100;
    log(
      `   📊 Color consistency: ${percentage.toFixed(1)}% (${consistencyScore}/${totalExpected})`,
      "bright",
    );

    // Check for color variations (alpha channels, lighter/darker versions)
    const colorVariations = new Set();
    Object.values(theme.colors).forEach((color) => {
      if (typeof color === "string" && color.startsWith("#")) {
        const baseColor = color.length > 7 ? color.substring(0, 7) : color;
        for (const expectedColor of Object.values(expectedColors)) {
          if (baseColor.toLowerCase() === expectedColor.toLowerCase()) {
            colorVariations.add(color);
          }
        }
      }
    });

    log(`   🎨 Color variations found: ${colorVariations.size}`, "bright");

    if (percentage >= 80) {
      log("✅ Color consistency test passed", "green");
    } else {
      log("⚠️  Color consistency could be improved", "yellow");
    }

    return true;
  } catch (error) {
    log(`❌ Color consistency test failed: ${error.message}`, "red");
    return false;
  }
}

/**
 * Performance test - check theme size and structure
 */
function testPerformance() {
  log("⚡ Testing performance...", "blue");

  try {
    const themePath = path.join(
      __dirname,
      "..",
      "themes",
      "midnight-dark-color-theme.json",
    );
    const stats = fs.statSync(themePath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    log(`   📏 Theme file size: ${sizeKB} KB`, "bright");

    if (stats.size > 100 * 1024) {
      // 100KB
      log("   ⚠️  Theme file is quite large (>100KB)", "yellow");
    } else if (stats.size > 50 * 1024) {
      // 50KB
      log("   ✅ Theme file size is reasonable (50-100KB)", "green");
    } else {
      log("   ✅ Theme file size is optimal (<50KB)", "green");
    }

    // Check JSON parsing performance
    const startTime = process.hrtime.bigint();
    const themeContent = fs.readFileSync(themePath, "utf8");
    JSON.parse(themeContent);
    const endTime = process.hrtime.bigint();

    const parseTimeMs = Number(endTime - startTime) / 1000000;
    log(`   ⚡ JSON parse time: ${parseTimeMs.toFixed(2)}ms`, "bright");

    if (parseTimeMs > 10) {
      log("   ⚠️  JSON parsing is slow (>10ms)", "yellow");
    } else {
      log("   ✅ JSON parsing is fast (<10ms)", "green");
    }

    log("✅ Performance test completed", "green");
    return true;
  } catch (error) {
    log(`❌ Performance test failed: ${error.message}`, "red");
    return false;
  }
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
      fileSize: fs.statSync(themePath).size,
    };

    log("📈 Theme Statistics:", "cyan");
    log(`   Name: ${stats.name}`, "bright");
    log(`   Type: ${stats.type}`, "bright");
    log(`   UI Colors: ${stats.uiColors}`, "bright");
    log(`   Token Rules: ${stats.tokenRules}`, "bright");
    log(`   Total Scopes: ${stats.totalScopes}`, "bright");
    log(`   File Size: ${(stats.fileSize / 1024).toFixed(2)} KB`, "bright");

    return stats;
  } catch (error) {
    log(`❌ Failed to generate statistics: ${error.message}`, "red");
    return null;
  }
}

/**
 * Main test function
 */
function runTests() {
  log("🧪 Running Midnight Dark Theme Tests...", "magenta");
  log("=".repeat(50), "magenta");

  const tests = [
    { name: "JSON Syntax", fn: testJsonSyntax },
    { name: "Package Validation", fn: validatePackageJson },
    { name: "Theme Validation", fn: validateThemeJson },
    { name: "Required Files", fn: checkRequiredFiles },
    { name: "Color Contrast", fn: testColorContrast },
    { name: "Theme Completeness", fn: testThemeCompleteness },
    { name: "Color Consistency", fn: testColorConsistency },
    { name: "Performance", fn: testPerformance },
  ];

  let passed = 0;
  let failed = 0;
  const results = [];

  for (const test of tests) {
    log("", "reset");
    try {
      const startTime = Date.now();
      const result = test.fn();
      const duration = Date.now() - startTime;

      results.push({
        name: test.name,
        passed: result,
        duration,
      });

      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      log(`❌ Test "${test.name}" threw an error: ${error.message}`, "red");
      results.push({
        name: test.name,
        passed: false,
        error: error.message,
      });
      failed++;
    }
  }

  // Generate statistics
  log("", "reset");
  const stats = generateStats();

  log("", "reset");
  log("📊 Test Results:", "cyan");
  log(`   ✅ Passed: ${passed}`, "green");
  log(`   ❌ Failed: ${failed}`, failed > 0 ? "red" : "green");
  log(
    `   📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`,
    "bright",
  );

  // Show individual test results
  log("", "reset");
  log("📋 Individual Results:", "cyan");
  for (const result of results) {
    const status = result.passed ? "✅" : "❌";
    const duration = result.duration ? ` (${result.duration}ms)` : "";
    log(
      `   ${status} ${result.name}${duration}`,
      result.passed ? "green" : "red",
    );
    if (result.error) {
      log(`      Error: ${result.error}`, "red");
    }
  }

  if (failed === 0) {
    log("", "reset");
    log("🎉 All tests passed! Theme is ready for release.", "green");
    log("", "reset");
    log("Next steps:", "cyan");
    log('  1. Run "npm run package" to create .vsix file', "bright");
    log('  2. Run "npm run publish" to publish to marketplace', "bright");
    log("  3. Test the theme in VS Code Extension Development Host", "bright");
    return true;
  } else {
    log("", "reset");
    log("❌ Some tests failed. Please fix the issues before releasing.", "red");
    return false;
  }
}

// Run the tests if this script is executed directly
if (require.main === module) {
  const success = runTests();
  process.exit(success ? 0 : 1);
}

module.exports = {
  runTests,
  testJsonSyntax,
  validatePackageJson,
  validateThemeJson,
  checkRequiredFiles,
  testColorContrast,
  testThemeCompleteness,
  testColorConsistency,
  testPerformance,
  generateStats,
};
