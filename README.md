# C&N Event Management

Website code for C&N Event Management. This project is a React + Vite app and is connected directly to GitHub at:

https://github.com/arkadberu-trmib/cn-event-management

## Local workflow

Use these commands from this folder:

```powershell
git pull --ff-only origin main
npm run dev
npm run build
git status
git add .
git commit -m "Describe the update"
git push origin main
```

The npm scripts call Vite and ESLint through `node` so they work even though the parent Desktop folder contains `&`, which can confuse Windows command shims.

## Available scripts

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```
