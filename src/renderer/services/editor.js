import getscript from 'getscript';
import { join } from 'path';
import assert from 'assert';

// 缓存 editor 单例
let editor = null;

const DEFAULT_LANGUAGE = 'plaintext';

export const defaultEditorOpts = {
  value: '',
  theme: 'vs-dark',
  renderWhitespace: true,
  fontFamily: `
    "Operator Mono", "Fira Code", "Ubuntu Mono", "Droid Sans Mono",
    "Liberation Mono", "Source Code Pro", Menlo, Consolas, Courier, monospace
  `,
  fontSize: 12,
};

// TODO: Support 多示例同时初始化，也就是有 pending 状态的情况
function load() {
  if (window.monaco) {
    return Promise.resolve(window.monaco);
  }

  if (window.loadingMonaco) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(load());
      }, 50);
    });
  }

  return new Promise((resolve) => {
    window.loadingMonaco = true;
    const webpackRequire = window.require;
    getscript('../dist/vs/loader.js', () => {
      const amdRequire = window.require;
      window.require = webpackRequire;
      amdRequire.config({
        baseUrl: uriFromPath($dirname),
      });
      amdRequire(['./vs/editor/editor.main'], () => {
        // 由于不能支持 jsx，暂不做 js 语法检测
        window.monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: true,
        });
        window.monaco.languages.FormattingOptions = {
          tabSize: 2,
        };
        resolve(window.monaco);
        window.loadingMonaco = false;
      });
    });
  });
}

function uriFromPath(path) {
  let pathName = join(path.replace(/\\/g, '/'), '..', 'dist');
  if (pathName.length > 0 && pathName.charAt(0) !== '/') {
    pathName = `/${pathName}`;
  }
  return encodeURI(`file://${pathName}`);
}

export function create(container, value, language, options) {
  return new Promise((resolve) => {
    load().then((monaco) => {
      let opts;
      if (value === null) {
        opts = {
          ...defaultEditorOpts,
          model: null,
          ...options,
        };
      } else {
        opts = {
          ...defaultEditorOpts,
          value,
          language,
        };
      }
      resolve(editor = monaco.editor.create(container, opts));
    });
  });
}

function getModel(value, language) {
  const uri = `internal://tea/${language}`;
  let model = window.monaco.editor.getModel(uri);
  if (!model) {
    model = window.monaco.editor.createModel(value, language, uri);
  } else {
    model.setValue(value);
  }
  return model;
}

export function update(value, language) {
  assert(editor, 'editor: editor instance not ready');
  const langs = monaco.languages.getLanguages().map(item => item.id);
  let lLanguage = language && language.toLowerCase();
  // TODO：临时先用 javascript 识别 jsx 文件
  if (lLanguage === 'jsx') lLanguage = 'javascript';
  const lang = (lLanguage && langs.indexOf(lLanguage) > -1) ? lLanguage : DEFAULT_LANGUAGE;
  const model = getModel(value, lang);
  editor.setModel(model);
}

export function getValue() {
  assert(editor, 'editor: editor instance not ready');
  return editor.getValue();
}

export function focus() {
  assert(editor, 'editor: editor instance not ready');
  return editor.focus();
}

export function getPosition() {
  assert(editor, 'editor: editor instance not ready');
  const position = editor.getPosition();
  return position && {
    column: position.column,
    lineNumber: position.lineNumber,
  };
}

export function setPosition({ lineNumber, column }) {
  assert(editor, 'editor: editor instance not ready');
  return editor.setPosition(new monaco.Position(lineNumber, column));
}

export function clearModel() {
  assert(editor, 'editor: editor instance not ready');
  editor.setModel(null);
}

export function layout() {
  assert(editor, 'editor: editor instance not ready');
  editor.layout();
}
