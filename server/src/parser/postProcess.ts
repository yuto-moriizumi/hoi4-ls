import { Token } from "moo";
import { Comment } from "./syntax/Comment";
import { Pair } from "./syntax/Pair";

type Value = boolean | number | string | Token | ValueOrCommentArr;
type ValueOrCommentArr = (Value | Comment)[];

export const extractArray = (
  d: [
    string,
    CommentArrOrNull,
    Value,
    [CommentArrOrNull, string, CommentArrOrNull, Value][] | null,
    CommentArrOrNull,
    string
  ]
) => {
  const [, preComments, value, items, postComments] = d;
  const output: ValueOrCommentArr = [];
  if (preComments) output.push(...preComments);
  output.push(value);
  if (items)
    output.push(
      ...items.reduce((acc, [preComments, , postComments, value]) => {
        if (preComments) acc.push(...preComments);
        if (postComments) acc.push(...postComments);
        acc.push(value);
        return acc;
      }, [] as ValueOrCommentArr)
    );
  if (postComments) output.push(...postComments);
  return output;
};

export function extractRoot(
  d: [CommentArrOrNull, PairOrCommentArr, CommentArrOrNull]
) {
  const output: PairOrCommentArr = [];
  const [preComments, pairs, postComments] = d;
  if (preComments) output.push(...preComments);
  output.push(...pairs);
  if (postComments) output.push(...postComments);
  return output;
}

export type PairOrCommentArr = (Pair | Comment)[];

export function extractPairs(d: [Pair, [CommentArrOrNull, Pair][] | null]) {
  const output: PairOrCommentArr = [];
  const [pair, tupleArr] = d;
  if (pair) output.push(pair);
  if (tupleArr) {
    tupleArr.forEach(([commentArr, pair]) => {
      if (commentArr) output.push(...commentArr);
      if (pair) output.push(pair);
    });
  }
  return output;
}

// syntax: __ or _
type CommentArrOrNull = Comment[] | null;

export function extractComments(
  d: [CommentArrOrNull, Comment, CommentArrOrNull]
) {
  const output: Comment[] = [];
  const [preComments, comment, postComments] = d;
  if (preComments) output.push(...preComments);
  output.push(comment);
  if (postComments) output.push(...postComments);
  return output;
}
