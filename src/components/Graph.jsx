import Animated, {
  runOnJS,
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
import {colors} from '../assets/colors';
import GraphHeader from './GraphHeader';
import GraphCategory from './GraphCategory';
import {WIDTH, isIOS} from '../assets/constants';
import {formatData, getUnit} from '../utils/GraphUtils';

const Graph = ({allData, index, tempMin, tempMax}) => {
  const left = useSharedValue(0);
  const opacity = useSharedValue(0);
  const animatedText = useSharedValue('');
  const animatedRightText = useSharedValue('');

  const [zIndex, setZ] = React.useState(1);
  const [onLayout, setLayout] = React.useState(0);
  const [selected, setSelected] = React.useState('Temperature');

  const formattedText = useDerivedValue(
    () => ` ${!!animatedText.value ? animatedText.value : ''}`,
  );
  const formattedRightText = useDerivedValue(
    () => `${!!animatedRightText.value ? animatedRightText.value : ''}`,
  );

  const graphValues = formatData(selected, allData, allData.time, index);

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

      runOnJS(setZ)(1);

      const index = getIndex(e);
      animatedText.value = `${
        typeof graphValues?.[index]?.y === 'number'
          ? `${Math.floor(graphValues?.[index]?.y)}${getUnit(
              selected,
              false,
              true,
            )}`
          : ''
      }`;
      animatedRightText.value = graphValues?.[index]?.time;
    });
  });

  const gesture = Gesture.Pan()
    .onChange(e => {
      if (e.absoluteX >= 27 && e.absoluteX <= onLayout.width - 10)
        left.value = withTiming(e.absoluteX - 1, {duration: 1}); // 1 comes as result of devide of 2

      const index = getIndex(e);
      animatedText.value = `${
        typeof graphValues?.[index]?.y === 'number'
          ? `${Math.floor(graphValues?.[index]?.y)}${getUnit(
              selected,
              false,
              true,
            )}`
          : ''
      }`;
      animatedRightText.value = graphValues?.[index]?.time;
    })
    .onFinalize(() => {
      opacity.value = 0;
      runOnJS(setZ)(10000000);
      animatedText.value = '';
      animatedRightText.value = '';
    });

  const indicatorAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      left: left.value,
    };
  });

  const opacityCategory = useAnimatedStyle(() => {
    return {
      opacity: opacity.value === 1 ? 0 : 1,
    };
  });

  const onLayoutWidth = {
    width: onLayout?.width - 37,
  };

  const colors = isIOS
    ? [processColor('red'), processColor('blue')]
    : [processColor('blue'), processColor('red')];

  const fillGradient = {
    colors,
    positions: [0, 0.5],
    angle: 90,
    orientation: 'TOP_BOTTOM',
  };

  const graphData = {
    dataSets: [
      {
        label: 'demo',
        values: graphValues,
        config: {
          color: processColor('rgb(71,43,134)'),
          mode: 'CUBIC_BEZIER',
          drawCubicIntensity: 0.2,
          drawFilled: true,
          lineWidth: 3,
          drawValues: false,
          drawCircles: false,
          highlightLineWidth: 2,
          drawHorizontalHighlightIndicator: false,
          fillGradient,
          fillAlpha: 100,
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
      //Format values with temp unit
      valueFormatter: `#${getUnit(selected, true, false)};-#${getUnit(
        selected,
        true,
        false,
      )}`,
      zeroLine: {
        lineWidth: 1,
        enabled: true,
        lineColor: processColor('black'),
      },
    },
  };

  React.useEffect(() => {
    setTimeout(() => {
      setZ(10000000);
    }, 50);
  }, []);

  return (
    <View style={styles.container}>
      {/* Graph header */}
      <GraphHeader
        category={selected}
        tempMin={tempMin}
        tempMax={tempMax}
        formattedText={formattedText}
        rightText={formattedRightText}
      />

      {/* Graph Category Button */}
      <Animated.View
        style={[styles.categoryCont, {zIndex: zIndex}, opacityCategory]}>
        <GraphCategory
          categoryOpacity={opacity}
          selected={selected}
          setSelected={setSelected}
        />
      </Animated.View>

      {/* Graph   */}
      <View style={styles.graphContainer}>
        <View style={styles.graphInnerContainer}>
          <LineChart
            style={styles.flex}
            animation={graphAnimation}
            highlightPerDragEnabled={false}
            highlightPerTapEnabled={false}
            onLayout={e => setLayout(e.nativeEvent.layout)}
            doubleTapToZoomEnabled={false}
            data={graphData}
            legend={{
              enabled: false,
            }}
            yAxis={graphYAxis}
            chartDescription={{
              text: '',
            }}
            dragEnabled={false}
            drawGridBackground={true}
            drawBorders={true}
            borderColor={processColor('rgba(0,0,0,0.3)')}
            xAxis={{
              enabled: false,
            }}
          />

          {/* Graph caption */}
          <CText size={3.5} color="black" style={{alignSelf: 'center'}}>
            {`Drag graph to check ${selected?.toLowerCase()} per hour`}
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
    paddingHorizontal: wp(4),
  },
  indicator: {
    position: 'absolute',
    bottom: wp(5.8),
    width: 4,
    height: 218,
    borderRadius: 24,
    backgroundColor: colors.yellow,
  },
  gestureBox: {
    top: 12,
    left: 26,
    position: 'absolute',
    backgroundColor: 'transparent',
    height: 230,
    zIndex: 1,
  },
  categoryCont: {
    top: 18,
    position: 'absolute',
    right: wp(5),
  },
});

export default Graph;
