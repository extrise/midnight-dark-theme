# Development Guide - Midnight Dark Theme

This document provides comprehensive information about developing, building, and maintaining the Midnight Dark VS Code theme extension.

## Development Setup

### Prerequisites

- [x] **Node.js** v18.0.0 or higher
- [x] **npm** v8.0.0 or higher
- [x] **VS Code** v1.74.0 or higher
- [x] **Git** for version control
- [x] **VS Code Extension Manager (vsce)** for packaging

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/nayandas69/midnight-dark-theme.git
   cd midnight-dark-theme
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install VS Code Extension Manager**

   ```bash
   npm install -g @vscode/vsce
   # or
   npm install -g vsce
   ```

4. **Verify setup**
   ```bash
   npm run test
   ```

> [!TIP]
> Use `npm run dev` to start development mode with file watching and automatic reloading!

## 🎨 Theme Development

### Understanding VS Code Themes

VS Code themes consist of two main parts:

1. **UI Colors** (`colors` object) - Interface elements
2. **Syntax Colors** (`tokenColors` array) - Code highlighting

### Core Color Palette

```javascript
const MIDNIGHT_DARK_COLORS = {
  // Primary colors
  background: "#1a1b26", // Deep midnight blue
  foreground: "#c0caf5", // Light blue-white

  // Accent colors
  purple: "#c792ea", // Functions, variables
  cyan: "#89ddff", // Keywords, operators
  green: "#c3e88d", // Constants, types
  pink: "#f07178", // Strings
  gray: "#5c6370", // Comments

  // UI variations
  darkBackground: "#16161e", // Darker areas
  lightBackground: "#24283b", // Lighter areas
  border: "#33467c", // Borders, dividers
};
```

### Adding New Language Support

1. **Identify language scopes**

   ```bash
   # Use VS Code's Developer Tools
   # Help → Developer Tools → Console
   # Type: editor.getModel().getLanguageId()
   ```

2. **Add token color rules**

   ```json
   {
     "name": "New Language - Functions",
     "scope": ["entity.name.function.newlang", "support.function.newlang"],
     "settings": {
       "foreground": "#c792ea",
       "fontStyle": "bold"
     }
   }
   ```

3. **Test with demo files**
   - Create `demo/demo.newlang` with examples
   - Test all syntax elements
   - Verify color consistency

> [!IMPORTANT]
> Always test new language support with real-world code examples, not just simple syntax!

### Color Accessibility Guidelines

