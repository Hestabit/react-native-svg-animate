import React from 'react';
import PropTypes from 'prop-types';
import Svg from 'react-native-svg';
import { Dimensions } from 'react-native';
import { svgPathProperties } from 'svg-path-properties';

// import from local dir
import AnimatePath from './AnimatePath';

//constants
const { height, width } = Dimensions.get('window');

class AnimateSVG extends React.Component {

    static defaultProps = {
        duration: 1000,
        delay: null,
        scale: 0.1,
        height,
        width,
        type: 'async',
        viewBox : null,
        style : {}
    };
  
    constructor(props) {
        super(props);
        this.length = this.lengthMeter = 0;
        this.delay = this.startAt = this.duration = this.delayUnit = null;
        this.svgPath = [];
        this.animationManager(this.props.d, this.props.delay, this.props.duration);
    }

    replay = () => {
        let { d } = this.props;

        if(typeof d === 'string') {
            this.refs['animatePath0'].animate()
        } else if (Array.isArray(d)) {
            for (var i = 0; i < this.svgPath.length; i++) {
                this.refs['animatePath' + i].animate()
            }
        }
    }

    rewind = () => {
        let { d } = this.props;

        if(typeof d === 'string') {
            this.refs['animatePath0'].rewindPath()
        } else if (Array.isArray(d)) {
            for (var i = 0; i < this.svgPath.length; i++) {
                this.refs['animatePath' + i].rewindPath()
            }
        }
    }

    animationManager = (paths, delay, duration) => {
        // Test params
        if (typeof paths === 'undefined') {
            throw new Error('AnimateSVG [constructor]: "d" parameter is required');
        }

        // Check params is string or array
        if(typeof paths === 'string') {
            this.svgPath.push(paths);
        } else if (Array.isArray(paths)) {
            this.svgPath = paths
        }

        //calculating svg length
        for (i = 0; i < this.svgPath.length; i++) {
            const properties = svgPathProperties(this.svgPath[i])
            this.length += Math.ceil(properties.getTotalLength());
        }

        this.length = this.length === 0 ? 1 : this.length;
        this.startAt = delay === null ? duration / 3 : delay;
        this.delayUnit = this.startAt / (this.svgPath.length > 1 ? this.svgPath.length - 1 : 1);
    }

    craeteSvgPath = () => {
        const { 
                strokeColor, strokeWidth, duration, 
                delay, scale, fill, loop, type, animEffect 
            } = this.props;

        if(this.svgPath.length === 0)
            return;

        return  this.svgPath.map((path, index) => {
                    let pathLength = Math.ceil(svgPathProperties(path).getTotalLength())

                    switch (type) {
                        case 'delayed':
                            this.delay = this.delayUnit * index;
                            this.duration = duration - this.startAt;
                        break;

                        case 'one_by_one':
                            this.delay = (this.lengthMeter / this.length) * duration;
                            this.duration = (pathLength / this.length) * duration;
                        break;

                        case 'async':
                            this.delay = 0;
                            this.duration = duration;
                        break;
                    }
                    this.lengthMeter += pathLength

                    return (
                        <AnimatePath
                            strokeWidth={strokeWidth}
                            strokeColor={strokeColor}
                            duration={this.duration}
                            delay={this.delay}
                            scale={scale}
                            fill={fill}
                            key={'key'+index}
                            loop={loop}
                            d={path}
                            animEffect={animEffect}
                            ref={"animatePath" + index}
                        />
                    );
                });
    }
  
    render() {
        const { height, width, scale, viewBox, style } = this.props;
        const svgPaths = this.craeteSvgPath();
                
        return (
            <Svg 
                height={(height * scale)} 
                width={(width * scale)} 
                viewBox={viewBox} 
                style={style}
            >
                {svgPaths}
            </Svg>
        );
    }
}

AnimateSVG.propTypes = {
    strokeColor : PropTypes.string,
    strokeWidth : PropTypes.number,
    duration    : PropTypes.number,
    delay       : PropTypes.number,
    height      : PropTypes.number,
    width       : PropTypes.number,
    scale       : PropTypes.number,
    fill        : PropTypes.string,
    viewBox     : PropTypes.string,
    loop        : PropTypes.bool,
    style       : PropTypes.object,
    type        : PropTypes.oneOf(['async', 'delayed', 'one_by_one']),
    d           : PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.arrayOf(PropTypes.string)
                ]).isRequired,
    animEffect  : PropTypes.oneOf(['linear', 'ease_in', 'ease_out', 'back', 'bounce', 'elastic'])
};


export default AnimateSVG;