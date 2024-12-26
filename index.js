import { rippleHTMLELements } from './paperRipple/PaperRipple.js';
const btns = document.querySelectorAll('.ripple');
btns.forEach(btn => {
	rippleHTMLELements(btn);
});
