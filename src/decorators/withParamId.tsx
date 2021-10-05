/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line react/display-name
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";

interface IProps<T> {
    id: T;
}

export function toInt(id: string): number {
    return parseInt(id);
}

export function withParamId<T>(
    Component: FunctionComponent<IProps<T>>,
    parseId?: (paramId: string) => T
) {
    return <P extends RouteComponentProps>(props: P) => {
        const paramId = (props.match.params as any).id;
        const id: T = parseId?.(paramId) ?? paramId;
        return <Component id={id} />;
    };
}
