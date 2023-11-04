import { spawn } from 'node:child_process';

const bot = spawn('python3', ['bot/bot.py']);
console.log(bot.pid);
