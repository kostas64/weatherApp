import Animated, {
  withTiming,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {LineChart} from 'react-native-charts-wrapper';
import {StyleSheet, View, processColor} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CText from './Text';
import GraphHeader from './GraphHeader';
import {WIDTH} from '../assets/constants';
import {formatData} from '../utils/GraphUtils';

const Graph = ({allData, index, tempMin, tempMax}) => {
  const left = useSharedValue(0);
  const opacity = useSharedValue(0);
  const animatedText = useSharedValue('');
  const animatedRightText = useSharedValue('');
  const [onLayout, setLayout] = React.useState(0);

  const formattedText = useDerivedValue(
    () => ` ${!!animatedText.value ? animatedText.value : ''}`,
  );
  const formattedRightText = useDerivedValue(
    () => `${!!animatedRightText.value ? animatedRightText.value : ''}`,
  );
  const temp = formatData(allData.temperature_2m, allData.time, index);

  const getIndex = e => {
    'worklet';

    const graphWidth = onLayout?.width - 37;
    const range = graphWidth / 24;
    const tap = e.absoluteX - 27;
    const index = Math.floor(tap / range);

    return index;
  };

  const touchGesture = Gesture.Tap().onBegin(e => {
    left.value = withTiming(e.absoluteX, {duration: 1}, () => {
      opacity.value = 1;

      const index = getIndex(e);
      animatedText.value = `${
        !!temp?.[index]?.y ? `${Math.floor(temp?.[index]?.y)}°` : ''
      }`;
      animatedRightText.value = temp?.[index]?.time;
    });
  });

  const gesture = Gesture.Pan()
    .onChange(e => {
      if (e.absoluteX >= 27 && e.absoluteX <= onLayout.width - 10)
        left.value = withTiming(e.absoluteX - 1, {duration: 1}); // 1 comes as result of devide of 2

      const index = getIndex(e);
      animatedText.value = `${
        !!temp?.[index]?.y ? `${Math.floor(temp?.[index]?.y)}°` : ''
      }`;
      animatedRightText.value = temp?.[index]?.time;
    })
    .onFinalize(() => {
      opacity.value = 0;
      animatedText.value = '';
      animatedRightText.value = '';
    });

  const indicatorAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      left: left.value,
    };
  });

  const onLayoutWidth = {
    width: onLayout?.width - 37,
  };

  const graphData = {
    dataSets: [
      {
        label: 'demo',
        values: temp,
        config: {
          mode: 'CUBIC_BEZIER',
          drawCubicIntensity: 0.2,
          drawFilled: true,
          lineWidth: 3,
          drawValues: false,
          drawCircles: false,
          highlightLineWidth: 2,
          drawHorizontalHighlightIndicator: false,
        },
      },
    ],
  };

  const graphAnimation = {
    durationX: 1000,
    durationY: 0,
    easingY: 'EaseInOutQuad',
  };

  const graphYAxis = {
    left: {
      enabled: false,
    },
    right: {
      enabled: true,
      drawGridLines: false,
      textColor: processColor('black'),
      valueFormatter: '#°;-#°', //Format values with temp unit
      zeroLine: {
        lineWidth: 1,
        enabled: true,
        lineColor: processColor('black'),
      },
    },
  };

  return (
    <View style={styles.container}>
      {/* Graph header */}
      <GraphHeader
        tempMin={tempMin}
        tempMax={tempMax}
        formattedText={formattedText}
        rightText={formattedRightText}
      />

      {/* Graph   */}
      <View style={styles.graphContainer}>
        <View style={styles.graphInnerContainer}>
          <LineChart
            style={styles.flex}
            animation={graphAnimation}
            onLayout={e => setLayout(e.nativeEvent.layout)}
            data={graphData}
            legend={{
              enabled: false,
            }}
            yAxis={graphYAxis}
            chartDescription={{
              text: '',
            }}
            dragEnabled={false}
            drawGridBackground={false}
            drawBorders={false}
            xAxis={{
              enabled: false,
            }}
          />
          <CText size={3.5} color="black" style={{alignSelf: 'center'}}>
            Drag graph to check temperature per hour
          </CText>
        </View>

        {/* Line indicator */}
        <Animated.View style={[indicatorAnimStyle, styles.indicator]} />

        {/* Graph Gesture View over Graph */}
        <GestureDetector gesture={touchGesture}>
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[styles.gestureBox, !!onLayout.width && onLayoutWidth]}
            />
          </GestureDetector>
        </GestureDetector>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: wp(4),
  },
  graphContainer: {
    width: WIDTH,
    height: 250,
  },
  graphInnerContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    paddingHorizontal: wp(4),
  },
  indicator: {
    position: 'absolute',
    bottom: wp(6),
    width: 2,
    height: 220,
    borderRadius: 8,
    backgroundColor: 'orange',
  },
  gestureBox: {
    top: 12,
    left: 26,
    position: 'absolute',
    backgroundColor: 'transparent',
    height: 230,
  },
});

export default Graph;
