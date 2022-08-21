import './global.scss';
import { addHeader } from './components/header/header';
import { addMain } from './components/pages/main-page/main-page';
import { addFooter } from './components/footer/footer';
import { renderPopupOverlay } from './components/popups/popups';

addHeader();
addMain();
addFooter();
renderPopupOverlay();
