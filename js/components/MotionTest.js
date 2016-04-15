import React from 'react';

import {range} from 'lodash';
import { toRadians } from '../helpers/index';

import {
  DEG_TO_RAD, BASE_ANGLE, SEPARATION_ANGLE, FLY_OUT_RADIUS,
  CHILD_BUTTON_DIAM, MAIN_BUTTON_DIAM, NUM_CHILDREN, M_Y, M_X
} from '../helpers/constants';


export function finalDeltaPositions(index) {
	let angle = BASE_ANGLE + ( index * SEPARATION_ANGLE );
	return {
		deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUTTON_DIAM/2),
		deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (CHILD_BUTTON_DIAM/2)
	};
}



export default class MotionTest extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};

		// Bind this to the functions
		this.openMenu = this.openMenu.bind(this);
	}

	mainButtonStyles() {
		return {
			width: MAIN_BUTTON_DIAM,
			height: MAIN_BUTTON_DIAM,
			top: M_Y - (MAIN_BUTTON_DIAM/2),
			left: M_X - (MAIN_BUTTON_DIAM/2)
		};
	}

	initialChildButtonStyles() {
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			top: M_Y - (CHILD_BUTTON_DIAM/2),
			left: M_X - (CHILD_BUTTON_DIAM/2)
		};
	}

	finalChildButtonStyles(childIndex) {
		let{deltaX, deltaY} = finalDeltaPositions(childIndex);
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			left: M_X + deltaX,
			top: M_Y - deltaY
		};
	}

	openMenu() {
		let{isOpen} = this.state;
		this.setState({
			isOpen: !isOpen
		});
	}

	render() {
		let {isOpen} = this.state;
		return (
			<div>
				{range(NUM_CHILDREN).map( index => {
					let style = isOpen ? this.finalChildButtonStyles(index) : this.initialChildButtonStyles();
					return (
						<div
							key={index}
							className="child-button"
							style={style}/>
					);
				})}
				<div
					className="main-button"
					style={this.mainButtonStyles()}
					onClick={this.openMenu}/>
			</div>
		);
	}
};