- **Contrast Ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Color Blindness**: Test with tools like [Stark](https://www.getstark.co/)
- **Brightness**: Avoid pure white/black, use slightly tinted alternatives

```javascript
// Test contrast ratios
function getContrastRatio(color1, color2) {
  // Implementation in scripts/test.js
}
```

## Building & Testing

### Available Scripts

```bash
# Development
npm run dev          # Start development mode
npm run watch        # Watch for file changes

# Testing
npm run test         # Run all tests
npm run test:colors  # Test color contrast
npm run test:syntax  # Test syntax highlighting
npm run lint         # Lint theme JSON
npm run format       # Format

# Building
npm run build        # Build and validate theme
npm run package      # Create .vsix package
vsce package         # Directly create .vsix without npm script
npm run clean        # Clean build artifacts

# Publishing
npm run publish      # Publish to marketplace
npm run publish:pre  # Publish pre-release
```

### Testing Workflow

1. **Automated Testing**

   ```bash
   npm run test
   ```

   - JSON syntax validation
   - Color contrast checking
   - Theme completeness verification
   - Performance testing

2. **Manual Testing**
   - Press `F5` in VS Code to open Extension Development Host
   - Select "Midnight Dark" theme
   - Test with files in `demo/` folder
   - Verify UI elements (sidebar, tabs, status bar)

3. **Cross-Platform Testing**
   - Test on Windows, macOS, and Linux
   - Verify in different VS Code versions
   - Check with various monitor settings

> [!NOTE]
> Our CI/CD pipeline automatically runs tests on multiple platforms when you create a pull request!

### Quality Checklist

Before releasing:

- [x] All automated tests pass
- [x] Manual testing completed
- [x] Documentation updated
- [x] Changelog updated
- [x] Version number bumped
- [x] Screenshots updated (if needed)
- [x] Performance impact verified

## Publishing Workflow

### Automated Publishing (Recommended)

We use GitHub Actions for automated publishing:

1. **Create a new tag**

   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```

2. **GitHub Actions automatically:**
   - Runs all tests
   - Builds the extension
   - Creates a GitHub release
   - Updates documentation

### Manual Publishing

1. **Prepare for release**

   ```bash
   npm run build
   npm run test
   ```

2. **Update version**

   ```bash
   npm version patch  # or minor/major
   ```

3. **Package extension**

   ```bash
   npm run package
   ```

4. **Publish to marketplace**
   ```bash
   npm run publish
   ```

> [!CAUTION]
> Manual publishing should only be used for hotfixes or when automated publishing fails!

### Release Process

1. **Pre-release checklist**
   - [ ] All features tested
   - [ ] Documentation updated
   - [ ] Version bumped in package.json
   - [ ] Changelog updated
   - [ ] Screenshots current

2. **Create release**
   - Tag format: `v1.2.3`
   - Include changelog in release notes
   - Attach .vsix file

3. **Post-release**
   - Monitor marketplace for issues
   - Respond to user feedback
   - Plan next release

## Contributing Guidelines

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Contribution Types

#### Bug Fixes

- Fix color contrast issues
- Resolve syntax highlighting problems
- Address UI inconsistencies

#### New Features

- Add language support
- Create theme variants
- Implement new VS Code features

#### Documentation

- Improve README
- Add code examples
- Create tutorials

#### 🎨 Design Improvements

- Enhance color palette
- Improve accessibility
- Optimize visual hierarchy

### Code Standards

1. **JSON Formatting**

   ```bash
   # Use 2-space indentation
   # Sort properties alphabetically
   # Include comments for clarity
   ```

2. **Color Values**
   - Use lowercase hex values
   - Include alpha channel when needed
   - Document color purposes

3. **Scope Naming**
   - Follow TextMate scope conventions
   - Use specific scopes when possible
   - Group related scopes together

## Automation & CI/CD

### GitHub Actions Workflows

#### 1. **Continuous Integration** (`.github/workflows/test.yml`)

```yaml
# Triggers: Push, Pull Request
# Actions:
# - Run tests on multiple platforms
# - Validate theme JSON
# - Check code quality
# - Generate coverage reports
```

#### 2. **Automated Publishing** (`.github/workflows/publish.yml`)

```yaml
# Triggers: Tag creation (v*.*.*)
# Actions:
# - Build extension
# - Run full test suite
# - Create GitHub release
# - Update documentation
```

### Automated Quality Checks

- **JSON Validation** - Syntax and structure verification
- **Color Contrast** - Accessibility compliance testing
- **Performance** - Theme loading speed analysis
- **Compatibility** - VS Code version compatibility
- **Security** - Dependency vulnerability scanning

> [!IMPORTANT]
> All automation respects user privacy and follows GitHub's terms of service!

## Support & Contact

### Getting Help

1. **Documentation** - Check README.md and this file
2. **Issues** - [GitHub Issues](https://github.com/nayandas69/midnight-dark-theme/issues)
3. **Discussions** - [GitHub Discussions](https://github.com/nayandas69/midnight-dark-theme/discussions)
4. **Email** - [nayanchandradas@hotmail.com](mailto:nayanchandradas@hotmail.com)

### Maintainer

- GitHub: [@nayandas69](https://github.com/nayandas69)
- Email: [nayanchandradas@hotmail.com](mailto:nayanchandradas@hotmail.com)

**Happy developing!**

_This guide is continuously updated. Last updated: July 2025_
