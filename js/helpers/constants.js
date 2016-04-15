// The number of child buttons that fly out from the main button
export const NUM_CHILDREN = 5;

export const DEG_TO_RAD = 0.0174533;

// Diameter of the main button in pixels
export const MAIN_BUTTON_DIAM = 90;
export const CHILD_BUTTON_DIAM = 50;

// Hard coded position values of the mainButton
export const M_X = 490;
export const M_Y = 450;

// How far away from the main button does the child buttons go
export const FLY_OUT_RADIUS = 120,
	SEPARATION_ANGLE = 40, //degrees
	FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE, //degrees
	BASE_ANGLE = ((180 - FAN_ANGLE)/2); // degrees
