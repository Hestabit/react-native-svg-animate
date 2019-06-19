'use strict';

class AnimatedEasing {

	/**
   	* A function is an equation that has only one answer for y for every x.
   	* 
   	*/
	static LINEAR = function(x) {
	  return x
	};


	/**
   	* A simple inertial interaction, similar to an object slowly accelerating to
   	* speed.
   	*/
	static EASE = function(x) {
	  return -Math.cos(x * Math.PI) / 2 + 0.5;
	};

	/**
   	* Runs an easing function backwards.
   	*/
	static EASE_OUT = function(x) {
	  return 1 - Math.pow(1 - x, 3);
	};

	/**
   	* Runs an easing function forwards.
   	*/
	static EASE_IN = function(x) {
	  return Math.pow(x, 3);
	};

	/**
   	* Runs an easing function backwards with bounce effect.
   	*/
	static EASE_OUT_BOUNCE = function(x) {
	  var base = -Math.cos(x * (0.5 * Math.PI)) + 1,
	    rate = Math.pow(base, 1.5),
	    rateR = Math.pow(1 - x, 2),
	    progress = -Math.abs(Math.cos(rate * (2.5 * Math.PI))) + 1;
	  return 1 - rateR + progress * rateR;
	};

}


module.exports = AnimatedEasing;