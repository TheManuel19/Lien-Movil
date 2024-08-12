import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input, Icon } from '@rneui/themed';

export default function SearchInput() {
    return (
        <Input
            placeholder='Titulo'
            leftIcon={
                <Icon
                    name='search'
                    size={16}
                    color='black'
                />
            }
        />
    )
}

const styles = StyleSheet.create({})