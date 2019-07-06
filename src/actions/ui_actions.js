 import {LEFT_TOGGLE,RIGHT_TOGGLE,OPEN_LEFT,OPEN_RIGHT} from '../actions/types';

 export const toggleLeft=(e) => {
 	console.log('opened');
 	// let panelLeft = document.querySelector('.panels__side--left');
 	// let panelRight = document.querySelector('.panels__side--right');
 	// panelLeft.classList.toggle('panels__side--left-active');
 	// panelRight.classList.toggle('panels__side--right-hidden');
		return {
		type:LEFT_TOGGLE,
		 
	}
 }

 export const toggleRight = (e) => {
 	return {type:RIGHT_TOGGLE}
 }

 export const openLeft = () => {
 	return{type:OPEN_LEFT}
 }
 export const openRight = () => {
 	return{type:OPEN_RIGHT}
 }

