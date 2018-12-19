import React from 'react';
import { render } from 'react-dom';
import App from './app';
import './static/sass/style.scss';

const appContainer = document.getElementById('app');

render(<App/>, appContainer);