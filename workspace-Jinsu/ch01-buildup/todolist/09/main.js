import kang from '../kang.js';
import App from './src/pages/App.js';

/*
    ┌───────── App ──────────┐
    │           │            │
  Header       Todo        Footer
                │
            ┌───┴───┐
      TodoInput   TodoList
                      │
                  TodoItem
*/

kang.createRoot(document.getElementById('root')).render(App);
