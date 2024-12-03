// config file for the app

import Cookies from 'js-cookie';

export const base_url = 'http://localhost:5000';

export const token = Cookies.get('user');
