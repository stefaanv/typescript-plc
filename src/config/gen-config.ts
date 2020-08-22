export default (): any => ({
  app: {
    apiPort: parseInt(process.env.API_PORT) || 3000,
    modbusPollingInterval: 20, // period in milliseconds
  },
  logging: {
    appName: 'typescript-plc',
    fileLevel: 'info',
    consoleLogLevel: 'debug',
    fileRotateFrequency: '24h',
    dirname: '/usr/typescript-plc/logs',
    filenamePattern: 'log-%DATE%.log',
    filenameDatePattern: 'YYYY-MM-DD',
    consoleLogDatetimePattern: 'D/M HH:mm:ss',
    fileLogDatetimePattern: 'YYYY/MM/DD HH:mm:ss',
    maxFiles: 20,
    handleExceptions: false,
    auditFile: 'logs',
  },
  plc1: {
    ipAddress: '192.168.0.51',
  },
});
