# Midnight Dark Theme Demo

Welcome to the **Midnight Dark** theme demonstration! This document showcases how the theme handles various Markdown elements and syntax highlighting.

## Table of Contents

- [Features](#features)
- [Color Palette](#color-palette)
- [Code Examples](#code-examples)
- [Installation](#installation)
- [Contributing](#contributing)

## Features

The Midnight Dark theme provides:

- 🌙 **Deep midnight blue background** - Easy on the eyes for long coding sessions
- 🟣 **Purple accents** - Beautiful highlighting for functions and variables
- 🔵 **Cyan keywords** - Clear distinction for language keywords and operators
- 🟢 **Neon green constants** - Vibrant colors for constants and data types
- 🌸 **Soft pink strings** - Gentle coloring for string literals
- 💬 **Subtle gray comments** - Non-intrusive comment styling

## Color Palette

| Color          | Hex Code  | Usage                             |
| -------------- | --------- | --------------------------------- |
| **Purple**     | `#c792ea` | Functions, variables, methods     |
| **Cyan**       | `#89ddff` | Keywords, operators, control flow |
| **Green**      | `#c3e88d` | Constants, numbers, types         |
| **Pink**       | `#f07178` | Strings, string literals          |
| **Gray**       | `#5c6370` | Comments, documentation           |
| **Background** | `#1a1b26` | Editor background                 |

## Code Examples

### JavaScript

```javascript
// Function demonstration
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();

    return {
      success: true,
      user: data,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return { success: false, error };
  }
}

// Class demonstration
class UserManager {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.users = new Map();
  }

  async addUser(userData) {
    const user = new User(userData);
    this.users.set(user.id, user);
    return user;
  }
}
```

### Python

```python
# Class and decorator demonstration
@dataclass
class User:
    id: int
    name: str
    email: str
    roles: List[str] = field(default_factory=list)

    def __post_init__(self):
        if not self.email:
            raise ValueError("Email is required")

    @property
    def is_admin(self) -> bool:
        return "admin" in self.roles

# Async function demonstration
async def fetch_user_data(user_id: int) -> Dict[str, Any]:
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"/api/users/{user_id}") as response:
                data = await response.json()
                return {"success": True, "user": data}
    except Exception as error:
        logger.error(f"Failed to fetch user {user_id}: {error}")
        return {"success": False, "error": str(error)}
```

### CSS

```css
/* Theme variables */
:root {
  --primary-color: #c792ea;
  --secondary-color: #89ddff;
  --accent-color: #c3e88d;
  --text-color: #c0caf5;
  --background-color: #1a1b26;
}

/* Component styling */
.midnight-card {
  background-color: var(--background-color);
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.midnight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(199, 146, 234, 0.2);
}
```

### HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Midnight Dark Demo</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <h1 class="title">Welcome to Midnight Dark</h1>
      <p class="description">A beautiful dark theme for VS Code</p>

      <div class="features">
        <div class="feature-card" data-color="purple">
          <h3>Functions & Variables</h3>
          <p>Beautiful purple highlighting</p>
        </div>
        <div class="feature-card" data-color="cyan">
          <h3>Keywords & Operators</h3>
          <p>Clear cyan distinction</p>
        </div>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

### JSON

```json
{
  "name": "midnight-dark-theme",
  "displayName": "Midnight Dark",
  "description": "A beautiful dark theme with purple, cyan, and neon accents",
  "version": "0.9.0",
  "themes": [
    {
      "label": "Midnight Dark",
      "uiTheme": "vs-dark",
      "path": "./themes/midnight-dark-color-theme.json"
    }
  ],
  "colors": {
    "functions": "#c792ea",
    "keywords": "#89ddff",
    "constants": "#c3e88d",
    "strings": "#f07178",
    "comments": "#5c6370",
    "background": "#1a1b26"
  }
}
```

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Midnight Dark"
4. Click **Install**
5. Go to **Settings** → **Color Theme** → Select **"Midnight Dark"**

### Manual Installation

1. Download the `.vsix` file from the releases page
2. In VS Code, press `Ctrl+Shift+P`
3. Type "Extensions: Install from VSIX"
4. Select the downloaded file
5. Reload VS Code

## Text Formatting

The theme supports various text formatting options:

- **Bold text** - Shows clearly against the background
- _Italic text_ - Maintains readability with subtle styling
- `Inline code` - Distinct highlighting for code snippets
- ~~Strikethrough~~ - Clear indication of removed content

### Lists

Ordered lists:

1. First item with proper numbering
2. Second item with consistent spacing
3. Third item maintaining alignment

Unordered lists:

- Bullet points with clear visibility
- Nested items maintain hierarchy
  - Sub-items are properly indented
  - Multiple levels are supported

### Links and References

- [GitHub Repository](https://github.com/nayandas69/midnight-dark-theme)
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ExtRise.midnight-dark-theme)

## Blockquotes

> "The best themes are the ones that disappear into the background, letting your code shine through while providing just enough visual distinction to enhance readability."
>
> — Theme Design Philosophy

## Contributing

We welcome contributions to improve the Midnight Dark theme! Here's how you can help:

### Development Setup

1. **Fork the repository**

   ```bash
   git clone https://github.com/nayandas69/midnight-dark-theme.git
   cd midnight-dark-theme
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Make your changes**
   - Edit `themes/midnight-dark-color-theme.json`
   - Test in VS Code Extension Development Host

4. **Submit a pull request**

### Areas for Improvement

- [ ] Language-specific optimizations
- [ ] Additional color variants
- [ ] Accessibility improvements
- [ ] Performance optimizations

## License

This theme is released under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- Thanks to the VS Code team for the excellent theming API
- Inspired by various dark themes in the community
- Special thanks to all contributors and users who provide feedback

_Happy coding with Midnight Dark! 🌙✨_
