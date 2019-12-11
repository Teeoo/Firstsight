module.exports = {
  apps: [
    {
      name: 'api.teeoo.cn',
      script: 'yarn start:prod',
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: ['dist/'],
      ignore_watch: ['node_modules'],
      watch_options: {
        usePolling: true,
      },
    },
  ],
};
