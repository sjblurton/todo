# Mono Repo Shared Internal Packages

This is a basic todo app to test the use of a monorepo sharing data.

Using [npm link](https://docs.npmjs.com/cli/v9/commands/npm-link). I think the main Idea of npm link is to use live changes we do to a published npm package. It's working here but I think it might cause problems. It's not perfect

## The Setup

In the packages/schemas folder we need to run `npm link`, This will need running every time `npm i` is used.

In the frontend and backend folders we will need to run `npm link zod-schemas` **zod-schemas** is the name of the package in the package.json.

```json
{
  "name": "zod-schemas",
  ...
}
```

NextJs.config

```typescript
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["zod-schemas"],
};
```

That's all the set-up but everyone will need to do it and after every `npm i`.

# One Source Of Truth!

- No version control worries (this will stay up-to-date with the branch it is on)
- Can be shared between all folders
- Only update in one place
- Can add incrementally

## Why npm link?

### Positives

- very easy setup
- no packages

### Negatives

- A small learn curve to introduce it to the team
- A small amount extra setup up after every `npm i`
