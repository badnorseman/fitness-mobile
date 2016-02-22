import React, {
  StyleSheet,
  Component,
  View,
  WebView,
  Text
} from 'react-native'

import moment from 'moment';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        flexDirection: 'column'
    },
    centerText: {
        marginBottom:5,
        textAlign: 'center',
    },
    noResultsText: {
        marginTop: 70,
        marginBottom:0,
        color: '#eeeeee',
    },
    frame: {
        marginTop:0
    }
});

const ViewVideo = React.createClass({
    getInitialState: function() {
        return {
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
        };
    },

    render: function() {
        return (
            <View style={styles.container}>
                <WebView
                    style={styles.frame}
                    url={this.props.url}
                    renderLoading={this.renderLoading}
                    renderError={this.renderError}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    },
    renderLoading: function () {
        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={styles.noResultsText}>Loading video.</Text>
            </View>
        );
    },
    renderError: function () {
        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={styles.noResultsText}>Video could not be found, {this.props.url}</Text>
            </View>
        );
    }
});

export default ViewVideo;
