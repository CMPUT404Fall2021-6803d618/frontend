/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line react/display-name
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

import React, { FunctionComponent } from "react";
import { RouteComponentProps, match as Match } from "react-router-dom";

interface IProps<T> {
  id: T;
}

// eslint-disable-next-line @typescript-eslint/ban-types
interface ComputedRouteComponentProps<Params extends { [K in keyof Params]?: string } = {}>
  extends RouteComponentProps {
  computedMatch?: Match<Params>;
}

export function toInt(id: string): number {
  return parseInt(id);
}

export function withParamId<T>(Component: FunctionComponent<IProps<T>>, parseId?: (paramId: string) => T) {
  return <P extends ComputedRouteComponentProps>(props: P) => {
    console.log(props);
    const match = props.match ?? props.computedMatch;
    const paramId = (match.params as any).id;
    const id: T = parseId?.(paramId) ?? paramId;
    return <Component id={id} />;
  };
}
