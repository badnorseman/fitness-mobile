import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(36, 39, 46, 1)',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  comment: {
    flex: 3,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16
  },
  feedback: {
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center'
  },
  smileyContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  smiley: {
    alignItems: 'center',
    height: 100
  }
});

export default class Feedback extends Component {
  static propTypes = {
    workout: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { workout } = this.props;
    const comments = workout.feedback && workout.feedback.comments ? workout.feedback.comments : 'No comments.';
    let feedbackImg;
    let feedbackImgText;

    if (workout.feedback && workout.feedback.type === 'EASY') {
      feedbackImg = require('../images/smiley_too-easy.png');
      feedbackImgText = 'Too easy';
    } else if (workout.feedback && workout.feedback.type === 'OK') {
      feedbackImg = require('../images/smiley_just-right.png');
      feedbackImgText = 'Just right';
    } else if (workout.feedback && workout.feedback.type === 'HARD') {
      feedbackImg = require('../images/smiley_too-hard.png');
      feedbackImgText = 'Too hard';
    }

    return feedbackImg && feedbackImgText ? (
      <View style={styles.main}>
        <View style={styles.smileyContainer}>
          <Image
            style={styles.smiley}
            resizeMode="contain"
            source={feedbackImg}
          />
          <Text style={styles.feedback}>{feedbackImgText}</Text>
        </View>
        <Text style={styles.comment}>{comments}</Text>
      </View>
    ) : null;
  }
}
