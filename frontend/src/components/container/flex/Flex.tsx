import React from 'react';

interface Props {
    justifyContent?: string;
    alignItems?: string;
    width?: string;
    children?: React.ReactNode
}

export class Flex extends React.Component<{}, Props> {

    static Vertical = (props: Props) => {
        return (
            <div style={{
                display: 'flex',
                width: props.width ? props.width : 'fit-content',
                justifyContent: props.justifyContent ? props.justifyContent : 'flex-start',
                alignItems: props.alignItems ? props.alignItems : 'flex-start',
                flexDirection: 'column'
            }}>
                {props.children}
            </div>
        )
    }

    static Horizontal = (props: Props) => {
        return (
            <div style={{
                display: 'flex',
                width: props.width ? props.width : 'fit-content',
                justifyContent: props.justifyContent ? props.justifyContent : 'flex-start',
                alignItems: props.alignItems ? props.alignItems : 'flex-start',
                flexDirection: 'row'
            }}>
                {props.children}
            </div>
        )
    }

}