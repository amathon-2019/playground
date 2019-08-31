import 'reflect-metadata';
import { ApplicationFactory } from './src/app';
const app = ApplicationFactory.create();
app.start();
