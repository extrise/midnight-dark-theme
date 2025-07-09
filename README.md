# Midnight Dark Theme

A mystical Dark theme for VS Code with purple, cyan, and neon green accents that creates an enchanting coding environment. Perfect for developers who love beautiful, eye-friendly themes with excellent syntax highlighting.

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/ExtRise.midnight-dark-theme?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=ExtRise.midnight-dark-theme)
[![License](https://img.shields.io/github/license/nayandas69/midnight-dark-theme?style=for-the-badge)](https://github.com/extrise/midnight-dark-theme/blob/main/LICENSE)

## Pre-view

<p align="center">
  <img src="https://raw.githubusercontent.com/nayandas69/midnight-dark-theme/refs/heads/dev/preview/soft.png" alt="Soft Theme Preview" width="30%"/>
  <img src="https://raw.githubusercontent.com/nayandas69/midnight-dark-theme/refs/heads/dev/preview/light.png" alt="Light Theme Preview" width="30%"/>
  <img src="https://raw.githubusercontent.com/nayandas69/midnight-dark-theme/refs/heads/dev/preview/dark.png" alt="Dark Theme Preview" width="30%"/>
</p>

## Color Themes

- Midnight Dark
- Midnight Soft
- Midnight Light
- Midnight Ocean
- Midnight Forest
- Midnight Monochrome

## Features

- [x] **Deep Midnight Background** - Easy on the eyes for long coding sessions
- [x] **Purple Accents** - Beautiful highlighting for functions and variables
- [x] **Cyan Keywords** - Clear distinction for language keywords and operators
- [x] **Neon Green Constants** - Vibrant colors for constants and data types
- [x] **Soft Pink Strings** - Gentle coloring for string literals
- [x] **Subtle Gray Comments** - Non-intrusive comment styling
- [x] **Complete UI Theming** - Consistent design across all VS Code elements
- [x] **Multi-Language Support** - Optimized for 9+ programming languages
- [x] **Accessibility Focused** - WCAG compliant color contrast ratios
- [x] **Terminal Integration** - Matching ANSI color scheme
- [x] **Git Integration** - Color-coded file status indicators

## Color Palette 🎨

| Element                 | Color        | Hex Code  | Usage                                 |
| ----------------------- | ------------ | --------- | ------------------------------------- |
| **Background**          | Deep Blue    | `#1a1b26` | Editor background, main interface     |
| **Functions/Variables** | Light Purple | `#c792ea` | Function names, variable declarations |
| **Keywords/Operators**  | Cyan         | `#89ddff` | Language keywords, operators          |
| **Strings**             | Soft Pink    | `#f07178` | String literals, text content         |
| **Constants/Types**     | Neon Green   | `#c3e88d` | Constants, numbers, data types        |
| **Comments**            | Gray         | `#5c6370` | Comments, documentation               |
| **Foreground**          | Light Blue   | `#c0caf5` | Default text color                    |

## Installation

### From VS Code Marketplace (Recommended)

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for **"Midnight Dark"**
4. Click **Install**
5. Go to **Settings** → **Color Theme** → Select **"Midnight Dark"**

### Manual Installation

1. Download the latest `.vsix` file from [Releases](https://github.com/extrise/midnight-dark-theme/releases) or [Marketplace](https://marketplace.visualstudio.com/items?itemName=ExtRise.midnight-dark-theme)
2. In VS Code, press `Ctrl+Shift+P` / `Cmd+Shift+P`
3. Type **"Extensions: Install from VSIX"**
4. Select the downloaded file
5. Reload VS Code

### From Source

```bash
git clone https://github.com/extrise/midnight-dark-theme.git
cd midnight-dark-theme
npm install
npm run build
```

> [!TIP]
> Use `Ctrl+K Ctrl+T` (Windows/Linux) or `Cmd+K Cmd+T` (macOS) to quickly switch between themes!

## Supported Languages

The theme includes optimized syntax highlighting for:

- [x] **JavaScript/TypeScript** - Complete ES6+ support
- [x] **Python** - Classes, decorators, f-strings
- [x] **HTML/CSS** - Tags, properties, selectors
- [x] **JSON** - Data structures, keys, values
- [x] **Markdown** - Headings, links, code blocks
- [x] **JSX/TSX** - React components, props
- [~] **YAML** - Basic syntax support
- [~] **SQL** - Basic keyword highlighting
- [~] **Shell Scripts** - Basic syntax support
- [ ] **PHP** - Coming soon!
- [ ] **Java/C#** - Coming soon!
- [ ] **Go/Rust** - Coming soon!
- [ ] **Docker** - Coming soon!
- [ ] **More languages planned!**

> [!NOTE]
> If you'd like support for a specific language, please [open an issue](https://github.com/extrise/midnight-dark-theme/issues) with examples!

## Customization

You can customize the theme by modifying your VS Code settings:

```json
{
  "workbench.colorCustomizations": {
    "[Midnight dark]": {
      "editor.background": "#1a1b26",
      "editor.foreground": "#c0caf5"
    }
  },
  "editor.tokenColorCustomizations": {
    "[Midnight dark]": {
      "comments": "#5c6370",
      "keywords": "#89ddff"
    }
  }
}
```

> [!IMPORTANT]
> Custom color modifications will override the theme's default colors. Make sure to maintain good contrast ratios for accessibility!

## Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- [x] **Report Bugs** - Found an issue? [Open a bug report](https://github.com/extrise/midnight-dark-theme/issues/new?template=bug_report.md)
- [x] **Suggest Features** - Have an idea? [Request a feature](https://github.com/extrise/midnight-dark-theme/issues/new?template=feature_request.md)
- [x] **Improve Colors** - Submit color improvements or new variants
- [x] **Documentation** - Help improve docs, examples, or translations
- [x] **Code** - Fix bugs, add features, or optimize performance

### Development Setup

1. **Fork the repository**

   ```bash
   git clone https://github.com/extrise/midnight-dark-theme.git
   cd midnight-dark-theme
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development**

   ```bash
   npm run dev
   ```

4. **Test your changes**
   - Press `F5` to open Extension Development Host
   - Select "Midnight dark" theme
   - Test with different file types

5. **Submit a pull request**

> [!TIP]
> Check out our [DEVELOP.md](https://github.com/extrise/midnight-dark-theme/blob/main/DEVELOP.md) for detailed development guidelines and roadmap!

## Roadmap

### Upcoming Features

- [ ] **Light Theme Variant** - Bright version of Midnight dark
- [ ] **High Contrast Variant** - Enhanced accessibility
- [ ] **Color Customization Panel** - Easy theme personalization
- [ ] **Additional Language Support** - More programming languages
- [ ] **Theme Variants** - Different color combinations
- [ ] **Semantic Token Support** - Enhanced TypeScript/JavaScript highlighting
- [ ] **Bracket Pair Colorization** - Custom bracket colors

> [!NOTE]
> Want to influence our roadmap? [Join the discussion](https://github.com/extrise/midnight-dark-theme/discussions) and share your ideas!

## Statistics

- **Total Colors Defined**: 200+ UI colors
- **Syntax Rules**: 50+ token color rules
- **Language Support**: 9+ programming languages
- **File Size**: ~150KB (optimized for performance)
- **Accessibility**: WCAG AA compliant

## Troubleshooting

### Theme Not Applying

1. Restart VS Code completely
2. Check if theme is selected: `Ctrl+K Ctrl+T`
3. Verify installation in Extensions panel

### Colors Look Different

- Check your monitor's color profile
- Ensure VS Code is updated to latest version
- Disable other color-modifying extensions

### Performance Issues

- The theme is optimized and shouldn't affect performance
- If you experience issues, please [report them](https://github.com/extrise/midnight-dark-theme/issues)

> [!CAUTION]
> If you're using custom CSS extensions or theme modifications, they might conflict with Midnight dark. Try disabling them to isolate issues.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/extrise/midnight-dark-theme/blob/main/LICENSE) file for details.

## Author

- GitHub: [@nayandas69](https://github.com/nayandas69)
- Email: [nayanchandradas@hotmail.com](mailto:nayanchandradas@hotmail.com)
- Portfolio: [Coming Soon]

## Acknowledgments

- Thanks to the VS Code team for the excellent theming API
- Inspired by various dark themes in the community
- Special thanks to all contributors and users who provide feedback
- Color palette inspired by modern design trends and accessibility guidelines

## Show Your Support

If you like this theme, please:

- ⭐ Star the repository
- 📝 Leave a review on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ExtRise.midnight-dark-theme)
- 🐦 Share it with your developer friends

**Happy coding with Midnight dark! 🌙✨**

_Made with 🐸 by [nayandas69](https://github.com/nayandas69)_
