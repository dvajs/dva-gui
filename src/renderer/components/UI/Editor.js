import React, { Component } from 'react';
import styles from './Editor.css';
import { create } from '../../services/editor';

const RESIZE_EVENT = 'resize';

class Editor extends Component {
  componentDidMount() {
    const { content, value, customeEditorOpts, language = null, onBlur, onChange } = this.props;
    create(this.container, content || value, language, customeEditorOpts)
      .then((editor) => {
        this.editor = editor;
        if (onBlur) {
          this.editor.onDidBlurEditorText(() => {
            onBlur(this.editor.getValue());
          });
        }
        if (onChange) {
          this.editor.onDidChangeModelContent(() => {
            onChange(this.editor.getValue());
          });
        }

        // this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
        //   dispatch({ type: 'editor/save' });
        // });
        // this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_W, () => {
        //   dispatch({ type: 'editor/closeActiveFile' });
        // });
        //
        // const PREV_KEY = monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.LeftArrow;
        // const NEXT_KEY = monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.RightArrow;
        // this.editor.addCommand(PREV_KEY, () => {
        //   dispatch({ type: 'editor/prev' });
        // });
        // this.editor.addCommand(NEXT_KEY, () => {
        //   dispatch({ type: 'editor/next' });
        // });
        // this.editor.onDidFocusEditor(() => {
        //   dispatch({ type: 'projectTree/unactive' });
        // });
        // this.editor.onDidChangeModelContent(() => {
        //   dispatch({ type: 'editor/contentChanged' });
        // });
      });
    window.addEventListener(RESIZE_EVENT, this.resizeHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.customeEditorOpts !== this.props.customeEditorOpts) {
      this.editor.updateOptions(nextProps.customeEditorOpts);
    }
    if (nextProps.content !== this.props.content) {
      this.editor.setValue(nextProps.content);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.dispose();
    }
    window.removeEventListener(RESIZE_EVENT, this.resizeHandler);
  }

  resizeHandler = () => {
    if (this.editor) {
      this.editor.layout();
    }
  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.container} ref={(c) => { this.container = c; }} />
      </div>
    );
  }
}

export default Editor;
