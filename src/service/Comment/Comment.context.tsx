import React, {createContext, ReactElement, useState} from 'react';
import   * as Ac from './Comment.action';
import * as Type from './types';

interface ICommentContext {
  crateCommentFn:(data) => void;
  listComment:Array<any>;
  getAllCommentIdFn:(id) => void;
  isComments:boolean;
}
export const CommentContext = createContext<ICommentContext>(
  {} as ICommentContext,
);
export default function CommentContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isComments, setComments] = useState(false);
  const [listComment, setListComment] = useState([]);

  // We can access navigation object via context
  function getAllCommentIdFn(CommentId:number) {
    Ac.getCommentIdAc(CommentId).then(res => {
      setListComment(res)
      
    });
  }
  function crateCommentFn(CommentId:number) {
    Ac.getCommentIdAc(CommentId).then(res => {
      setComments(res)
    });
  }
  return (
    <CommentContext.Provider
      value={{
        getAllCommentIdFn,
        listComment,
        crateCommentFn,
        isComments
      }}>
      {children}
    </CommentContext.Provider>
  );
}
