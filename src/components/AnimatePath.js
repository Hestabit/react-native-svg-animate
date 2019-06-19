import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';
import { svgPathProperties } from 'svg-path-properties';

// import from local dir
import AnimateSVGPath from './AnimateSVGPath';
//import AnimatedEasing from '../helpers/AnimatedEasing'

class AnimatePath extends React.Component {
    
    static defaultProps = {
        strokeColor: "black",
        strokeWidth: 1,
        fill: "none",
        loop: false,
        animEffect : 'linear'
    };
  
    constructor(props) {
        super(props);
        const { d } = this.props;
        const properties = svgPathProperties(d)
        this.length = properties.getTotalLength();
        this.strokeDashoffset = new Animated.Value(this.length);
        this.effect = this.manageEffect(this.props.animEffect)
    }

    manageEffect = (effect) => {
        switch(effect) {

            case 'linear':
                return Easing.linear

            case 'ease_in': 
                return Easing.ease

            case 'ease_out':
                return Easing.out(Easing.ease)

            case 'back':
                return Easing.back()

            case 'bounce':
                return Easing.bounce

            case 'elastic':
                return Easing.elastic()

            default : 
                return Easing.linear
        }
    }
  
    animate = () => {
        const { delay, duration, loop, animEffect } = this.props;
        this.strokeDashoffset.setValue(this.length);
        Animated.sequence([
            Animated.delay(delay),
            Animated.timing(this.strokeDashoffset, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
                easing : this.effect
            })
        ]).start(() => {
            if (loop) {
                this.animate();
            }
        });
    }

    rewindPath = () => {
        const { delay, duration, animEffect } = this.props;
        this.strokeDashoffset.setValue(0);
        Animated.sequence([
            Animated.delay(delay),
            Animated.timing(this.strokeDashoffset, {
                toValue: -this.length,
                duration: duration,
                useNativeDriver: true,
                easing : this.effect
            })
        ]).start();
    }

    componentDidMount() {
        this.animate();
    }
  
    render() {
        const { d, fill, scale, strokeColor, strokeWidth } = this.props;
        return (
            <AnimateSVGPath
                strokeDasharray={[this.length, this.length]}
                strokeDashoffset={this.strokeDashoffset}
                strokeWidth={strokeWidth}
                stroke={strokeColor}
                scale={scale}
                fill={fill}
                d={d}
            />
        );
    }
}

//Props Validation
AnimatePath.propTypes = {
    d           : PropTypes.string.isRequired,
    strokeColor : PropTypes.string,
    strokeWidth : PropTypes.number,
    duration    : PropTypes.number.isRequired,
    delay       : PropTypes.number.isRequired,
    loop        : PropTypes.bool,
    scale       : PropTypes.number,
    fill        : PropTypes.string,
    animEffect  : PropTypes.oneOf(['linear', 'ease_in', 'ease_out', 'back', 'bounce', 'elastic'])
};

export default AnimatePath;