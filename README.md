# Mono Repo Shared Internal Packages

This is a basic todo app to test the use of a monorepo sharing data.

Using [turbo](https://turbo.build/) which is what NextJs is using to replace webpack and is easy to add to the repo and probably has more things I don't even yet know about yet.

With [turbo](https://turbo.build/) we can have [internal packages](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages).

## The Setup

Using this [starter guide](https://turbo.build/repo/docs/getting-started/existing-monorepo) took me about 10mins to turbo it to my repo.

- add a package.json to the root

```json
{
  "workspaces": ["packages/*", "apps/*"]
}
```

- `npm install turbo --global`
- create turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts", "test/**/*.tsx"]
    },
    "lint": {},
    "deploy": {
      "dependsOn": ["build", "test", "lint"]
    }
  }
}
```

- `npx turbo run deploy`
- `turbo build`

- create a folder called packages

> in the folder packages we can have all the internal packages we want. Here i have a zod-schemas package. to note in the zod-schemas package.json the name, main, and types fields are needed.

```json
{
  "name": "zod-schemas",
  "main": "src/index.ts",
  "types": "src/index.ts"
}
```

In the package.json for the backend/frontend...

```json
{
  "dependencies": {
    "zod-schemas": "*"
  }
}
```

NextJs.config

```typescript
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["zod-schemas"],
};
```

# One Source Of Truth!

- No version control worries (this will stay up-to-date with the branch it is on)
- Can be shared between all folders
- Only update in one place
- Can add incrementally
