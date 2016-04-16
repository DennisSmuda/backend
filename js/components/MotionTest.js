import React from 'react';
import { Motion, spring } from 'react-motion';
import {range} from 'lodash';
import { toRadians } from '../helpers/index';

import {
  DEG_TO_RAD, BASE_ANGLE, SEPARATION_ANGLE, FLY_OUT_RADIUS,
  CHILD_BUTTON_DIAM, MAIN_BUTTON_DIAM, NUM_CHILDREN, M_Y, M_X
} from '../helpers/constants';

const SPRING_CONFIG = [380, 17];



export function finalChildDeltaPositions(index) {
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
			isOpen: false,
			childButtons: []
		};

		// Bind this to the functions
		this.toggleMenu = this.toggleMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.animateChildButtonsWithDelay = this.animateChildButtonsWithDelay.bind(this);
	}

	componentDidMount() {
		window.addEventListener('click', this.closeMenu);
		let childButtons = [];
		range(NUM_CHILDREN).forEach(index => {
			childButtons.push(this.renderChildButton(index));
		});

		this.setState({childButtons: childButtons.slice(0)});
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
			top: spring(M_Y - (CHILD_BUTTON_DIAM/2), SPRING_CONFIG),
			left: spring(M_X - (CHILD_BUTTON_DIAM/2), SPRING_CONFIG),
			rotate: spring(-180, SPRING_CONFIG),
			scale: spring(0.5, SPRING_CONFIG)
		};
	}

	finalChildButtonStyles(childIndex) {
		let {deltaX, deltaY} = finalChildDeltaPositions(childIndex);
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			top: spring(M_Y - deltaY, SPRING_CONFIG),
			left: spring(M_X + deltaX, SPRING_CONFIG),
			rotate: spring(0, SPRING_CONFIG),
			scale: spring(1, SPRING_CONFIG)
		};
	}

	toggleMenu(e) {
		e.stopPropagation();
		let{isOpen} = this.state;
		this.setState({
			isOpen: !isOpen
		});

		this.animateChildButtonsWithDelay();
	}

	closeMenu() {
		this.setState({ isOpen: false});
		this.animateChildButtonsWithDelay();
	}

	animateChildButtonsWithDelay() {
		range(NUM_CHILDREN).forEach((index) => {
			let {childButtons} = this.state;
			setTimeout(() => {
				childButtons[NUM_CHILDREN - index - 1]	= this.renderChildButton(NUM_CHILDREN - index - 1);
				this.setState({childButtons: childButtons.slice(0)});
			}, index * 50);
		});
	}

	renderChildButton(index) {
		let {isOpen} = this.state;
		let style = isOpen ? this.finalChildButtonStyles(index) : this.initialChildButtonStyles() ;
		return (
			<Motion style={style} key={index}>
				{({width, height, top, left, rotate, scale}) =>
					<div
						className="child-button"
						style={{
							width: width,
							height: height,
							top: top,
							left: left,
							transform: `rotate(${rotate}deg) scale(${scale})`
						}}>
						<i className={"icons plus"}></i>
					</div>
				}
			</Motion>
		);
	}

	render() {
		let {isOpen, childButtons} = this.state;
		let mainButtonRotation = isOpen ? {rotate: spring(0, [500, 30])} : {rotate: spring(-135, [500, 30])};
		return (
			<div>
				{childButtons.map( (button, index) => {
					return childButtons[index];
				})}
				<Motion style={mainButtonRotation}>
					{({rotate}) =>
						<div
							className="main-button"
							style={{...this.mainButtonStyles(), transform: `rotate(${rotate}deg)`}}
							onClick={this.toggleMenu}>
						{/*Using fa-close instead of fa-plus because fa-plus doesn't center properly*/}
							<i className="fa fa-close fa-3x"/>
						</div>
					}
				</Motion>
			</div>
		);
	}
}
