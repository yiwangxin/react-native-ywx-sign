/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {SZYXButton} from "./Component/SZYXButton";
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createAppContainer,createStackNavigator} from "react-navigation"
import {HomeView} from "./View/HomeView";

const AppNav = createStackNavigator({
    HomeView:{
        screen:HomeView
    }
})

export const App = createAppContainer(AppNav)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
