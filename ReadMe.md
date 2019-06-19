# React Native SVG Animate
![](https://img.shields.io/badge/platform-react--native-brightgreen.svg) ![](https://img.shields.io/badge/license-MIT-000000.svg)
> This package allow you to animate SVG path with diffrent animation types in both Android and IOS Application. 
Package is extended version of [react-native-svg-animate](https://www.npmjs.com/package/react-native-svg-animate)

### Dependencies
* `color`
* `react-native-svg`
* `svg-path-properties` 
### Installation
```
$ npm i react-native-svg-animate --save
```
### Showcase
###### Async
![Async-bounce](https://github.com/Mr-Bhardwa7/react-native-svg-animate/blob/master/assets/images/async-bounce.gif?raw=true)

### Animation
On the following images, the pink color represents the duration value, and the blue one is for delay value.
##### Async
![Async](https://github.com/Mr-Bhardwa7/react-native-svg-animate/blob/master/assets/images/async.jpg?raw=true)
Each line is drawn asynchronously. They all start and finish at the same time, hence the name async.
##### Delayed
![Delayed](https://github.com/Mr-Bhardwa7/react-native-svg-animate/blob/master/assets/images/delayed.png?raw=true)
Every path element is drawn at the same time with a small delay at the start. This is currently the default animation.

##### One By One
![One_By_ONE](https://github.com/Mr-Bhardwa7/react-native-svg-animate/blob/master/assets/images/one_by_one.jpg?raw=true)
Each path element is drawn one after the other. This animation gives the best impression of live drawing. The duration for each line depends on their length to make a constant drawing speed.

### USAGE
```javascript
import { AnimateSVG } from 'react-native-svg-animate'
```
```JSX
 <AnimateSVG
    strokeWidth={3}
    duration={4000}
    height={220}
    scale={1}
    width={220}
    d={design_1}
    viewBox={"0 0 512 512"}
    type={"one_by_one"}
    animEffect={"bounce"}
    ref={ref => (this._animateSVG = ref)}
/>
```

```JSX
<Button title="Replay" onPress={()=> this._animateSVG.replay()} />
<Button title="Rewind" onPress={()=> this._animateSVG.rewind()} />
```

### Option list

Name        |   Type       |  Description                       | Default Value
:-----------|:-------------|:-----------------------------------|:------------
strokeColor |  string      | The color of the path stroke.    | black
strokeWidth |  number      | The thickness of the path stroke. | 1
duration    |  number      | Time in ms to complete the path drawing from starting point to ending point.  | 1000ms or 1s
delay       |  number      | Time in ms before starting animation. | null
height      |  number      | The height of the base SVG. | screen viewport height
width       | number       | The width of the base SVG. | screen viewport width
scale       |  number      | The scale of the output SVG based on the width and height of the base SVG. | 1.0 or 100%
fill        | string       | The color fill of the closed path. | none
loop        | bool         | Whether the animation loops infinitely. | false
viewBox     |  string      | Control the viewBox by adding the attribute viewBox to the svg element.| null
style       | object       | You can use the style property to add the styles inline. | {}
type        | string       | Type of animation, Package can animate SVG in one of these type. [`async`, `delayed`, `one_by_one`]  | async
d           | string/array | The SVG Path to be animated. (`required`) It can be `single path` as string or `multiple path` as an array of string. | -
animEffect  | string       | Defines what kind of easing effect will be used: [`linear`, `ease_in`, `ease_out`, `back`, `bounce`, `elastic`]   | linear

### Methods

Name        |  Description 
:-----------:|:-------------:
replay()    | Restart the animation.
rewind()    | Play the animation in reverse mode.
