import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import request, { type Variables } from "graphql-request";

import { env } from "./env";

export const fetcher = <TData, TVariables extends Variables>(
  document: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
) => {
  return async () => request<TData>(env.endpoint, document, variables);
};
