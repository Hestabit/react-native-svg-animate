import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

//import AnimateSVG component from '@hestabit/react-native-svg-animate'
import { AnimateSVG } from '@hestabit/react-native-svg-animate'

//import svg path
import { singlePathSVG, multiplePathSVG } from './path/Paths'

export default class Delayed extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <AnimateSVG
            strokeWidth={3}
            duration={4000}
            height={220}
            scale={1}
            width={220}
            d={multiplePathSVG}
            viewBox={"0 0 512 512"}
            type={"delayed"}
            animEffect={"bounce"}
            ref={ref => (this._animateSVG = ref)}
        />

        <View style={styles.section}>
            <View style={styles.btn}>
                <Button title="Replay" onPress={()=> this._animateSVG.replay()} color="red"  />
            </View>
            <View style={styles.btn}>
                <Button title="Rewind" onPress={()=> this._animateSVG.rewind()} color="blue" />
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  section : {
    flexDirection : 'row',
    position : 'absolute',
    bottom : 100
  },
  btn : {
    margin : 20
  }
});
