const { execSync } = require('child_process');
const port = process.env.PORT || 3001;
execSync(`npx next dev --turbopack --port ${port}`, {
  stdio: 'inherit',
  cwd: __dirname,
  env: { ...process.env, PATH: '/opt/homebrew/bin:' + process.env.PATH }
});
