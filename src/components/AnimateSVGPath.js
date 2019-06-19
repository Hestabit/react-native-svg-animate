import React from 'react';
import { Path } from 'react-native-svg';

// import from local dir
import AnimatedSVG from '../helpers/AnimatedSVG';

class AnimateSVGPath extends React.Component {
    setNativeProps = (props = {}) => {
        this._component && this._component.setNativeProps(props);
    }
  
    render() {
        return (
            <Path
                ref={component => (this._component = component)}
                    {...this.props}
            />
        );
    }
}

AnimateSVGPath = AnimatedSVG(AnimateSVGPath);
export default AnimateSVGPath;
