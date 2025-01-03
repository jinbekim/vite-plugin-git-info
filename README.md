# vite-plugin-git-info-env

A vite plugin to inject git information into your vite app.

## Installation

```bash
npm install vite-plugin-git-info-env --save-dev
```

## Usage

```javascript
// vite.config.js
import gitInfo from 'vite-plugin-git-info-env';

export default {
  plugins: [
    gitInfo()
  ]
}

// main.js

console.log(
  import.meta.env.GIT_BRANCH,
  import.meta.env.GIT_TAG,
  import.meta.env.GIT_COMMIT,
);
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vite-plugin-git-info-env/client"]
  }
}

// or vite-env.d.ts

/// <reference types="vite/client" />
/// <reference types="vite-plugin-git-info-env/client" />
```

## Options

N/A
