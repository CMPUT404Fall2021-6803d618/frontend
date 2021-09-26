import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";

interface IProps<T> {
  id: T;
}

export function toInt(id: any) {
  return parseInt(id);
}

export function withParamId<T>(
  Component: FunctionComponent<IProps<T>>,
  parseId?: (paramId: string) => T
) {
  return <P extends RouteComponentProps>(props: P) => {
    const paramId = (props.match.params as any).id;
    let id: T = parseId?.(paramId) ?? paramId;
    return <Component id={id} />;
  };
}
